import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../../theme';
import type { GroupStanding } from '../../types/stats';

interface Props {
  standing: GroupStanding;
}

const COL_W = { played: 32, goalDiff: 40, points: 36 };

export function GroupStandingsCard({ standing }: Props) {
  return (
    <View
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}4D`,
      }}
    >
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{
          backgroundColor: colors.surfaceHigh,
          borderBottomWidth: 1,
          borderBottomColor: `${colors.outlineVariant}4D`,
        }}
      >
        <View className="flex-row items-center gap-x-2">
          <MaterialIcons name="table-chart" size={20} color={colors.primary} />
          <Text className="font-anybody-bold text-base text-on-surface">
            Grupo {standing.group}
          </Text>
        </View>
        <MaterialIcons name="more-vert" size={20} color={colors.onSurfaceVariant} />
      </View>

      {/* Table header */}
      <View
        className="flex-row items-center px-4 py-2"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: `${colors.outlineVariant}4D`,
        }}
      >
        <Text className="flex-1 font-inter-semibold text-xs tracking-widest text-on-surface-variant">
          TIME
        </Text>
        <Text
          className="font-inter-semibold text-xs tracking-widest text-on-surface-variant text-center"
          style={{ width: COL_W.played }}
        >
          J
        </Text>
        <Text
          className="font-inter-semibold text-xs tracking-widest text-on-surface-variant text-center"
          style={{ width: COL_W.goalDiff }}
        >
          SG
        </Text>
        <Text
          className="font-inter-semibold text-xs tracking-widest text-on-surface-variant text-center"
          style={{ width: COL_W.points }}
        >
          PTS
        </Text>
      </View>

      {/* Rows */}
      {standing.teams.map((team, index) => (
        <View
          key={team.shortName}
          className="flex-row items-center px-4 py-3"
          style={{
            borderLeftWidth: 2,
            borderLeftColor: team.qualified ? colors.primary : 'transparent',
            borderBottomWidth: index < standing.teams.length - 1 ? 1 : 0,
            borderBottomColor: `${colors.outlineVariant}1A`,
          }}
        >
          <View className="flex-1 flex-row items-center gap-x-2">
            <View
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: team.qualified ? colors.secondary : colors.surfaceHighest,
              }}
            />
            <Text
              className={`font-inter-semibold text-sm ${
                team.qualified ? 'text-on-surface' : 'text-on-surface-variant'
              }`}
            >
              {team.shortName}
            </Text>
          </View>
          <Text
            className="font-work-sans text-sm text-on-surface-variant text-center"
            style={{ width: COL_W.played }}
          >
            {team.played}
          </Text>
          <Text
            className="font-work-sans text-sm text-on-surface-variant text-center"
            style={{ width: COL_W.goalDiff }}
          >
            {team.goalDiff > 0 ? `+${team.goalDiff}` : `${team.goalDiff}`}
          </Text>
          <Text
            className={`font-anybody-bold text-sm text-center ${
              team.qualified ? 'text-on-surface' : 'text-on-surface-variant'
            }`}
            style={{ width: COL_W.points }}
          >
            {team.points}
          </Text>
        </View>
      ))}
    </View>
  );
}
