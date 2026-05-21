import React from 'react';
import { Image, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { PlayerStat } from '../../types/stats';

interface Props {
  player: PlayerStat;
  rank: number;
  statLabel: string;
}

export function TopPlayerCard({ player, rank, statLabel }: Props) {
  return (
    <View
      className="rounded-xl overflow-hidden relative mb-4"
      style={{
        backgroundColor: colors.surfaceHigh,
        borderTopWidth: 1,
        borderTopColor: colors.primary,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: `${colors.outlineVariant}4D`,
        borderRightColor: `${colors.outlineVariant}4D`,
        borderBottomColor: `${colors.outlineVariant}4D`,
      }}
    >
      {/* Watermark rank number */}
      <Text
        testID="rank-watermark"
        className="font-anybody-extrabold absolute top-0 right-4"
        style={{
          fontSize: 120,
          lineHeight: 120,
          color: colors.primary,
          opacity: 0.1,
        }}
      >
        {rank}
      </Text>

      <View className="p-6 flex-row items-center gap-x-5 relative" style={{ zIndex: 1 }}>
        {/* Player photo */}
        <View
          className="w-24 h-24 rounded-full overflow-hidden border-2"
          style={{
            borderColor: `${colors.primary}80`,
            shadowColor: colors.primary,
            shadowOpacity: 0.2,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 0 },
          }}
        >
          {player.photoUrl ? (
            <Image source={{ uri: player.photoUrl }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <View
              className="w-full h-full items-center justify-center"
              style={{ backgroundColor: colors.surfaceContainer }}
            >
              <Text className="font-anybody-bold text-2xl text-primary">
                {player.name.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* Player info */}
        <View className="flex-1">
          <View
            className="flex-row items-center gap-x-2 px-3 py-1 rounded-full self-start mb-2"
            style={{
              backgroundColor: colors.surfaceContainer,
              borderWidth: 1,
              borderColor: `${colors.outlineVariant}4D`,
            }}
          >
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.secondaryContainer }}
            />
            <Text className="font-inter-semibold text-xs text-on-surface-variant">
              {player.country}
            </Text>
          </View>
          <Text className="font-anybody-bold text-2xl text-on-surface mb-0.5">{player.name}</Text>
          <Text className="font-work-sans text-sm text-on-surface-variant">
            {player.position} · Partidas: {player.matchesPlayed}
          </Text>
        </View>

        {/* Stat value */}
        <View className="items-end">
          <Text className="font-inter-semibold text-xs tracking-widest text-primary mb-1">
            {statLabel}
          </Text>
          <Text
            className="font-anybody-extrabold text-5xl"
            style={{ color: colors.primary, letterSpacing: -0.96 }}
          >
            {player.value}
          </Text>
        </View>
      </View>
    </View>
  );
}
