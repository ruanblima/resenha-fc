import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../theme';

interface Props {
  title?: string;
  showBack?: boolean;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
}

export function AppHeader({
  title,
  showBack,
  onMenuPress,
  onNotificationPress,
  onSearchPress,
}: Props) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-background border-b border-outline-variant">
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress} hitSlop={8}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}

      <Text
        className="text-primary font-anybody-bold text-lg tracking-widest"
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ flex: 1, textAlign: 'center', marginHorizontal: 8 }}
      >
        {title ?? 'COPA DO MUNDO'}
      </Text>

      {showBack && onSearchPress ? (
        <TouchableOpacity onPress={onSearchPress} hitSlop={8}>
          <MaterialIcons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      ) : showBack ? (
        <View style={{ width: 24 }} />
      ) : (
        <TouchableOpacity onPress={onNotificationPress} hitSlop={8}>
          <MaterialIcons name="notifications" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
