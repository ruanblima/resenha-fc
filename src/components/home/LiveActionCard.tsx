import React from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchSummary, MatchTeam } from '../../types/api';

const CARD_WIDTH = Dimensions.get('window').width * 0.82;

interface Props {
  matches: MatchSummary[];
  onPressMatch?: (id: number) => void;
}

export function LiveActionCard({ matches, onPressMatch }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 4 }}
      snapToInterval={CARD_WIDTH + 12}
      decelerationRate="fast"
      snapToAlignment="start"
    >
      {matches.map((match) => (
        <LiveMatchCard
          key={match.id}
          match={match}
          onPress={onPressMatch ? () => onPressMatch(match.id) : undefined}
        />
      ))}
    </ScrollView>
  );
}

function LiveMatchCard({
  match,
  onPress,
}: {
  match: MatchSummary;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: CARD_WIDTH,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 16,
        borderTopWidth: 3,
        borderTopColor: colors.primary,
        overflow: 'hidden',
      }}
    >
      {/* Top row: live badge + minute + stage */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 10,
          gap: 8,
        }}
      >
        {/* Live indicator */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
          <View
            style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.secondary }}
          />
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 11,
              color: colors.secondary,
              letterSpacing: 1.2,
            }}
          >
            AO VIVO
          </Text>
          <View
            style={{
              backgroundColor: `${colors.secondary}20`,
              paddingHorizontal: 7,
              paddingVertical: 2,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: `${colors.secondary}40`,
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 10,
                color: colors.secondary,
                letterSpacing: 0.5,
              }}
            >
              {match.minute}'
            </Text>
          </View>
        </View>

        {/* Stage */}
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 10,
            color: colors.onSurfaceVariant,
            letterSpacing: 0.8,
          }}
        >
          {match.stage.toUpperCase()}
        </Text>
      </View>

      {/* Score row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 4,
        }}
      >
        <TeamDisplay team={match.homeTeam} />

        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text
              style={{
                fontFamily: 'AnyBody-ExtraBold',
                fontSize: 54,
                color: colors.primary,
                letterSpacing: -1,
              }}
            >
              {match.homeScore ?? 0}
            </Text>
            <Text
              style={{
                fontFamily: 'AnyBody-ExtraBold',
                fontSize: 54,
                color: `${colors.onSurfaceVariant}55`,
                letterSpacing: -1,
              }}
            >
              -
            </Text>
            <Text
              style={{
                fontFamily: 'AnyBody-ExtraBold',
                fontSize: 54,
                color: `${colors.onSurfaceVariant}55`,
                letterSpacing: -1,
              }}
            >
              {match.awayScore ?? 0}
            </Text>
          </View>
        </View>

        <TeamDisplay team={match.awayTeam} />
      </View>

      {/* CTA button */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8 }}>
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 10,
            paddingVertical: 11,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'AnyBody-Bold',
              fontSize: 13,
              color: colors.onPrimary,
              letterSpacing: 0.6,
            }}
          >
            VER DETALHES DA PARTIDA
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function TeamDisplay({ team }: { team: MatchTeam }) {
  return (
    <View style={{ alignItems: 'center', gap: 8, width: 68 }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          overflow: 'hidden',
          backgroundColor: colors.surfaceContainer,
          borderWidth: 1,
          borderColor: `${colors.outlineVariant}33`,
        }}
      >
        <Image
          source={{ uri: team.flagUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 12,
          color: colors.onSurface,
          letterSpacing: 1,
          textAlign: 'center',
        }}
      >
        {team.shortName}
      </Text>
    </View>
  );
}
