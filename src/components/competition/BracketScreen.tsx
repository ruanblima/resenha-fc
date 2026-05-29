import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import React, { Fragment } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useBracket } from '../../hooks/useBracket';
import { colors } from '../../theme';
import type { BracketRound, MatchSummary } from '../../types/api';

/* ── Layout constants ───────────────────────────────────────── */

const CARD_H = 96;       // fixed card height
const CARD_W = 180;      // card width
const BASE_GAP = 8;      // gap between cards in the densest round
const UNIT = CARD_H + BASE_GAP;  // = 104 — one "slot"
const CONNECTOR_W = 28;  // width of bracket connector column
const HEADER_H = 36;     // height of round label chip + margin

/** Top offset (within content area, below header) for card at index k in a round
 *  that is `roundOffset` steps from the anchor (0 = densest round). */
function cardTop(roundOffset: number, k: number): number {
  const slotH = Math.pow(2, roundOffset) * UNIT;
  return k * slotH + (slotH - UNIT) / 2;
}

/** Total content height for a bracket with anchorCount matches in the first round */
function contentHeight(anchorCount: number): number {
  return anchorCount * UNIT - BASE_GAP;
}

/* ── Props ──────────────────────────────────────────────────── */

interface Props {
  competitionId: string;
}

/* ── Main component ─────────────────────────────────────────── */

export function BracketScreen({ competitionId }: Props) {
  const { data, isLoading, isError, refetch } = useBracket(competitionId);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Text style={{ color: colors.onSurfaceVariant, fontSize: 14 }}>
          Erro ao carregar chaveamento
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            backgroundColor: colors.surfaceHigh,
          }}
        >
          <Text style={{ color: colors.primary, fontFamily: 'Inter_600SemiBold', fontSize: 13 }}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data || data.rounds.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 32 }}>
        <MaterialIcons name="account-tree" size={40} color={colors.onSurfaceVariant} />
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 15,
            color: colors.onSurface,
            textAlign: 'center',
          }}
        >
          Chaveamento indisponível
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
          O chaveamento estará disponível quando a fase mata-mata começar.
        </Text>
      </View>
    );
  }

  const { mainRounds, extraRounds } = splitRounds(data.rounds);

  // Anchor = first round in the main chain (most matches)
  const anchorCount = mainRounds.length > 0 ? mainRounds[0].matches.length : 1;
  const colH = contentHeight(anchorCount);
  const totalColH = HEADER_H + colH;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Horizontal bracket scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 4,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        {mainRounds.map((round, i) => {
          const offset = computeOffset(mainRounds, i);
          const prevRound = i > 0 ? mainRounds[i - 1] : null;
          const showConnector = prevRound !== null && prevRound.matches.length === round.matches.length * 2;

          return (
            <Fragment key={round.name}>
              {showConnector && (
                <BracketConnector
                  leftCount={prevRound!.matches.length}
                  rightCount={round.matches.length}
                  leftOffset={offset - 1}
                  totalH={colH}
                />
              )}
              {/* Spacing without connector (non-halving transition) */}
              {!showConnector && i > 0 && (
                <View style={{ width: CONNECTOR_W }} />
              )}
              <BracketColumn
                round={round}
                roundOffset={offset}
                totalColH={totalColH}
                colH={colH}
              />
            </Fragment>
          );
        })}
      </ScrollView>

      {/* Extra rounds (3rd place, etc.) */}
      {extraRounds.length > 0 && (
        <View style={{ paddingHorizontal: 16, paddingTop: 12, gap: 16 }}>
          {extraRounds.map((round) => (
            <ExtraRoundSection key={round.name} round={round} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

/* ── Round splitting ────────────────────────────────────────── */

/** Separate "Disputa do 3º Lugar" (and similar 1-match tail rounds) from the main bracket chain */
function splitRounds(rounds: BracketRound[]): {
  mainRounds: BracketRound[];
  extraRounds: BracketRound[];
} {
  const EXTRA_ROUND_NAMES = new Set(['Disputa do 3º Lugar']);
  const mainRounds = rounds.filter((r) => !EXTRA_ROUND_NAMES.has(r.name));
  const extraRounds = rounds.filter((r) => EXTRA_ROUND_NAMES.has(r.name));
  return { mainRounds, extraRounds };
}

/** Compute the bracket "offset" (0 = densest/most matches) for a given index in the main chain.
 *  For transitions where count does NOT halve, the offset stays the same. */
function computeOffset(rounds: BracketRound[], index: number): number {
  let offset = 0;
  for (let i = 1; i <= index; i++) {
    if (rounds[i - 1].matches.length === rounds[i].matches.length * 2) {
      offset++;
    }
    // If no halving, offset stays — both rounds use the same base slot size
  }
  return offset;
}

/* ── Bracket Column ─────────────────────────────────────────── */

function BracketColumn({
  round,
  roundOffset,
  totalColH,
  colH,
}: {
  round: BracketRound;
  roundOffset: number;
  totalColH: number;
  colH: number;
}) {
  return (
    <View style={{ width: CARD_W, height: totalColH }}>
      {/* Round label chip */}
      <View
        style={{
          height: HEADER_H,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 6,
        }}
      >
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor: `${colors.primary}18`,
            borderWidth: 1,
            borderColor: `${colors.primary}35`,
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 10,
              letterSpacing: 0.6,
              color: colors.primary,
            }}
            numberOfLines={1}
          >
            {round.name.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Cards at absolute positions */}
      <View style={{ position: 'relative', height: colH }}>
        {round.matches.map((match, k) => (
          <View
            key={match.id}
            style={{
              position: 'absolute',
              top: cardTop(roundOffset, k),
              left: 0,
              right: 0,
            }}
          >
            <BracketMatchCard match={match} />
          </View>
        ))}
      </View>
    </View>
  );
}

/* ── Bracket Connector ──────────────────────────────────────── */

function BracketConnector({
  leftCount,
  rightCount,
  leftOffset,
  totalH,
}: {
  leftCount: number;
  rightCount: number;
  leftOffset: number;
  totalH: number;
}) {
  const LINE = 2;
  const HALF = CONNECTOR_W / 2;
  const lineColor = `${colors.primary}40`;
  const segments: React.ReactElement[] = [];

  for (let k = 0; k < rightCount; k++) {
    const topCenter = cardTop(leftOffset, 2 * k) + CARD_H / 2;
    const botCenter = cardTop(leftOffset, 2 * k + 1) + CARD_H / 2;
    const midY = (topCenter + botCenter) / 2;
    const vertH = botCenter - topCenter;

    segments.push(
      // Top horizontal stub (right edge of left card → midpoint)
      <View
        key={`ht-${k}`}
        style={{
          position: 'absolute',
          top: topCenter - LINE / 2,
          left: 0,
          width: HALF,
          height: LINE,
          backgroundColor: lineColor,
        }}
      />,
      // Bottom horizontal stub
      <View
        key={`hb-${k}`}
        style={{
          position: 'absolute',
          top: botCenter - LINE / 2,
          left: 0,
          width: HALF,
          height: LINE,
          backgroundColor: lineColor,
        }}
      />,
      // Vertical bar connecting top + bottom
      <View
        key={`v-${k}`}
        style={{
          position: 'absolute',
          top: topCenter - LINE / 2,
          left: HALF - LINE / 2,
          width: LINE,
          height: vertH + LINE,
          backgroundColor: lineColor,
        }}
      />,
      // Exit horizontal (midpoint → right edge of connector → left card)
      <View
        key={`he-${k}`}
        style={{
          position: 'absolute',
          top: midY - LINE / 2,
          left: HALF,
          width: HALF,
          height: LINE,
          backgroundColor: lineColor,
        }}
      />,
    );
  }

  return (
    <View
      style={{
        width: CONNECTOR_W,
        height: totalH,
        marginTop: HEADER_H,
        position: 'relative',
      }}
    >
      {segments}
    </View>
  );
}

/* ── Extra Round Section (3rd place etc.) ───────────────────── */

function ExtraRoundSection({ round }: { round: BracketRound }) {
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: `${colors.outlineVariant}30`,
          }}
        />
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor: `${colors.primary}18`,
            borderWidth: 1,
            borderColor: `${colors.primary}35`,
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 10,
              letterSpacing: 0.6,
              color: colors.primary,
            }}
          >
            {round.name.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: `${colors.outlineVariant}30`,
          }}
        />
      </View>
      <View style={{ gap: 8 }}>
        {round.matches.map((match) => (
          <BracketMatchCard key={match.id} match={match} />
        ))}
      </View>
    </View>
  );
}

/* ── Bracket Match Card ─────────────────────────────────────── */

function BracketMatchCard({ match }: { match: MatchSummary }) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;
  const hasPenalties = match.penaltyHomeScore !== undefined && match.penaltyAwayScore !== undefined;

  // Determine winner: penalties take precedence over regulation/AET score
  const homeWins = hasScore && isFinished && (
    hasPenalties
      ? match.penaltyHomeScore! > match.penaltyAwayScore!
      : match.homeScore! > match.awayScore!
  );
  const awayWins = hasScore && isFinished && (
    hasPenalties
      ? match.penaltyAwayScore! > match.penaltyHomeScore!
      : match.awayScore! > match.homeScore!
  );

  return (
    <View
      style={{
        height: CARD_H,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: isLive
          ? `${colors.primary}60`
          : `${colors.outlineVariant}33`,
        overflow: 'hidden',
        justifyContent: 'space-between',
      }}
    >
      {/* Live accent bar */}
      {isLive && (
        <View style={{ height: 2, backgroundColor: colors.primary }} />
      )}

      {/* Date + status row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: isLive ? 4 : 7,
          paddingBottom: 4,
        }}
      >
        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            fontSize: 10,
            color: colors.onSurfaceVariant,
          }}
        >
          {match.date
            ? new Date(match.date + 'T00:00:00').toLocaleDateString('pt-BR', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
              }).toUpperCase()
            : ''}
        </Text>
        <StatusChip match={match} />
      </View>

      {/* Teams — no horizontal padding, handled per-row for the accent bar */}
      <View style={{ flex: 1, justifyContent: 'center', gap: 0 }}>
        <TeamRow
          team={match.homeTeam}
          score={match.homeScore}
          penaltyScore={match.penaltyHomeScore}
          hasScore={hasScore}
          hasPenalties={hasPenalties}
          isWinner={homeWins}
          isLoser={awayWins}
        />
        <View style={{ height: 1, marginHorizontal: 10, backgroundColor: `${colors.outlineVariant}20` }} />
        <TeamRow
          team={match.awayTeam}
          score={match.awayScore}
          penaltyScore={match.penaltyAwayScore}
          hasScore={hasScore}
          hasPenalties={hasPenalties}
          isWinner={awayWins}
          isLoser={homeWins}
        />
      </View>
    </View>
  );
}

/* ── Status Chip ────────────────────────────────────────────── */

function StatusChip({ match }: { match: MatchSummary }) {
  const hasPenalties = match.penaltyHomeScore !== undefined;

  if (match.status === 'live') {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRadius: 5,
          backgroundColor: `${colors.primary}20`,
        }}
      >
        <View
          style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary }}
        />
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 9,
            color: colors.primary,
            letterSpacing: 0.5,
          }}
        >
          {match.minute ? `${match.minute}'` : 'AO VIVO'}
        </Text>
      </View>
    );
  }

  if (match.status === 'finished') {
    return (
      <Text
        style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 9,
          color: colors.onSurfaceVariant,
          letterSpacing: 0.4,
        }}
      >
        {hasPenalties ? 'FT (PEN)' : 'FT'}
      </Text>
    );
  }

  return (
    <Text
      style={{
        fontFamily: 'WorkSans-Regular',
        fontSize: 10,
        color: colors.onSurfaceVariant,
      }}
    >
      {match.date
        ? new Date(match.date + 'T00:00:00').toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          })
        : '—'}
    </Text>
  );
}

/* ── Team Row ───────────────────────────────────────────────── */

function TeamRow({
  team,
  score,
  penaltyScore,
  hasScore,
  hasPenalties,
  isWinner,
  isLoser,
}: {
  team: MatchSummary['homeTeam'];
  score: number | undefined;
  penaltyScore: number | undefined;
  hasScore: boolean;
  hasPenalties: boolean;
  isWinner: boolean;
  isLoser: boolean;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', minHeight: 30 }}>
      {/* Gold accent bar for winner (only when there are penalties) */}
      <View
        style={{
          width: 3,
          borderRadius: 2,
          backgroundColor: hasPenalties && isWinner ? colors.primary : 'transparent',
          marginVertical: 3,
        }}
      />

      {/* Row content */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 8,
          paddingRight: 10,
          paddingVertical: 4,
          gap: 7,
        }}
      >
        <Image
          source={{ uri: team.flagUrl }}
          style={{ width: 20, height: 14, borderRadius: 2 }}
          contentFit="cover"
        />

        <Text
          style={{
            flex: 1,
            fontFamily: isWinner ? 'Inter_600SemiBold' : 'WorkSans-Regular',
            fontSize: 12,
            color: isLoser ? `${colors.onSurfaceVariant}70` : colors.onSurface,
          }}
          numberOfLines={1}
        >
          {team.shortName}
        </Text>

        {/* Scores */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          {/* Penalty score: (n) */}
          {hasPenalties && penaltyScore !== undefined && (
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 11,
                color: isLoser
                  ? `${colors.onSurfaceVariant}55`
                  : colors.onSurfaceVariant,
              }}
            >
              ({penaltyScore})
            </Text>
          )}

          {/* Regulation / AET score */}
          {hasScore ? (
            <Text
              style={{
                fontFamily: 'AnyBody-ExtraBold',
                fontSize: 17,
                lineHeight: 20,
                color: isWinner
                  ? colors.primary
                  : isLoser
                  ? `${colors.onSurfaceVariant}70`
                  : colors.onSurface,
                minWidth: 16,
                textAlign: 'right',
              }}
            >
              {score}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'WorkSans-Regular',
                fontSize: 13,
                color: `${colors.onSurfaceVariant}50`,
                minWidth: 16,
                textAlign: 'right',
              }}
            >
              —
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
