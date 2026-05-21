import React from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchDayItem } from '../../types/home';

const CARD_WIDTH = Dimensions.get('window').width * 0.85;

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
      style={{ width: CARD_WIDTH, height: 180 }}
      className={`bg-surface-container rounded-xl p-5 flex-col justify-between ${
        isLive ? 'border-t-2' : 'border border-outline-variant'
      }`}
      // NativeWind não suporta border-top dinâmico por cor, usamos style inline para o live
      {...(isLive ? { style: { width: CARD_WIDTH, height: 180, borderTopWidth: 2, borderTopColor: colors.primary } } : {})}
    >
      {/* Top row */}
      <View className="flex-row justify-between items-center w-full">
        {isLive ? (
          <View className="flex-row items-center gap-x-1.5 bg-background px-2 py-1 rounded border border-outline-variant">
            <View
              className="w-2 h-2 rounded-full bg-secondary"
            />
            <Text className="font-inter-semibold text-xs tracking-widest text-secondary">
              LIVE
            </Text>
            <Text className="font-inter-semibold text-xs text-secondary">
              {match.minute}'
            </Text>
          </View>
        ) : (
          <View className="bg-background px-2 py-1 rounded">
            <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant">
              {match.startTime} GMT
            </Text>
          </View>
        )}
        <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant uppercase">
          {match.stage}
        </Text>
      </View>

      {/* Teams + Score */}
      <View className="flex-row justify-between items-center w-full mt-4">
        <TeamInfo flagUrl={match.homeTeam.flagUrl} shortName={match.homeTeam.shortName} />

        {isLive ? (
          <View className="flex-row items-center gap-x-3">
            <Text
              className="font-anybody-extrabold text-5xl"
              style={{ color: colors.primary, letterSpacing: -0.96 }}
            >
              {match.homeScore}
            </Text>
            <Text
              className="font-anybody-extrabold text-5xl"
              style={{ color: colors.onSurfaceVariant, opacity: 0.6, letterSpacing: -0.96 }}
            >
              -
            </Text>
            <Text
              className="font-anybody-extrabold text-5xl"
              style={{ color: colors.onSurfaceVariant, opacity: 0.6, letterSpacing: -0.96 }}
            >
              {match.awayScore}
            </Text>
          </View>
        ) : (
          <Text
            className="font-anybody-bold text-2xl"
            style={{ color: colors.onSurfaceVariant, opacity: 0.7 }}
          >
            VS
          </Text>
        )}

        <TeamInfo flagUrl={match.awayTeam.flagUrl} shortName={match.awayTeam.shortName} />
      </View>
    </Pressable>
  );
}

interface TeamInfoProps {
  flagUrl: string;
  shortName: string;
}

function TeamInfo({ flagUrl, shortName }: TeamInfoProps) {
  return (
    <View className="items-center gap-y-2 w-20">
      <View className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant bg-background">
        <Image source={{ uri: flagUrl }} className="w-full h-full" resizeMode="cover" />
      </View>
      <Text className="font-inter-semibold text-xs tracking-widest text-on-surface uppercase">
        {shortName}
      </Text>
    </View>
  );
}
