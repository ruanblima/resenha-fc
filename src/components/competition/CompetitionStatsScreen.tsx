import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCompetitionStats } from '../../hooks/useCompetitionStats';
import { colors } from '../../theme';
import type { PlayerStatEntry, StatType } from '../../types/playerStats';

interface Props {
  competitionId: string;
}

const FILTERS: { type: StatType; label: string; unit: string; color: string }[] = [
  { type: 'scorers', label: 'Artilheiros', unit: 'GOLS', color: colors.primary },
  { type: 'assists', label: 'Assistências', unit: 'ASSIST', color: '#3b82f6' },
  { type: 'yellowcards', label: 'Cartões Amarelos', unit: 'AMARELOS', color: '#f59e0b' },
  { type: 'redcards', label: 'Cartões Vermelhos', unit: 'VERMELHOS', color: '#ef4444' },
];

export function CompetitionStatsScreen({ competitionId }: Props) {
  const [activeType, setActiveType] = useState<StatType>('scorers');
  const activeFilter = FILTERS.find((f) => f.type === activeType)!;

  return (
    <View style={{ flex: 1 }}>
      {/* Filter chips — altura fixa para não ser comprimido pelo conteúdo */}
      <View style={{ height: 52, flexShrink: 0 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
        >
          {FILTERS.map((f) => {
            const isActive = f.type === activeType;
            return (
              <TouchableOpacity
                key={f.type}
                onPress={() => setActiveType(f.type)}
                activeOpacity={0.7}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 20,
                  backgroundColor: isActive ? f.color : colors.surfaceContainer,
                  borderWidth: 1,
                  borderColor: isActive ? f.color : `${colors.outlineVariant}4D`,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 12,
                    letterSpacing: 0.3,
                    color: isActive ? colors.onPrimary : colors.onSurfaceVariant,
                  }}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <StatsList
        competitionId={competitionId}
        type={activeType}
        unit={activeFilter.unit}
        accentColor={activeFilter.color}
      />
    </View>
  );
}

function StatsList({
  competitionId,
  type,
  unit,
  accentColor,
}: {
  competitionId: string;
  type: StatType;
  unit: string;
  accentColor: string;
}) {
  const { data, isLoading, isError } = useCompetitionStats(competitionId, type);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Text style={{ color: colors.onSurfaceVariant, textAlign: 'center' }}>
          Estatísticas não disponíveis
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 8 }}
    >
      {/* Column header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}
      >
        <Text style={[styles.colHeader, { width: 28 }]}>#</Text>
        <Text style={[styles.colHeader, { flex: 1 }]}>JOGADOR</Text>
        <Text style={[styles.colHeader, { width: 40, textAlign: 'center' }]}>JOG</Text>
        <Text style={[styles.colHeader, { width: 56, textAlign: 'center', color: accentColor }]}>
          {unit}
        </Text>
      </View>

      {data.players.map((entry) => (
        <PlayerRow key={entry.player.id} entry={entry} accentColor={accentColor} />
      ))}
    </ScrollView>
  );
}

function PlayerRow({
  entry,
  accentColor,
}: {
  entry: PlayerStatEntry;
  accentColor: string;
}) {
  const isTop3 = entry.rank <= 3;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isTop3 ? `${accentColor}10` : colors.surfaceContainer,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: isTop3 ? `${accentColor}30` : `${colors.outlineVariant}33`,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      {/* Rank */}
      <Text
        style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 13,
          width: 20,
          textAlign: 'center',
          color: isTop3 ? accentColor : colors.onSurfaceVariant,
        }}
      >
        {entry.rank}
      </Text>

      {/* Player photo */}
      <Image
        source={{ uri: entry.player.photo }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.surfaceHigh,
        }}
      />

      {/* Name + team */}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontFamily: 'AnyBody-Bold',
            fontSize: 13,
            color: colors.onSurface,
          }}
          numberOfLines={1}
        >
          {entry.player.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Image
            source={{ uri: entry.team.logo }}
            style={{ width: 14, height: 14, borderRadius: 2 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: 'WorkSans-Regular',
              fontSize: 11,
              color: colors.onSurfaceVariant,
            }}
            numberOfLines={1}
          >
            {entry.team.name}
          </Text>
        </View>
      </View>

      {/* Games played */}
      <Text
        style={{
          fontFamily: 'WorkSans-Regular',
          fontSize: 13,
          width: 36,
          textAlign: 'center',
          color: colors.onSurfaceVariant,
        }}
      >
        {entry.games}
      </Text>

      {/* Main stat value */}
      <View
        style={{
          width: 52,
          alignItems: 'center',
          backgroundColor: isTop3 ? accentColor : `${accentColor}20`,
          borderRadius: 8,
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 16,
            color: isTop3 ? colors.onPrimary : accentColor,
          }}
        >
          {entry.value}
        </Text>
      </View>
    </View>
  );
}

const styles = {
  colHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.8,
    color: colors.onSurfaceVariant,
  },
};
