import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../../theme';
import type { LiveMatch, MatchEvent } from '../../types/match';

interface Props {
  match: LiveMatch;
  onPress?: () => void;
}

function GoalEvents({ events }: { events: MatchEvent[] }) {
  if (events.length === 0) return null;
  return (
    <View className="flex-row flex-wrap gap-x-3 mt-0.5">
      {events.map((e, i) => (
        <View key={i} className="flex-row items-center gap-0.5">
          <MaterialIcons name="sports-soccer" size={12} color={colors.primary} />
          <Text className="text-on-surface-variant font-inter text-xs">{e.minute}'</Text>
        </View>
      ))}
    </View>
  );
}

function TeamRow({
  team,
  score,
  events,
  isWinning,
}: {
  team: LiveMatch['homeTeam'];
  score: number;
  events: MatchEvent[];
  isWinning: boolean;
}) {
  return (
    <View className="flex-row items-center px-4 py-2.5">
      <Image
        source={{ uri: team.flagUrl }}
        className="w-9 h-9 rounded-full mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-on-surface font-anybody-bold text-base">{team.name}</Text>
        <GoalEvents events={events} />
      </View>
      <Text
        className={`font-anybody-extrabold text-3xl ml-3 ${
          isWinning ? 'text-primary' : 'text-on-surface-variant'
        }`}
      >
        {score}
      </Text>
    </View>
  );
}

export function LiveMatchCard({ match, onPress }: Props) {
  const homeGoals = match.events.filter((e) => e.type === 'goal' && e.team === 'home');
  const awayGoals = match.events.filter((e) => e.type === 'goal' && e.team === 'away');
  const homeWinning = match.homeScore > match.awayScore;
  const awayWinning = match.awayScore > match.homeScore;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-surface rounded-lg mx-4 mb-3 overflow-hidden border border-outline-variant"
    >
      {/* Card header: fase + minuto */}
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-outline-variant">
        <Text className="text-on-surface-variant font-inter-semibold text-xs tracking-widest uppercase">
          {match.stage}
        </Text>
        <View className="flex-row items-center gap-1.5">
          <View className="w-2 h-2 rounded-full bg-secondary" />
          <Text className="text-on-surface font-inter-semibold text-xs">{match.minute}'</Text>
        </View>
      </View>

      {/* Time da casa */}
      <TeamRow
        team={match.homeTeam}
        score={match.homeScore}
        events={homeGoals}
        isWinning={homeWinning}
      />

      {/* Divisor VS */}
      <View className="flex-row items-center px-4 py-1">
        <View className="flex-1 h-px bg-outline-variant" />
        <Text className="text-outline font-inter text-xs mx-3">VS</Text>
        <View className="flex-1 h-px bg-outline-variant" />
      </View>

      {/* Time visitante */}
      <TeamRow
        team={match.awayTeam}
        score={match.awayScore}
        events={awayGoals}
        isWinning={awayWinning}
      />
    </TouchableOpacity>
  );
}
