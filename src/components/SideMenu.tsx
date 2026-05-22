import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';
import type { Competition } from '../types/home';

const DRAWER_WIDTH = Math.min(Dimensions.get('window').width * 0.82, 320);

interface Props {
  visible: boolean;
  onClose: () => void;
  competitions: Competition[];
  activeCompetitionId?: string;
  onSelectCompetition?: (id: string) => void;
}

const LEAGUE_ITEMS = [
  { id: 'wc2026', name: 'Copa do Mundo 2026', icon: 'public' as const },
  { id: 'ucl', name: 'Champions League', icon: 'star' as const },
  { id: 'pl', name: 'Premier League', icon: 'sports-soccer' as const },
  { id: 'euro2024', name: 'Euro 2024', icon: 'flag' as const },
  { id: 'all', name: 'Ver Todas as Ligas', icon: 'grid-view' as const },
];

const ACCOUNT_ITEMS = [
  { id: 'profile', name: 'Meu Perfil', icon: 'person' as const },
  { id: 'settings', name: 'Configurações', icon: 'settings' as const },
];

export function SideMenu({
  visible,
  onClose,
  activeCompetitionId,
  onSelectCompetition,
}: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, fadeAnim]);

  const closeDrawer = useCallback(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }, [slideAnim, fadeAnim, onClose]);

  useEffect(() => {
    if (visible) openDrawer();
  }, [visible, openDrawer]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeDrawer}
    >
      {/* Overlay */}
      <Animated.View
        style={{ flex: 1, opacity: fadeAnim }}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(19,19,19,0.82)' }}
          onPress={closeDrawer}
        />
      </Animated.View>

      {/* Drawer panel */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: DRAWER_WIDTH,
          transform: [{ translateX: slideAnim }],
          backgroundColor: colors.background,
          borderRightWidth: 1,
          borderRightColor: `${colors.outlineVariant}4D`,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 24,
          shadowOffset: { width: 8, height: 0 },
          elevation: 24,
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 mb-8">
            <Text className="font-anybody-bold text-lg tracking-widest text-primary">MENU</Text>
            <TouchableOpacity onPress={closeDrawer} hitSlop={8}>
              <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          {/* SELECT LEAGUE */}
          <SectionLabel label="SELECIONAR LIGA" />
          <View className="px-3 gap-y-0.5 mb-8">
            {LEAGUE_ITEMS.map((item) => {
              const isActive = item.id === activeCompetitionId;
              return (
                <MenuRow
                  key={item.id}
                  icon={item.icon}
                  label={item.name}
                  isActive={isActive}
                  onPress={() => {
                    if (item.id === 'all') {
                      closeDrawer();
                      setTimeout(() => router.push('/competitions'), 300);
                    } else {
                      onSelectCompetition?.(item.id);
                      closeDrawer();
                    }
                  }}
                />
              );
            })}
          </View>

          {/* ACCOUNT */}
          <SectionLabel label="CONTA" />
          <View className="px-3 gap-y-0.5">
            {ACCOUNT_ITEMS.map((item) => (
              <MenuRow
                key={item.id}
                icon={item.icon}
                label={item.name}
                onPress={closeDrawer}
              />
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <Text
      className="px-6 mb-3 font-inter-semibold tracking-widest"
      style={{ fontSize: 10, color: `${colors.primary}99` }}
    >
      {label}
    </Text>
  );
}

function MenuRow({
  icon,
  label,
  isActive,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  label: string;
  isActive?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: isActive ? `${colors.primary}1A` : 'transparent',
        borderWidth: isActive ? 1 : 0,
        borderColor: isActive ? `${colors.primary}33` : 'transparent',
      }}
    >
      <MaterialIcons
        name={icon}
        size={18}
        color={isActive ? colors.primary : colors.onSurfaceVariant}
      />
      <Text
        className="font-anybody-bold text-sm"
        style={{ color: isActive ? colors.primary : colors.onSurfaceVariant }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
