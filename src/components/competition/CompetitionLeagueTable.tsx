import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import { useCompetitionStandings } from '../../hooks/useCompetitionStandings';
import { colors } from '../../theme';
import type { StandingEntry } from '../../types/standings';

interface Props {
  competitionId: string;
}

const ZONE_CONFIG: Record<string, { color: string; label: string }> = {
  libertadores: { color: '#3b82f6', label: 'Libertadores' },
  libertadores_pre: { color: '#06b6d4', label: 'Pré-Libertadores' },
  promotion: { color: colors.primary, label: 'Classificado' },
  continental: { color: '#f97316', label: 'Sul-Americana' },
  relegation: { color: '#ef4444', label: 'Rebaixamento' },
};

export function CompetitionLeagueTable({ competitionId }: Props) {
  const { data, isLoading, isError } = useCompetitionStandings(competitionId);

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
          Classificação não disponível
        </Text>
      </View>
    );
  }

  const entries = data.groups[0]?.entries ?? [];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Zone legend */}
      <ZoneLegend entries={entries} />

      {/* Table container */}
      <View style={{ marginHorizontal: 16 }}>
        {/* Column headers */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: colors.surfaceContainer,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: `${colors.outlineVariant}4D`,
            marginBottom: 4,
          }}
        >
          <Text style={[styles.colHeader, { width: 24 }]}>#</Text>
          <Text style={[styles.colHeader, { flex: 1 }]}>EQUIPE</Text>
          <Text style={[styles.colHeader, styles.colNum]}>J</Text>
          <Text style={[styles.colHeader, styles.colNum]}>V</Text>
          <Text style={[styles.colHeader, styles.colNum]}>E</Text>
          <Text style={[styles.colHeader, styles.colNum]}>D</Text>
          <Text style={[styles.colHeader, styles.colNum]}>GP</Text>
          <Text style={[styles.colHeader, styles.colNum]}>GC</Text>
          <Text style={[styles.colHeader, styles.colNum]}>SG</Text>
          <Text style={[styles.colHeader, { ...styles.colNum, color: colors.primary }]}>PTS</Text>
        </View>

        {/* Rows */}
        {entries.map((entry, index) => (
          <LeagueRow
            key={entry.team.id}
            entry={entry}
            prevZone={index > 0 ? entries[index - 1].zone : null}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function ZoneLegend({ entries }: { entries: StandingEntry[] }) {
  const zones = Array.from(new Set(entries.map((e) => e.zone).filter(Boolean))) as string[];
  if (zones.length === 0) return null;

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      {zones.map((zone) => {
        const config = ZONE_CONFIG[zone];
        if (!config) return null;
        return (
          <View key={zone} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: config.color,
              }}
            />
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 10,
                color: colors.onSurfaceVariant,
                letterSpacing: 0.5,
              }}
            >
              {config.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function LeagueRow({
  entry,
  prevZone,
}: {
  entry: StandingEntry;
  prevZone: string | null;
}) {
  const zoneConfig = entry.zone ? ZONE_CONFIG[entry.zone] : null;
  const zoneChanged = entry.zone !== prevZone;
  const showDivider = zoneChanged && prevZone !== null;

  return (
    <>
      {showDivider && (
        <View
          style={{
            height: 1.5,
            marginHorizontal: 2,
            backgroundColor: zoneConfig?.color
              ? `${zoneConfig.color}60`
              : `${colors.outlineVariant}60`,
            borderRadius: 1,
            marginVertical: 2,
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 9,
          paddingRight: 12,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {/* Zone color bar */}
        <View
          style={{
            width: 3,
            alignSelf: 'stretch',
            backgroundColor: zoneConfig?.color ?? 'transparent',
            borderRadius: 2,
            marginRight: 8,
          }}
        />

        {/* Rank */}
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 12,
            width: 20,
            textAlign: 'center',
            color: zoneConfig ? zoneConfig.color : colors.onSurfaceVariant,
          }}
        >
          {entry.rank}
        </Text>

        {/* Logo + name */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image
            source={{ uri: entry.team.imageUrl }}
            style={{ width: 22, height: 22, borderRadius: 4 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: 'WorkSans-Regular',
              fontSize: 12,
              color: colors.onSurface,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {entry.team.name}
          </Text>
        </View>

        {/* Stats */}
        <Text style={styles.cell}>{entry.played}</Text>
        <Text style={styles.cell}>{entry.won}</Text>
        <Text style={styles.cell}>{entry.drawn}</Text>
        <Text style={styles.cell}>{entry.lost}</Text>
        <Text style={styles.cell}>{entry.goalsFor}</Text>
        <Text style={styles.cell}>{entry.goalsAgainst}</Text>
        <Text style={styles.cell}>
          {entry.goalDiff > 0 ? `+${entry.goalDiff}` : entry.goalDiff}
        </Text>
        <Text style={[styles.cell, { color: colors.primary, fontFamily: 'Inter_600SemiBold' }]}>
          {entry.points}
        </Text>
      </View>
    </>
  );
}

const styles = {
  colHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.8,
    color: colors.onSurfaceVariant,
    textAlign: 'center' as const,
  },
  colNum: {
    width: 28,
    textAlign: 'center' as const,
  },
  cell: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    width: 28,
    textAlign: 'center' as const,
    color: colors.onSurface,
  },
};
