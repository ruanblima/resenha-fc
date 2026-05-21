import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../../theme';
import type { WinProbability } from '../../types/match';

interface Props {
  probability: WinProbability;
  homeShortName: string;
  awayShortName: string;
}

export function WinProbabilityCard({ probability, homeShortName, awayShortName }: Props) {
  return (
    <View
      className="rounded-xl p-4"
      style={{
        backgroundColor: colors.surfaceHigh,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}4D`,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-x-2 mb-5">
        <MaterialIcons name="show-chart" size={16} color={colors.onSurfaceVariant} />
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant">
          PROBABILIDADE DE VITÓRIA
        </Text>
      </View>

      {/* Probability bars */}
      <View className="flex-row h-3 rounded-full overflow-hidden mb-4">
        <View
          style={{
            flex: probability.home,
            backgroundColor: colors.primaryContainer,
          }}
        />
        <View
          style={{
            flex: probability.draw,
            backgroundColor: colors.onSurfaceVariant,
            opacity: 0.4,
            marginHorizontal: 2,
          }}
        />
        <View
          style={{
            flex: probability.away,
            backgroundColor: colors.onSurfaceVariant,
            opacity: 0.2,
          }}
        />
      </View>

      {/* Labels */}
      <View className="flex-row justify-between">
        <ProbLabel label={homeShortName} value={`${probability.home}%`} isHome />
        <ProbLabel label="EMPATE" value={`${probability.draw}%`} />
        <ProbLabel label={awayShortName} value={`${probability.away}%`} align="right" />
      </View>
    </View>
  );
}

function ProbLabel({
  label,
  value,
  isHome,
  align = 'left',
}: {
  label: string;
  value: string;
  isHome?: boolean;
  align?: 'left' | 'center' | 'right';
}) {
  const textAlign = align === 'right' ? 'items-end' : align === 'center' ? 'items-center' : 'items-start';
  return (
    <View className={`gap-y-0.5 ${textAlign}`}>
      <Text
        className="font-anybody-bold text-lg"
        style={{ color: isHome ? colors.primaryContainer : colors.onSurface }}
      >
        {value}
      </Text>
      <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant">
        {label}
      </Text>
    </View>
  );
}
