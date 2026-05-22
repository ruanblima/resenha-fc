import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme';
import type { Competition, CompetitionMatch } from '../../types/home';

interface Props {
  competition: Competition;
  matches: CompetitionMatch[];
  onPressMatch?: (id: number) => void;
}

export function CompetitionMatchesScreen({ competition, matches, onPressMatch }: Props) {
  const rounds = useMemo(() => {
    const unique = Array.from(new Set(matches.map((m) => m.stage)));
    return ['Todos', ...unique];
  }, [matches]);

  const [selectedRound, setSelectedRound] = useState('Todos');

  const filtered =
    selectedRound === 'Todos' ? matches : matches.filter((m) => m.stage === selectedRound);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Round filter chips */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {rounds.map((round) => {
            const isActive = round === selectedRound;
            return (
              <TouchableOpacity
                key={round}
                onPress={() => setSelectedRound(round)}
                activeOpacity={0.7}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: isActive ? colors.primary : colors.surfaceHigh,
                  borderWidth: isActive ? 0 : 1,
                  borderColor: `${colors.outlineVariant}33`,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 12,
                    letterSpacing: 0.6,
                    color: isActive ? colors.onPrimary : colors.onSurface,
                    fontWeight: isActive ? '700' : '400',
                  }}
                >
                  {round}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Match list */}
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        {filtered.map((match) => (
          <CompetitionMatchCard
            key={match.id}
            match={match}
            onPress={() => onPressMatch?.(match.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function CompetitionMatchCard({
  match,
  onPress,
}: {
  match: CompetitionMatch;
  onPress: () => void;
}) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  const homeWins =
    isFinished &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.homeScore > match.awayScore;
  const awayWins =
    isFinished &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.awayScore > match.homeScore;

  return (
    <TouchableOpacity
      testID={`competition-match-${match.id}`}
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}33`,
        overflow: 'hidden',
        opacity: isFinished ? 0.85 : 1,
      }}
    >
      {/* Gold top accent on live */}
      {isLive && <View style={{ height: 1, backgroundColor: colors.primaryContainer }} />}

      <View style={{ padding: 16 }}>
        {/* Status row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          {isLive ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.secondary }}
              />
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 11,
                  color: colors.secondary,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                LIVE {match.minute}'
              </Text>
            </View>
          ) : isFinished ? (
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 11,
                color: colors.onSurfaceVariant,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              ENCERRADO
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 11,
                color: colors.onSurfaceVariant,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {match.startTime ? `Hoje • ${match.startTime}` : 'Em Breve'}
            </Text>
          )}

          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 10,
              color: colors.onSurfaceVariant,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}
          >
            {match.stage}
            {match.venue ? ` • ${match.venue}` : ''}
          </Text>
        </View>

        {/* Teams + score row */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Home team */}
          <View style={{ flex: 1, alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.surfaceContainer,
                borderWidth: 1,
                borderColor: `${colors.outlineVariant}25`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="sports-soccer" size={22} color={colors.onSurfaceVariant} />
            </View>
            <Text
              style={{
                fontFamily: 'Anybody_700Bold',
                fontSize: 14,
                color: isFinished && awayWins ? `${colors.onSurface}66` : colors.onSurface,
                textAlign: 'center',
              }}
            >
              {match.homeTeam.shortName}
            </Text>
          </View>

          {/* Score / VS */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            {isLive || isFinished ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text
                  style={{
                    fontFamily: 'Anybody_800ExtraBold',
                    fontSize: 36,
                    color: isFinished
                      ? homeWins
                        ? colors.primary
                        : `${colors.onSurface}55`
                      : colors.primary,
                    lineHeight: 40,
                  }}
                >
                  {match.homeScore}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Anybody_700Bold',
                    fontSize: 24,
                    color: colors.onSurfaceVariant,
                  }}
                >
                  :
                </Text>
                <Text
                  style={{
                    fontFamily: 'Anybody_800ExtraBold',
                    fontSize: 36,
                    color: isFinished
                      ? awayWins
                        ? colors.primary
                        : `${colors.onSurface}55`
                      : `${colors.onSurface}99`,
                    lineHeight: 40,
                  }}
                >
                  {match.awayScore}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  backgroundColor: colors.surfaceHigh,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: `${colors.outlineVariant}25`,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Anybody_700Bold',
                    fontSize: 16,
                    color: colors.primary,
                  }}
                >
                  VS
                </Text>
              </View>
            )}
          </View>

          {/* Away team */}
          <View style={{ flex: 1, alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.surfaceContainer,
                borderWidth: 1,
                borderColor: `${colors.outlineVariant}25`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="sports-soccer" size={22} color={colors.onSurfaceVariant} />
            </View>
            <Text
              style={{
                fontFamily: 'Anybody_700Bold',
                fontSize: 14,
                color: isFinished && homeWins ? `${colors.onSurface}66` : colors.onSurface,
                textAlign: 'center',
              }}
            >
              {match.awayTeam.shortName}
            </Text>
          </View>
        </View>

        {/* View match hub CTA for live matches */}
        {isLive && (
          <View
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: `${colors.outlineVariant}20`,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 12,
                  color: colors.primary,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}
              >
                VER PARTIDA
              </Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
