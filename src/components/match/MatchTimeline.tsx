import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchEvent, Team } from '../../types/match';

interface Props {
  events: MatchEvent[];
  homeTeam: Team;
  awayTeam: Team;
}

export function MatchTimeline({ events, homeTeam, awayTeam }: Props) {
  const sorted = [...events].sort((a, b) => b.minute - a.minute);

  return (
    <View
      className="rounded-xl p-4"
      style={{
        backgroundColor: colors.surfaceHigh,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}4D`,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-x-2 mb-5">
        <MaterialIcons name="history" size={16} color={colors.onSurfaceVariant} />
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant">
          LANCES DA PARTIDA
        </Text>
      </View>

      {/* Timeline */}
      <View style={{ borderLeftWidth: 1, borderLeftColor: `${colors.outlineVariant}4D`, marginLeft: 16 }}>
        {sorted.map((event, index) => (
          <TimelineEvent
            key={index}
            event={event}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            isLast={index === sorted.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

function TimelineEvent({
  event,
  homeTeam,
  awayTeam,
  isLast,
}: {
  event: MatchEvent;
  homeTeam: Team;
  awayTeam: Team;
  isLast: boolean;
}) {
  const isGoal = event.type === 'goal';
  const isYellowCard = event.type === 'yellow_card';
  const isRedCard = event.type === 'red_card';
  const isSubstitution = event.type === 'substitution';
  const teamName = event.team === 'home' ? homeTeam.name : awayTeam.name;

  const dotBorderColor = isGoal
    ? colors.primary
    : isYellowCard
      ? '#f2ca50'
      : isRedCard
        ? colors.error
        : colors.outlineVariant;

  return (
    <View className={`pl-6 relative ${isLast ? '' : 'mb-6'}`}>
      {/* Timeline dot */}
      <View
        className="absolute items-center justify-center"
        style={{
          left: -8,
          top: 2,
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: colors.surface,
          borderWidth: 2,
          borderColor: dotBorderColor,
        }}
      >
        {isGoal && (
          <MaterialIcons name="sports-soccer" size={8} color={colors.primary} />
        )}
        {isYellowCard && (
          <View style={{ width: 6, height: 8, backgroundColor: '#f2ca50', borderRadius: 1 }} />
        )}
        {isRedCard && (
          <View style={{ width: 6, height: 8, backgroundColor: colors.error, borderRadius: 1 }} />
        )}
        {isSubstitution && (
          <MaterialIcons name="swap-horiz" size={8} color={colors.onSurfaceVariant} />
        )}
      </View>

      <View className="flex-row items-start gap-x-3">
        {/* Minute */}
        <Text
          className="font-inter-semibold text-xs tracking-widest pt-1 w-8"
          style={{ color: isGoal ? colors.primary : colors.onSurfaceVariant }}
        >
          {event.minute}'
        </Text>

        {/* Event card */}
        <View
          className="flex-1 rounded-lg p-3"
          style={{
            backgroundColor: colors.surfaceContainer,
            borderWidth: 1,
            borderColor: isGoal ? `${colors.primary}33` : `${colors.outlineVariant}4D`,
            borderTopWidth: isGoal ? 1 : 1,
            borderTopColor: isGoal ? `${colors.primary}80` : `${colors.outlineVariant}4D`,
          }}
        >
          {isGoal && (
            <>
              <Text className="font-anybody-bold text-sm text-on-surface mb-1">
                GOL! - {teamName}
              </Text>
              <Text className="font-work-sans text-xs text-on-surface-variant">
                {event.playerName}
              </Text>
              {event.description && (
                <Text className="font-work-sans text-xs text-on-surface-variant mt-1">
                  {event.description}
                </Text>
              )}
            </>
          )}

          {isSubstitution && (
            <>
              <Text className="font-anybody-bold text-sm text-on-surface mb-1">
                Substituição - {teamName}
              </Text>
              <View className="flex-row items-center gap-x-3">
                {event.playerOut && (
                  <View className="flex-row items-center gap-x-1">
                    <Text className="font-work-sans text-xs" style={{ color: colors.error }}>↓</Text>
                    <Text className="font-work-sans text-xs" style={{ color: colors.error }}>
                      {event.playerOut}
                    </Text>
                  </View>
                )}
                <View className="flex-row items-center gap-x-1">
                  <Text className="font-work-sans text-xs" style={{ color: colors.secondary }}>↑</Text>
                  <Text className="font-work-sans text-xs" style={{ color: colors.secondary }}>
                    {event.playerName}
                  </Text>
                </View>
              </View>
            </>
          )}

          {isYellowCard && (
            <>
              <Text className="font-anybody-bold text-sm text-on-surface mb-1">
                Cartão Amarelo - {teamName}
              </Text>
              <Text className="font-work-sans text-xs text-on-surface-variant">
                {event.playerName}
              </Text>
              {event.description && (
                <Text className="font-work-sans text-xs text-on-surface-variant">
                  {event.description}
                </Text>
              )}
            </>
          )}

          {isRedCard && (
            <>
              <Text className="font-anybody-bold text-sm text-on-surface mb-1">
                Cartão Vermelho - {teamName}
              </Text>
              <Text className="font-work-sans text-xs text-on-surface-variant">
                {event.playerName}
              </Text>
              {event.description && (
                <Text className="font-work-sans text-xs text-on-surface-variant">
                  {event.description}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}
