import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { GroupStanding, PlayerStat, StatCategory } from '../../types/stats';
import { GroupStandingsCard } from './GroupStandingsCard';
import { PlayerRankRow } from './PlayerRankRow';
import { StatsTabs } from './StatsTabs';
import { TopPlayerCard } from './TopPlayerCard';

interface Props {
  players: PlayerStat[];
  selectedCategory: StatCategory;
  onSelectCategory: (category: StatCategory) => void;
  groupStanding: GroupStanding;
  statLabel: string;
  onViewFullRanking?: () => void;
}

export function StatsScreen({
  players,
  selectedCategory,
  onSelectCategory,
  groupStanding,
  statLabel,
  onViewFullRanking,
}: Props) {
  const [topPlayer, ...restPlayers] = players;

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Page header */}
      <View className="px-4 pt-6 pb-4">
        <Text className="font-anybody-bold text-3xl text-on-surface mb-1">Estatísticas</Text>
        <Text className="font-work-sans text-base text-on-surface-variant">
          Métricas e rankings em tempo real.
        </Text>
      </View>

      {/* Tabs */}
      <StatsTabs selected={selectedCategory} onSelect={onSelectCategory} />

      <View className="px-4 pt-6">
        {/* Rank #1 — featured card */}
        {topPlayer && (
          <TopPlayerCard player={topPlayer} rank={1} statLabel={statLabel} />
        )}

        {/* Ranks 2+ */}
        {restPlayers.length > 0 && (
          <View
            className="rounded-xl overflow-hidden mb-4"
            style={{
              backgroundColor: colors.surfaceContainer,
              borderWidth: 1,
              borderColor: `${colors.outlineVariant}4D`,
            }}
          >
            {restPlayers.map((player, index) => (
              <PlayerRankRow
                key={player.id}
                player={player}
                rank={index + 2}
                isLast={index === restPlayers.length - 1}
              />
            ))}
          </View>
        )}

        {/* View full ranking button */}
        <Pressable
          onPress={onViewFullRanking}
          className="flex-row items-center justify-center gap-x-2 py-3 rounded-lg mb-6"
          style={{
            borderWidth: 1,
            borderColor: `${colors.outlineVariant}80`,
          }}
        >
          <Text className="font-inter-semibold text-xs tracking-widest text-on-surface uppercase">
            Ver ranking completo
          </Text>
          <MaterialIcons name="arrow-forward" size={16} color={colors.onSurface} />
        </Pressable>

        {/* Group standings */}
        <GroupStandingsCard standing={groupStanding} />

        <View className="h-6" />
      </View>
    </ScrollView>
  );
}
