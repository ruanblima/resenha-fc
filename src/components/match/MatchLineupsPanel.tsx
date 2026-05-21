import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../../theme';
import type { LineupPlayer, MatchLineup, Team, TeamLineup } from '../../types/match';

interface Props {
  lineup: MatchLineup;
  homeTeam: Team;
  awayTeam: Team;
}

export function MatchLineupsPanel({ lineup, homeTeam, awayTeam }: Props) {
  return (
    <View className="gap-y-4">
      <TeamLineupCard team={homeTeam} lineup={lineup.home} isHome />
      <TeamLineupCard team={awayTeam} lineup={lineup.away} isHome={false} />
    </View>
  );
}

function TeamLineupCard({
  team,
  lineup,
  isHome,
}: {
  team: Team;
  lineup: TeamLineup;
  isHome: boolean;
}) {
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
        className="flex-row items-center justify-between px-6 py-3"
        style={{ backgroundColor: colors.surfaceHigh }}
      >
        <Text
          className="font-anybody-bold text-base"
          style={{ color: isHome ? colors.primary : colors.onSurface }}
        >
          {team.name.toUpperCase()}
        </Text>
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant">
          {lineup.formation}
        </Text>
      </View>

      {/* Starters */}
      <View className="p-4 gap-y-2">
        {lineup.starters.map((player) => (
          <PlayerRow key={player.number} player={player} isHome={isHome} />
        ))}
      </View>

      {/* Bench */}
      <View
        className="px-4 pb-4 pt-3"
        style={{ borderTopWidth: 1, borderTopColor: `${colors.outlineVariant}33` }}
      >
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant mb-2">
          RESERVAS
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {lineup.bench.map((name) => (
            <View
              key={name}
              className="px-2 py-1 rounded"
              style={{ backgroundColor: colors.surfaceHighest }}
            >
              <Text className="font-work-sans text-xs text-on-surface-variant">{name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function PlayerRow({ player, isHome }: { player: LineupPlayer; isHome: boolean }) {
  return (
    <View
      className="flex-row items-center justify-between px-3 py-3 rounded-lg"
      style={{
        backgroundColor: colors.surfaceContainerLowest,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}1A`,
      }}
    >
      <View className="flex-row items-center gap-x-3">
        <Text
          className="font-anybody-bold text-base w-6"
          style={{ color: isHome ? colors.primaryContainer : colors.onSurfaceVariant }}
        >
          {player.number}
        </Text>
        <Text className="font-work-sans text-base text-on-surface">{player.name}</Text>
      </View>
      {player.scored && (
        <MaterialIcons name="sports-soccer" size={16} color={isHome ? colors.primary : colors.onSurfaceVariant} />
      )}
    </View>
  );
}
