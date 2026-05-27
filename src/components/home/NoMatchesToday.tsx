import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';

interface Props {
  onPressCalendar?: () => void;
}

export function NoMatchesToday({ onPressCalendar }: Props) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginBottom: 20,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}33`,
        paddingHorizontal: 24,
        paddingVertical: 32,
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          backgroundColor: `${colors.primary}18`,
          borderWidth: 1,
          borderColor: `${colors.primary}30`,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}
      >
        <MaterialIcons name="emoji-events" size={34} color={colors.primary} />
      </View>

      {/* Title */}
      <Text
        style={{
          fontFamily: 'AnyBody-ExtraBold',
          fontSize: 18,
          color: colors.onSurface,
          textAlign: 'center',
          lineHeight: 24,
        }}
      >
        Nenhuma partida hoje
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontFamily: 'WorkSans-Regular',
          fontSize: 13,
          color: colors.onSurfaceVariant,
          textAlign: 'center',
          lineHeight: 20,
          maxWidth: 260,
        }}
      >
        O campo está em silêncio hoje. Aproveite para conferir o calendário completo do torneio.
      </Text>

      {/* CTA button */}
      <Pressable
        onPress={onPressCalendar}
        style={{
          marginTop: 8,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          borderWidth: 1.5,
          borderColor: colors.primary,
        }}
      >
        <MaterialIcons name="calendar-today" size={14} color={colors.primary} />
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 12,
            color: colors.primary,
            letterSpacing: 0.8,
          }}
        >
          VER CALENDÁRIO DO TORNEIO
        </Text>
      </Pressable>
    </View>
  );
}
