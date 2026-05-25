import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import { useCompetitionStandings } from '../../hooks/useCompetitionStandings';
import { colors } from '../../theme';
import type { StandingEntry, StandingGroup } from '../../types/standings';

interface Props {
  competitionId: string;
}

export function CompetitionStandingsTable({ competitionId }: Props) {
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

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {data.groups.map((group) => (
        <GroupCard key={group.name} group={group} />
      ))}
    </ScrollView>
  );
}

function GroupCard({ group }: { group: StandingGroup }) {
  const qualifiedCount = group.entries.filter((e) => e.qualified).length;

  return (
    <View
      style={{
        backgroundColor: colors.surfaceContainer,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}4D`,
      }}
    >
      {/* Group header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: colors.surfaceHigh,
        }}
      >
        <Text
          style={{
            fontFamily: 'AnyBody-Bold',
            fontSize: 13,
            letterSpacing: 1,
            color: colors.primary,
          }}
        >
          {group.name.toUpperCase()}
        </Text>
      </View>

      {/* Column headers */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderBottomWidth: 1,
          borderBottomColor: `${colors.outlineVariant}33`,
        }}
      >
        <Text style={[styles.colHeader, { flex: 1 }]}>EQUIPE</Text>
        <Text style={[styles.colHeader, styles.colNum]}>J</Text>
        <Text style={[styles.colHeader, styles.colNum]}>V</Text>
        <Text style={[styles.colHeader, styles.colNum]}>E</Text>
        <Text style={[styles.colHeader, styles.colNum]}>D</Text>
        <Text style={[styles.colHeader, styles.colNum]}>SG</Text>
        <Text style={[styles.colHeader, { ...styles.colNum, color: colors.primary }]}>PTS</Text>
      </View>

      {/* Rows */}
      {group.entries.map((entry, index) => (
        <StandingRow
          key={entry.team.id}
          entry={entry}
          isLast={index === group.entries.length - 1}
          showQualifiedDivider={qualifiedCount > 0 && index === qualifiedCount - 1}
        />
      ))}
    </View>
  );
}

function StandingRow({
  entry,
  isLast,
  showQualifiedDivider,
}: {
  entry: StandingEntry;
  isLast: boolean;
  showQualifiedDivider: boolean;
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: entry.qualified ? `${colors.primary}08` : 'transparent',
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: `${colors.outlineVariant}1A`,
        }}
      >
        {/* Rank */}
        <Text
          style={{
            fontFamily: 'AnyBody-Bold',
            fontSize: 12,
            width: 20,
            color: entry.rank <= 2 ? colors.primary : colors.onSurfaceVariant,
          }}
        >
          {entry.rank}
        </Text>

        {/* Flag + name */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image
            source={{ uri: entry.team.flagUrl }}
            style={{ width: 22, height: 16, borderRadius: 2 }}
            resizeMode="cover"
          />
          <Text
            style={{
              fontFamily: 'WorkSans-Regular',
              fontSize: 13,
              color: colors.onSurface,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {entry.team.name}
          </Text>
        </View>

        {/* Stats */}
        <Text style={[styles.cell]}>{entry.played}</Text>
        <Text style={[styles.cell]}>{entry.won}</Text>
        <Text style={[styles.cell]}>{entry.drawn}</Text>
        <Text style={[styles.cell]}>{entry.lost}</Text>
        <Text style={[styles.cell]}>
          {entry.goalDiff > 0 ? `+${entry.goalDiff}` : entry.goalDiff}
        </Text>
        <Text style={[styles.cell, { color: colors.primary, fontFamily: 'AnyBody-Bold' }]}>
          {entry.points}
        </Text>
      </View>

      {/* Qualified zone divider */}
      {showQualifiedDivider && (
        <View
          style={{
            height: 2,
            marginHorizontal: 12,
            backgroundColor: `${colors.primary}40`,
            borderRadius: 1,
          }}
        />
      )}
    </>
  );
}

const styles = {
  colHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.8,
    color: colors.onSurfaceVariant,
  },
  colNum: {
    width: 30,
    textAlign: 'center' as const,
  },
  cell: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 13,
    width: 30,
    textAlign: 'center' as const,
    color: colors.onSurface,
  },
};
