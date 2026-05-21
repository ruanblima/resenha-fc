import React from 'react';
import { Image, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { PlayerStat } from '../../types/stats';

interface Props {
  player: PlayerStat;
  rank: number;
  isLast?: boolean;
}

export function PlayerRankRow({ player, rank, isLast }: Props) {
  return (
    <View
      className="flex-row items-center p-4"
      style={
        !isLast
          ? { borderBottomWidth: 1, borderBottomColor: `${colors.outlineVariant}4D` }
          : undefined
      }
    >
      {/* Rank number */}
      <Text
        className="font-anybody-bold text-xl text-on-surface-variant"
        style={{ width: 32, textAlign: 'center', marginRight: 16 }}
      >
        {rank}
      </Text>

      {/* Player photo */}
      <View
        className="w-12 h-12 rounded-full overflow-hidden mr-4"
        style={{
          borderWidth: 1,
          borderColor: `${colors.outlineVariant}80`,
          backgroundColor: colors.surfaceContainer,
        }}
      >
        {player.photoUrl ? (
          <Image source={{ uri: player.photoUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Text className="font-anybody-bold text-base text-on-surface-variant">
              {player.name.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      {/* Name + Country */}
      <View className="flex-1">
        <Text className="font-anybody-bold text-base text-on-surface">{player.name}</Text>
        <Text className="font-work-sans text-sm text-on-surface-variant">{player.country}</Text>
      </View>

      {/* Stat value */}
      <Text className="font-anybody-bold text-2xl text-on-surface">{player.value}</Text>
    </View>
  );
}
