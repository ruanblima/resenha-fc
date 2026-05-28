import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { colors } from '../../theme';
import type { MatchSummary } from '../../types/api';
import { COMPETITIONS } from '../../constants/competitions';

const ALL_ID = 'all';

interface Props {
  matches: MatchSummary[];
  isLoading?: boolean;
  onPressMatch?: (id: number) => void;
  onLoadMore?: () => void;
}

/* ── Main Screen ────────────────────────────────────────────── */

export function CompetitionMatchesScreen({
  matches,
  isLoading,
  onPressMatch,
  onLoadMore,
}: Props) {
  const [activeCompetition, setActiveCompetition] = useState(ALL_ID);

  const filtered = useMemo(
    () =>
      activeCompetition === ALL_ID
        ? matches
        : matches.filter((m) => m.competitionId === activeCompetition),
    [matches, activeCompetition],
  );

  const liveMatches = filtered.filter((m) => m.status === 'live');
  const upcomingMatches = filtered.filter((m) => m.status === 'upcoming');
  const finishedMatches = filtered.filter((m) => m.status === 'finished');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
        onScrollEndDrag={onLoadMore}
      >
        {/* ── Filter Chips ──────────────────────────────── */}
        <FilterChips
          active={activeCompetition}
          onChange={setActiveCompetition}
        />

        {/* ── Loading ───────────────────────────────────── */}
        {isLoading && (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

        {/* ── Empty ─────────────────────────────────────── */}
        {!isLoading && filtered.length === 0 && (
          <EmptyState />
        )}

        {/* ── AO VIVO ───────────────────────────────────── */}
        {liveMatches.length > 0 && (
          <View style={{ marginTop: 8 }}>
            <SectionHeader title="AO VIVO" liveCount={liveMatches.length} />
            {liveMatches.map((match) => (
              <LiveMatchCard
                key={match.id}
                match={match}
                onPress={onPressMatch ? () => onPressMatch(match.id) : undefined}
              />
            ))}
          </View>
        )}

        {/* ── PRÓXIMAS PARTIDAS ──────────────────────────── */}
        {upcomingMatches.length > 0 && (
          <View style={{ marginTop: liveMatches.length > 0 ? 16 : 8 }}>
            <SectionHeader title="PRÓXIMAS PARTIDAS" />
            {upcomingMatches.map((match) => (
              <UpcomingMatchCard
                key={match.id}
                match={match}
                onPress={onPressMatch ? () => onPressMatch(match.id) : undefined}
              />
            ))}
          </View>
        )}

        {/* ── ENCERRADAS ────────────────────────────────── */}
        {finishedMatches.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <SectionHeader title="ENCERRADAS" />
            {finishedMatches.map((match) => (
              <FinishedMatchCard
                key={match.id}
                match={match}
                onPress={onPressMatch ? () => onPressMatch(match.id) : undefined}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* ── FilterChips ────────────────────────────────────────────── */

const FILTER_CHIPS = [
  { id: ALL_ID, label: 'Todos' },
  ...COMPETITIONS.map((c) => ({ id: c.id, label: c.name })),
];

function FilterChips({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 4,
        gap: 8,
        flexDirection: 'row',
      }}
      style={{ marginBottom: 8 }}
    >
      {FILTER_CHIPS.map((chip) => {
        const isActive = chip.id === active;
        return (
          <Pressable
            key={chip.id}
            onPress={() => onChange(chip.id)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 20,
              backgroundColor: isActive ? colors.primary : `${colors.outlineVariant}25`,
              borderWidth: 1,
              borderColor: isActive ? colors.primary : `${colors.outlineVariant}60`,
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 12,
                color: isActive ? colors.onPrimary : colors.onSurfaceVariant,
                letterSpacing: 0.3,
              }}
            >
              {chip.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/* ── SectionHeader ──────────────────────────────────────────── */

function SectionHeader({ title, liveCount }: { title: string; liveCount?: number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
        gap: 10,
      }}
    >
      <View
        style={{ width: 3, height: 18, borderRadius: 2, backgroundColor: colors.primary }}
      />
      <Text
        style={{
          fontFamily: 'AnyBody-Bold',
          fontSize: 13,
          color: colors.onSurface,
          letterSpacing: 1.2,
        }}
      >
        {title}
      </Text>
      {liveCount !== undefined && liveCount > 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: `${colors.secondary}18`,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.secondary,
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 10,
              color: colors.secondary,
            }}
          >
            {liveCount} ao vivo
          </Text>
        </View>
      )}
    </View>
  );
}

/* ── LiveMatchCard ──────────────────────────────────────────── */

function LiveMatchCard({
  match,
  onPress,
}: {
  match: MatchSummary;
  onPress?: () => void;
}) {
  const homeWinning = (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWinning = (match.awayScore ?? 0) > (match.homeScore ?? 0);

  return (
    <Pressable
      onPress={onPress}
      style={{
        marginHorizontal: 16,
        marginBottom: 10,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 16,
        borderTopWidth: 3,
        borderTopColor: colors.secondary,
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          paddingTop: 12,
          paddingBottom: 8,
        }}
      >
        {/* LIVE badge + minute */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              backgroundColor: `${colors.secondary}20`,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: `${colors.secondary}40`,
            }}
          >
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: colors.secondary,
              }}
            />
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 10,
                color: colors.secondary,
                letterSpacing: 0.8,
              }}
            >
              AO VIVO
            </Text>
          </View>
          {match.minute !== undefined && (
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 11,
                color: colors.onSurfaceVariant,
              }}
            >
              {match.minute}'
            </Text>
          )}
        </View>

        {/* Stage + Venue */}
        <View style={{ alignItems: 'flex-end', gap: 1 }}>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 9,
              color: colors.onSurfaceVariant,
              letterSpacing: 0.8,
            }}
          >
            {match.stage.toUpperCase()}
          </Text>
          {match.venue && (
            <Text
              style={{
                fontFamily: 'WorkSans-Regular',
                fontSize: 10,
                color: `${colors.onSurfaceVariant}80`,
              }}
            >
              {match.venue}
            </Text>
          )}
        </View>
      </View>

      {/* Score row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 8,
          gap: 12,
        }}
      >
        {/* Home team */}
        <TeamScoreBlock
          flagUrl={match.homeTeam.flagUrl}
          name={match.homeTeam.shortName}
          score={match.homeScore ?? 0}
          isWinning={homeWinning}
          align="left"
        />

        {/* Divider */}
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 22,
            color: `${colors.onSurfaceVariant}50`,
          }}
        >
          –
        </Text>

        {/* Away team */}
        <TeamScoreBlock
          flagUrl={match.awayTeam.flagUrl}
          name={match.awayTeam.shortName}
          score={match.awayScore ?? 0}
          isWinning={awayWinning}
          align="right"
        />
      </View>

      {/* CTA button */}
      <Pressable
        onPress={onPress}
        style={{
          marginHorizontal: 14,
          marginBottom: 14,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: `${colors.primary}18`,
          borderWidth: 1,
          borderColor: `${colors.primary}35`,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 12,
            color: colors.primary,
            letterSpacing: 0.8,
          }}
        >
          VER PARTIDA
        </Text>
        <MaterialIcons name="chevron-right" size={14} color={colors.primary} />
      </Pressable>
    </Pressable>
  );
}

/* ── UpcomingMatchCard ──────────────────────────────────────── */

function UpcomingMatchCard({
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
        marginHorizontal: 16,
        marginBottom: 8,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}40`,
        padding: 14,
      }}
    >
      {/* Top row: time + stage + venue */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        {/* Time chip */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: `${colors.outlineVariant}25`,
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 6,
          }}
        >
          <MaterialIcons name="schedule" size={10} color={colors.onSurfaceVariant} />
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 10,
              color: colors.onSurfaceVariant,
              letterSpacing: 0.5,
            }}
          >
            {match.startTime ?? '--:--'}
          </Text>
        </View>

        {/* Stage + venue */}
        <View style={{ alignItems: 'flex-end', gap: 1 }}>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 9,
              color: colors.onSurfaceVariant,
              letterSpacing: 0.8,
            }}
          >
            {match.stage.toUpperCase()}
          </Text>
          {match.venue && (
            <Text
              style={{
                fontFamily: 'WorkSans-Regular',
                fontSize: 10,
                color: `${colors.onSurfaceVariant}70`,
              }}
            >
              {match.venue}
            </Text>
          )}
        </View>
      </View>

      {/* Teams row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        {/* Home */}
        <View style={{ alignItems: 'center', gap: 6, flex: 1 }}>
          <FlagCircle uri={match.homeTeam.flagUrl} size={40} />
          <Text
            style={{
              fontFamily: 'AnyBody-Bold',
              fontSize: 13,
              color: colors.onSurface,
              textAlign: 'center',
            }}
          >
            {match.homeTeam.shortName}
          </Text>
        </View>

        {/* VS */}
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 16,
            color: `${colors.onSurfaceVariant}60`,
          }}
        >
          VS
        </Text>

        {/* Away */}
        <View style={{ alignItems: 'center', gap: 6, flex: 1 }}>
          <FlagCircle uri={match.awayTeam.flagUrl} size={40} />
          <Text
            style={{
              fontFamily: 'AnyBody-Bold',
              fontSize: 13,
              color: colors.onSurface,
              textAlign: 'center',
            }}
          >
            {match.awayTeam.shortName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

/* ── FinishedMatchCard ──────────────────────────────────────── */

function FinishedMatchCard({
  match,
  onPress,
}: {
  match: MatchSummary;
  onPress?: () => void;
}) {
  const homeWinning = (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWinning = (match.awayScore ?? 0) > (match.homeScore ?? 0);

  return (
    <Pressable
      onPress={onPress}
      style={{
        marginHorizontal: 16,
        marginBottom: 8,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}30`,
        padding: 14,
      }}
    >
      {/* Top row: FINAL badge + stage + venue */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        {/* FINAL badge */}
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 6,
            backgroundColor: `${colors.outlineVariant}30`,
            borderWidth: 1,
            borderColor: `${colors.outlineVariant}50`,
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 9,
              color: colors.onSurfaceVariant,
              letterSpacing: 1,
            }}
          >
            ENCERRADO
          </Text>
        </View>

        {/* Stage + venue */}
        <View style={{ alignItems: 'flex-end', gap: 1 }}>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 9,
              color: colors.onSurfaceVariant,
              letterSpacing: 0.8,
            }}
          >
            {match.stage.toUpperCase()}
          </Text>
          {match.venue && (
            <Text
              style={{
                fontFamily: 'WorkSans-Regular',
                fontSize: 10,
                color: `${colors.onSurfaceVariant}60`,
              }}
            >
              {match.venue}
            </Text>
          )}
        </View>
      </View>

      {/* Score row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <TeamScoreBlock
          flagUrl={match.homeTeam.flagUrl}
          name={match.homeTeam.shortName}
          score={match.homeScore ?? 0}
          isWinning={homeWinning}
          align="left"
          dimmed
        />

        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 18,
            color: `${colors.onSurfaceVariant}40`,
          }}
        >
          –
        </Text>

        <TeamScoreBlock
          flagUrl={match.awayTeam.flagUrl}
          name={match.awayTeam.shortName}
          score={match.awayScore ?? 0}
          isWinning={awayWinning}
          align="right"
          dimmed
        />
      </View>
    </Pressable>
  );
}

/* ── EmptyState ─────────────────────────────────────────────── */

function EmptyState() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 60,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          backgroundColor: `${colors.primary}15`,
          borderWidth: 1,
          borderColor: `${colors.primary}25`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="sports-soccer" size={32} color={`${colors.primary}80`} />
      </View>
      <Text
        style={{
          fontFamily: 'AnyBody-ExtraBold',
          fontSize: 16,
          color: colors.onSurface,
          textAlign: 'center',
        }}
      >
        Nenhuma partida encontrada
      </Text>
      <Text
        style={{
          fontFamily: 'WorkSans-Regular',
          fontSize: 13,
          color: colors.onSurfaceVariant,
          textAlign: 'center',
          lineHeight: 20,
        }}
      >
        Não há partidas disponíveis para esta competição no momento.
      </Text>
    </View>
  );
}

/* ── TeamScoreBlock ─────────────────────────────────────────── */

function TeamScoreBlock({
  flagUrl,
  name,
  score,
  isWinning,
  align,
  dimmed = false,
}: {
  flagUrl: string;
  name: string;
  score: number;
  isWinning: boolean;
  align: 'left' | 'right';
  dimmed?: boolean;
}) {
  const isRight = align === 'right';
  const scoreColor = dimmed
    ? isWinning
      ? colors.onSurface
      : `${colors.onSurfaceVariant}60`
    : isWinning
    ? colors.primary
    : `${colors.onSurfaceVariant}80`;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: isRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <FlagCircle uri={flagUrl} size={36} />
      <View
        style={{
          flex: 1,
          alignItems: isRight ? 'flex-end' : 'flex-start',
          gap: 2,
        }}
      >
        <Text
          style={{
            fontFamily: 'AnyBody-Bold',
            fontSize: 13,
            color: dimmed
              ? isWinning
                ? colors.onSurface
                : `${colors.onSurfaceVariant}80`
              : colors.onSurface,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 28,
            color: scoreColor,
            lineHeight: 32,
          }}
        >
          {score}
        </Text>
      </View>
    </View>
  );
}

/* ── FlagCircle ─────────────────────────────────────────────── */

function FlagCircle({ uri, size }: { uri: string; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: colors.surfaceContainer,
        flexShrink: 0,
      }}
    >
      <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
    </View>
  );
}
