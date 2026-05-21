import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchDayItem } from '../../types/home';

interface Props {
  match: MatchDayItem;
  onPress?: () => void;
}

export function MatchDayCard({ match, onPress }: Props) {
  const isLive = match.status === 'live';

  return (
    <Pressable
      testID="match-day-card"
      onPress={onPress}
      className="bg-surface-high rounded-xl p-4 mx-4 mb-3"
    >
      <View className="flex-row items-center justify-between mb-3">
        <Text className="font-work-sans text-xs font-semibold text-on-surface-variant">
          {match.stage}
        </Text>
        {isLive && (
          <View className="flex-row items-center gap-x-1">
            <View className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <Text className="font-work-sans text-xs font-bold" style={{ color: colors.secondary }}>
              LIVE
            </Text>
            <Text className="font-work-sans text-xs text-on-surface-variant">
              {match.minute}'
            </Text>
          </View>
        )}
        {!isLive && match.startTime && (
          <Text className="font-work-sans text-xs text-on-surface-variant">{match.startTime}</Text>
        )}
      </View>

      <View className="flex-row items-center justify-between">
        <TeamInfo
          flagUrl={match.homeTeam.flagUrl}
          shortName={match.homeTeam.shortName}
          align="left"
        />

        <View className="items-center">
          {isLive ? (
            <Text
              className="font-anybody text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              {match.homeScore} - {match.awayScore}
            </Text>
          ) : (
            <Text className="font-anybody text-xl font-bold text-on-surface-variant">VS</Text>
          )}
        </View>

        <TeamInfo
          flagUrl={match.awayTeam.flagUrl}
          shortName={match.awayTeam.shortName}
          align="right"
        />
      </View>
    </Pressable>
  );
}

interface TeamInfoProps {
  flagUrl: string;
  shortName: string;
  align: 'left' | 'right';
}

function TeamInfo({ flagUrl, shortName, align }: TeamInfoProps) {
  return (
    <View className={`items-center gap-y-1 ${align === 'right' ? 'items-end' : 'items-start'}`}>
      <Image source={{ uri: flagUrl }} className="w-10 h-7 rounded" resizeMode="contain" />
      <Text className="font-anybody text-sm font-bold text-on-surface">{shortName}</Text>
    </View>
  );
}
