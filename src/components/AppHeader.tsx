import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';

interface Props {
  title?: string;
  showBack?: boolean;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
}

export function AppHeader({ title, showBack, onMenuPress, onNotificationPress }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3 bg-background border-b border-outline-variant"
      style={{ paddingTop: insets.top + 12 }}
    >
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress} hitSlop={8}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}

      <Text className="text-primary font-anybody-bold text-lg tracking-widest">
        {title ?? 'COPA DO MUNDO'}
      </Text>

      {showBack ? (
        <View style={{ width: 24 }} />
      ) : (
        <TouchableOpacity onPress={onNotificationPress} hitSlop={8}>
          <MaterialIcons name="notifications" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
