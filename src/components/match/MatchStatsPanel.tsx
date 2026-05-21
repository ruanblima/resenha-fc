import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchStatItem } from '../../types/match';

interface Props {
  stats: MatchStatItem[];
  homeShortName: string;
  awayShortName: string;
}

export function MatchStatsPanel({ stats, homeShortName, awayShortName }: Props) {
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
        <MaterialIcons name="bar-chart" size={16} color={colors.onSurfaceVariant} />
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant">
          ESTATÍSTICAS PRINCIPAIS
        </Text>
      </View>

      <View className="gap-y-5">
        {stats.map((stat, index) => (
          <StatRow
            key={index}
            stat={stat}
            homeShortName={homeShortName}
            awayShortName={awayShortName}
            isLast={index === stats.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

function StatRow({
  stat,
  isLast,
}: {
  stat: MatchStatItem;
  homeShortName: string;
  awayShortName: string;
  isLast: boolean;
}) {
  const awayPercent = 100 - stat.homePercent;

  return (
    <View className={isLast ? '' : 'pb-5 border-b border-outline-variant'} style={isLast ? {} : { borderBottomColor: `${colors.outlineVariant}33` }}>
      {/* Values + label */}
      <View className="flex-row justify-between items-center mb-2">
        <Text
          className="font-anybody-bold text-base w-12"
          style={{ color: colors.primaryContainer }}
        >
          {stat.homeValue}
        </Text>
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant text-center flex-1">
          {stat.label}
        </Text>
        <Text className="font-anybody-bold text-base text-on-surface text-right w-12">
          {stat.awayValue}
        </Text>
      </View>

      {/* Dual progress bar */}
      <View className="flex-row h-2 gap-x-0.5">
        {/* Home side — fills from right */}
        <View
          className="flex-1 rounded-l-full overflow-hidden"
          style={{ backgroundColor: colors.surfaceHighest }}
        >
          <View
            className="h-full rounded-l-full absolute right-0"
            style={{
              width: `${stat.homePercent}%`,
              backgroundColor: colors.primaryContainer,
            }}
          />
        </View>
        {/* Away side — fills from left */}
        <View
          className="flex-1 rounded-r-full overflow-hidden"
          style={{ backgroundColor: colors.surfaceHighest }}
        >
          <View
            className="h-full rounded-r-full"
            style={{
              width: `${awayPercent}%`,
              backgroundColor: colors.onSurfaceVariant,
              opacity: 0.5,
            }}
          />
        </View>
      </View>
    </View>
  );
}
