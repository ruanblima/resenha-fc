import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../../theme';
import type { LineupPlayer, MatchEvent, MatchLineup, MatchStatus, Team, TeamLineup } from '../../types/match';

interface Props {
  lineup: MatchLineup;
  homeTeam: Team;
  awayTeam: Team;
  events: MatchEvent[];
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}

export function MatchLineupsPanel({ lineup, homeTeam, awayTeam, events, homeScore, awayScore, status }: Props) {
  const homeWon = status === 'finished' && homeScore > awayScore;
  const awayWon = status === 'finished' && awayScore > homeScore;
  return (
    <View className="gap-y-4">
      <TeamLineupCard team={homeTeam} lineup={lineup.home} isHome isWinner={homeWon} side="home" events={events} />
      <TeamLineupCard team={awayTeam} lineup={lineup.away} isHome={false} isWinner={awayWon} side="away" events={events} />
    </View>
  );
}

// Matches full names against abbreviated names (e.g. "Moisés Caicedo" ↔ "M. Caicedo")
function nameMatches(a: string, b: string): boolean {
  if (!a || !b) return false;
  const norm = (s: string) => s.toLowerCase().trim();
  const na = norm(a);
  const nb = norm(b);
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;
  const lastA = na.split(' ').at(-1) ?? '';
  const lastB = nb.split(' ').at(-1) ?? '';
  return !!(lastA && lastB && lastA.length > 2 && lastA === lastB);
}

function TeamLineupCard({
  team,
  lineup,
  isHome,
  isWinner,
  side,
  events,
}: {
  team: Team;
  lineup: TeamLineup;
  isHome: boolean;
  isWinner: boolean;
  side: 'home' | 'away';
  events: MatchEvent[];
}) {
  const teamEvents = events.filter((e) => e.team === side);
  const yellowCards = teamEvents.filter((e) => e.type === 'yellow_card').map((e) => e.playerName);
  const goals = teamEvents.filter((e) => e.type === 'goal').map((e) => e.playerName);
  const substitutions = teamEvents.filter((e) => e.type === 'substitution');
  // playerOut = who came OFF (starters), playerName = who came ON (bench)
  const subbedOutNames = substitutions.map((e) => e.playerOut ?? '');
  const subbedInNames = substitutions.map((e) => e.playerName);

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
        {lineup.starters.map((player) => {
          const wasSubbedOut = subbedOutNames.some((n) => nameMatches(n, player.name));
          const hasYellow = yellowCards.some((n) => nameMatches(n, player.name));
          const scored = goals.some((n) => nameMatches(n, player.name));
          return (
            <PlayerRow
              key={player.number}
              player={player}
              isWinner={isWinner}
              wasSubbedOut={wasSubbedOut}
              hasYellow={hasYellow}
              scored={scored}
            />
          );
        })}
      </View>

      {/* Bench */}
      <View
        className="px-4 pb-4 pt-3"
        style={{ borderTopWidth: 1, borderTopColor: `${colors.outlineVariant}33` }}
      >
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant mb-2">
          RESERVAS
        </Text>
        <View className="gap-y-1">
          {lineup.bench.map((player) => {
            const cameOn = subbedInNames.some((n) => nameMatches(n, player.name));
            const hasYellow = yellowCards.some((n) => nameMatches(n, player.name));
            return (
              <BenchPlayerRow key={player.number} player={player} isWinner={isWinner} cameOn={cameOn} hasYellow={hasYellow} />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function PlayerRow({
  player,
  isWinner,
  wasSubbedOut,
  hasYellow,
  scored,
}: {
  player: LineupPlayer;
  isWinner: boolean;
  wasSubbedOut: boolean;
  hasYellow: boolean;
  scored: boolean;
}) {
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
          style={{ color: isWinner ? colors.primaryContainer : colors.onSurfaceVariant }}
        >
          {player.number}
        </Text>
        <Text className="font-work-sans text-base text-on-surface">{player.name}</Text>
      </View>
      <View className="flex-row items-center gap-x-2">
        {scored && (
          <MaterialIcons name="sports-soccer" size={16} color={isWinner ? colors.primary : colors.onSurfaceVariant} />
        )}
        {hasYellow && <YellowCardIcon />}
        {wasSubbedOut && (
          <MaterialIcons name="arrow-downward" size={16} color="#EF4444" />
        )}
      </View>
    </View>
  );
}

function BenchPlayerRow({
  player,
  isWinner,
  cameOn,
  hasYellow,
}: {
  player: LineupPlayer;
  isWinner: boolean;
  cameOn: boolean;
  hasYellow: boolean;
}) {
  return (
    <View
      className="flex-row items-center justify-between px-3 py-2 rounded-lg"
      style={{
        backgroundColor: cameOn ? `${colors.primary}14` : colors.surfaceHighest,
        borderWidth: cameOn ? 1 : 0,
        borderColor: cameOn ? `${colors.primary}33` : 'transparent',
      }}
    >
      <View className="flex-row items-center gap-x-3">
        <Text
          className="font-anybody-bold text-sm w-6"
          style={{ color: isWinner ? colors.primaryContainer : colors.onSurfaceVariant }}
        >
          {player.number}
        </Text>
        <Text className="font-work-sans text-sm text-on-surface-variant">{player.name}</Text>
      </View>
      <View className="flex-row items-center gap-x-2">
        {hasYellow && <YellowCardIcon />}
        {cameOn && (
          <MaterialIcons name="arrow-upward" size={16} color="#22C55E" />
        )}
      </View>
    </View>
  );
}

function YellowCardIcon() {
  return (
    <View
      style={{
        width: 10,
        height: 14,
        backgroundColor: '#FACC15',
        borderRadius: 2,
      }}
    />
  );
}
