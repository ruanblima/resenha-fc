import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchDetails, MatchEvent } from '../../types/match';

interface Props {
  match: MatchDetails;
}

export function MatchScoreboardHero({ match }: Props) {
  const isLive = match.status === 'live';
  const homeGoals = match.events.filter((e) => e.type === 'goal' && e.team === 'home');
  const awayGoals = match.events.filter((e) => e.type === 'goal' && e.team === 'away');
  const homeWon = match.status === 'finished' && match.homeScore > match.awayScore;
  const awayWon = match.status === 'finished' && match.awayScore > match.homeScore;

  return (
    <View
      className="rounded-xl p-6 items-center overflow-hidden"
      style={{
        backgroundColor: colors.surfaceHigh,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}4D`,
      }}
    >
      {/* Gradient overlay subtle */}
      <View
        className="absolute inset-0 rounded-xl"
        style={{ backgroundColor: `${colors.primary}0D` }}
        pointerEvents="none"
      />

      {/* Live badge */}
      {isLive && (
        <View
          className="flex-row items-center gap-x-2 px-3 py-1 rounded-full mb-4 self-center"
          style={{
            backgroundColor: colors.surfaceContainer,
            borderWidth: 1,
            borderColor: `${colors.outlineVariant}80`,
          }}
        >
          <View className="w-2 h-2 rounded-full bg-secondary" />
          <Text className="font-inter-semibold text-xs tracking-widest text-secondary">
            {match.minute}'
          </Text>
          <Text className="font-inter-semibold text-xs tracking-widest text-secondary">LIVE</Text>
        </View>
      )}

      {/* Teams + Score */}
      <View className="flex-row items-center justify-between w-full max-w-xs">
        {/* Home team */}
        <TeamFlag
          flagUrl={match.homeTeam.flagUrl}
          shortName={match.homeTeam.shortName}
          isWinner={homeWon}
        />

        {/* Score */}
        <View className="flex-row items-center gap-x-3 px-4">
          <Text
            className="font-anybody-extrabold text-5xl"
            style={{
              color: homeWon ? colors.primaryContainer : colors.onSurfaceVariant,
              opacity: awayWon ? 0.4 : 1,
              letterSpacing: -0.96,
            }}
          >
            {match.homeScore}
          </Text>
          <Text
            className="font-anybody-bold text-2xl"
            style={{ color: colors.onSurfaceVariant, opacity: 0.5 }}
          >
            -
          </Text>
          <Text
            className="font-anybody-extrabold text-5xl"
            style={{
              color: awayWon ? colors.primaryContainer : colors.onSurfaceVariant,
              opacity: homeWon ? 0.4 : 1,
              letterSpacing: -0.96,
            }}
          >
            {match.awayScore}
          </Text>
        </View>

        {/* Away team */}
        <TeamFlag
          flagUrl={match.awayTeam.flagUrl}
          shortName={match.awayTeam.shortName}
          isWinner={awayWon}
        />
      </View>

      {/* Stage + Venue */}
      <Text className="font-work-sans text-sm text-on-surface-variant text-center mt-3">
        {match.stage} • {match.venue}
      </Text>

      {/* Scorers */}
      {(homeGoals.length > 0 || awayGoals.length > 0) && (
        <View className="flex-row justify-between w-full mt-5 px-2">
          <GoalsList goals={homeGoals} align="left" />
          <GoalsList goals={awayGoals} align="right" />
        </View>
      )}
    </View>
  );
}

function TeamFlag({
  flagUrl,
  shortName,
  isWinner,
}: {
  flagUrl: string;
  shortName: string;
  isWinner: boolean;
}) {
  return (
    <View className="items-center gap-y-2">
      <View
        className="w-16 h-16 rounded-full overflow-hidden p-0.5"
        style={{
          borderWidth: 2,
          borderColor: isWinner ? colors.primaryContainer : `${colors.outlineVariant}80`,
          backgroundColor: colors.surface,
          shadowColor: isWinner ? colors.primary : 'transparent',
          shadowOpacity: isWinner ? 0.2 : 0,
          shadowRadius: 15,
          shadowOffset: { width: 0, height: 0 },
        }}
      >
        <Image
          source={{ uri: flagUrl }}
          className="w-full h-full rounded-full"
          resizeMode="cover"
        />
      </View>
      <Text className="font-anybody-bold text-base text-on-surface">{shortName}</Text>
    </View>
  );
}

function GoalsList({
  goals,
  align,
}: {
  goals: MatchEvent[];
  align: 'left' | 'right';
}) {
  return (
    <View className={`flex-1 gap-y-1 ${align === 'right' ? 'items-end' : 'items-start'}`}>
      {goals.map((g, i) => (
        <View
          key={i}
          className={`flex-row items-center gap-x-1.5 ${align === 'right' ? 'flex-row-reverse' : ''}`}
        >
          <MaterialIcons name="sports-soccer" size={12} color={colors.onSurfaceVariant} />
          <Text className="font-work-sans text-xs text-on-surface-variant">
            {g.playerName} {g.minute}'
          </Text>
        </View>
      ))}
    </View>
  );
}
