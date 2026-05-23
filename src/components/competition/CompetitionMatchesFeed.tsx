import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useMatchesByCompetition } from '../../hooks/useMatchesByCompetition';
import { colors } from '../../theme';
import type { MatchSummary } from '../../types/api';
import { CompetitionMatchCard } from './CompetitionMatchCard';

interface Props {
  competitionId: string;
}

export function CompetitionMatchesFeed({ competitionId }: Props) {
  const router = useRouter();
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
    error,
  } = useMatchesByCompetition(competitionId);

  console.log('Matches error:', error);

  const allMatches = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const rounds = useMemo(() => {
    const unique = Array.from(new Set(allMatches.map((m) => m.stage)));
    return ['Todos', ...unique];
  }, [allMatches]);

  const [selectedRound, setSelectedRound] = useState('Todos');

  const filtered =
    selectedRound === 'Todos' ? allMatches : allMatches.filter((m) => m.stage === selectedRound);

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
      refreshing={isFetching && !isFetchingNextPage}
      onRefresh={() => refetch()}
      ListHeaderComponent={
        <RoundFilter rounds={rounds} selected={selectedRound} onSelect={setSelectedRound} />
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ paddingVertical: 16, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : null
      }
      ListEmptyComponent={
        isFetching ? (
          <View style={{ paddingTop: 48, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={{ paddingTop: 48, alignItems: 'center' }}>
            <Text style={{ color: colors.onSurfaceVariant, fontSize: 14 }}>
              Nenhuma partida encontrada
            </Text>
          </View>
        )
      }
    />
  );
}

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
