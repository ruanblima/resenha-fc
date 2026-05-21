import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors } from '../theme';

interface Props {
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
}

export function AppHeader({ onMenuPress, onNotificationPress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-background border-b border-outline-variant">
      <TouchableOpacity onPress={onMenuPress} hitSlop={8}>
        <MaterialIcons name="menu" size={24} color={colors.primary} />
      </TouchableOpacity>

      <Text className="text-primary font-anybody-bold text-lg tracking-widest">COPA DO MUNDO</Text>

      <TouchableOpacity onPress={onNotificationPress} hitSlop={8}>
        <MaterialIcons name="notifications" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
