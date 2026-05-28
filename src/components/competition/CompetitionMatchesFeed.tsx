import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useMatchesByCompetition } from '../../hooks/useMatchesByCompetition';
import { colors } from '../../theme';
import type { MatchSummary } from '../../types/api';
import { CalendarModal } from './CalendarModal';
import { CompetitionMatchCard } from './CompetitionMatchCard';

interface Props {
  competitionId: string;
}

/* ── Date helpers ───────────────────────────────────────────── */

const DAY_ABBREVS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

function getDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface DateItem {
  iso: string;
  abbrev: string;
  num: number;
  isToday: boolean;
}

function getTodayISO(): string {
  return getDateISO(new Date());
}

/** Builds 7 days centered on the given ISO date (3 before + center + 3 after) */
function buildDaysAround(centerISO: string): DateItem[] {
  const todayISO = getTodayISO();
  const center = new Date(centerISO + 'T00:00:00');
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(center);
    d.setDate(d.getDate() + i - 3);
    const iso = getDateISO(d);
    return {
      iso,
      abbrev: DAY_ABBREVS[d.getDay()],
      num: d.getDate(),
      isToday: iso === todayISO,
    };
  });
}

/* ── Main Component ─────────────────────────────────────────── */

export function CompetitionMatchesFeed({ competitionId }: Props) {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(() => getTodayISO());
  const [selectedRound, setSelectedRound] = useState('Todos');
  const [calendarOpen, setCalendarOpen] = useState(false);

  // 7 days always centered on the selected date
  const days = useMemo(() => buildDaysAround(selectedDate), [selectedDate]);

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
  } = useMatchesByCompetition(competitionId);

  // Auto-fetch all pages so client-side date filtering works across the full dataset
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allMatches = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data]);

  // Filter by selected date client-side (avoids API-Football date range issues)
  const matchesForDate = useMemo(
    () => allMatches.filter((m) => m.date === selectedDate),
    [allMatches, selectedDate],
  );

  const rounds = useMemo(() => {
    const unique = Array.from(new Set(matchesForDate.map((m) => m.stage)));
    return ['Todos', ...unique];
  }, [matchesForDate]);

  // Reset round filter when date changes
  useEffect(() => {
    setSelectedRound('Todos');
  }, [selectedDate]);

  const filtered =
    selectedRound === 'Todos'
      ? matchesForDate
      : matchesForDate.filter((m) => m.stage === selectedRound);

  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Text style={{ color: colors.onSurfaceVariant, fontSize: 14 }}>
          Erro ao carregar partidas
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

  return (
    <FlatList<MatchSummary>
      data={filtered}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <CompetitionMatchCard
            match={item}
            onPress={() => router.push({ pathname: '/match/[id]', params: { id: item.id } })}
          />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 32 }}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.3}
      refreshing={!!data && isFetching && !isFetchingNextPage}
      onRefresh={() => refetch()}
      ListHeaderComponent={
        <>
          <CalendarModal
            visible={calendarOpen}
            selectedDate={selectedDate}
            onSelect={(iso) => { setSelectedDate(iso); }}
            onClose={() => setCalendarOpen(false)}
          />
          <DateSelector
            days={days}
            selected={selectedDate}
            onSelect={setSelectedDate}
            onOpenCalendar={() => setCalendarOpen(true)}
          />
          {rounds.length > 1 && (
            <RoundFilter rounds={rounds} selected={selectedRound} onSelect={setSelectedRound} />
          )}
        </>
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ paddingVertical: 16, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : null
      }
      ListEmptyComponent={
        !data && isFetching ? (
          <View style={{ paddingTop: 48, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <NoMatchesForDate />
        )
      }
    />
  );
}

/* ── DateSelector ───────────────────────────────────────────── */

function DateSelector({
  days,
  selected,
  onSelect,
  onOpenCalendar,
}: {
  days: DateItem[];
  selected: string;
  onSelect: (iso: string) => void;
  onOpenCalendar: () => void;
}) {
  return (
    <View
      style={{
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: `${colors.outlineVariant}30`,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 8,
          gap: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        style={{ flex: 1 }}
      >
        {days.map((day) => {
          const isActive = day.iso === selected;
          return (
            <Pressable
              key={day.iso}
              onPress={() => onSelect(day.iso)}
              style={{
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                minWidth: 48,
                backgroundColor: isActive ? colors.primary : `${colors.outlineVariant}18`,
                borderWidth: 1,
                borderColor: isActive
                  ? colors.primary
                  : day.isToday
                  ? `${colors.primary}50`
                  : `${colors.outlineVariant}40`,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 9,
                  letterSpacing: 0.8,
                  color: isActive
                    ? colors.onPrimary
                    : day.isToday
                    ? colors.primary
                    : colors.onSurfaceVariant,
                  marginBottom: 2,
                }}
              >
                {day.abbrev}
              </Text>
              <Text
                style={{
                  fontFamily: 'AnyBody-ExtraBold',
                  fontSize: 16,
                  lineHeight: 20,
                  color: isActive
                    ? colors.onPrimary
                    : day.isToday
                    ? colors.primary
                    : colors.onSurface,
                }}
              >
                {day.num}
              </Text>
              {day.isToday && !isActive && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                    marginTop: 2,
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Calendar button */}
      <Pressable
        onPress={onOpenCalendar}
        style={{
          width: 40,
          height: 40,
          marginRight: 12,
          borderRadius: 10,
          backgroundColor: `${colors.outlineVariant}18`,
          borderWidth: 1,
          borderColor: `${colors.outlineVariant}40`,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <MaterialIcons name="calendar-month" size={18} color={colors.onSurfaceVariant} />
      </Pressable>
    </View>
  );
}

/* ── RoundFilter ────────────────────────────────────────────── */

function RoundFilter({
  rounds,
  selected,
  onSelect,
}: {
  rounds: string[];
  selected: string;
  onSelect: (round: string) => void;
}) {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {rounds.map((round) => {
          const isActive = round === selected;
          return (
            <TouchableOpacity
              key={round}
              onPress={() => onSelect(round)}
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
                }}
              >
                {round}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ── NoMatchesForDate ───────────────────────────────────────── */

function NoMatchesForDate() {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 32,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}30`,
        paddingHorizontal: 24,
        paddingVertical: 36,
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Icons row */}
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          marginBottom: 8,
        }}
      >
        <IconBubble name="calendar-today" />
        <IconBubble name="stadium" primary />
        <IconBubble name="event-busy" />
      </View>

      <Text
        style={{
          fontFamily: 'AnyBody-ExtraBold',
          fontSize: 17,
          color: colors.onSurface,
          textAlign: 'center',
          lineHeight: 24,
          marginTop: 4,
        }}
      >
        Nenhuma partida agendada
      </Text>

      <Text
        style={{
          fontFamily: 'WorkSans-Regular',
          fontSize: 13,
          color: colors.onSurfaceVariant,
          textAlign: 'center',
          lineHeight: 20,
          maxWidth: 280,
        }}
      >
        Não há jogos para a data e competição selecionadas. Tente outra data no calendário.
      </Text>
    </View>
  );
}

function IconBubble({
  name,
  primary = false,
}: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  primary?: boolean;
}) {
  return (
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: primary ? `${colors.primary}18` : `${colors.outlineVariant}20`,
        borderWidth: 1,
        borderColor: primary ? `${colors.primary}35` : `${colors.outlineVariant}40`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialIcons
        name={name}
        size={26}
        color={primary ? colors.primary : colors.onSurfaceVariant}
      />
    </View>
  );
}
