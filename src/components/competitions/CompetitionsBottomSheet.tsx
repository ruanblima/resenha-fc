import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mockCompetitions, mockCountryLeagues } from '../../mocks/home';
import { colors } from '../../theme';
import { CountryAccordion } from './CountryAccordion';
import type { Competition } from '../../types/home';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectCompetition: (id: string) => void;
}

export function CompetitionsBottomSheet({ visible, onClose, onSelectCompetition }: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(600)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 0, speed: 20 }),
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 600, duration: 250, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const handleSelect = (id: string) => {
    onClose();
    // Small delay so the sheet closes before navigating
    setTimeout(() => onSelectCompetition(id), 200);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', opacity }} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.surface,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '85%',
          paddingBottom: insets.bottom,
          transform: [{ translateY }],
        }}
      >
        {/* Handle */}
        <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: `${colors.outlineVariant}80` }} />
        </View>

        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 16,
          }}
        >
          <View>
            <Text style={{ fontFamily: 'AnyBody-Bold', fontSize: 20, color: colors.onSurface }}>
              Competições
            </Text>
            <Text style={{ fontFamily: 'WorkSans-Regular', fontSize: 12, color: colors.onSurfaceVariant, marginTop: 2 }}>
              Selecione uma competição
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} hitSlop={8}>
            <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 8 }}
          bounces={false}
        >
          {/* Internacional */}
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 11,
              letterSpacing: 1,
              color: colors.onSurfaceVariant,
              marginBottom: 4,
            }}
          >
            INTERNACIONAL
          </Text>

          {mockCompetitions.map((comp) => (
            <CompetitionRow
              key={comp.id}
              competition={comp}
              onPress={() => handleSelect(comp.id)}
            />
          ))}

          {/* Por país */}
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 11,
              letterSpacing: 1,
              color: colors.onSurfaceVariant,
              marginTop: 16,
              marginBottom: 4,
            }}
          >
            POR PAÍS
          </Text>

          {mockCountryLeagues.map((country) => (
            <CountryAccordion
              key={country.id}
              country={country}
              onSelectLeague={(id) => handleSelect(id)}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

function CompetitionRow({ competition, onPress }: { competition: Competition; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: competition.isActive ? `${colors.primary}33` : `${colors.outlineVariant}33`,
        gap: 12,
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: `${colors.primary}1A`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name={competition.icon} size={20} color={colors.primary} />
      </View>

      {/* Text */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'AnyBody-Bold', fontSize: 14, color: colors.onSurface }} numberOfLines={1}>
          {competition.name}
        </Text>
        {competition.location && (
          <Text style={{ fontFamily: 'WorkSans-Regular', fontSize: 12, color: colors.onSurfaceVariant, marginTop: 1 }}>
            {competition.location}
          </Text>
        )}
      </View>

      {/* Active badge or chevron */}
      {competition.isActive ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.secondary }} />
          <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 10, color: colors.secondary, letterSpacing: 0.8 }}>
            ATIVO
          </Text>
        </View>
      ) : (
        <MaterialIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
      )}
    </TouchableOpacity>
  );
}
