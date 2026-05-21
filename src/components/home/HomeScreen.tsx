import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import type { MatchDayItem, NewsItem, Tournament } from '../../types/home';
import { MatchDayCard } from './MatchDayCard';
import { NewsCard } from './NewsCard';
import { TournamentSelector } from './TournamentSelector';

interface Props {
  tournaments: Tournament[];
  selectedTournamentId: string;
  onSelectTournament: (id: string) => void;
  matchDayItems: MatchDayItem[];
  newsItems: NewsItem[];
  onPressMatch?: (id: number) => void;
  onPressNews?: (id: string) => void;
}

export function HomeScreen({
  tournaments,
  selectedTournamentId,
  onSelectTournament,
  matchDayItems,
  newsItems,
  onPressMatch,
  onPressNews,
}: Props) {
  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <TournamentSelector
        tournaments={tournaments}
        selectedId={selectedTournamentId}
        onSelect={onSelectTournament}
      />

      <View className="px-4 mb-3">
        <Text className="font-anybody text-xs font-bold text-on-surface-variant tracking-widest">
          JOGOS DO DIA
        </Text>
      </View>

      {matchDayItems.map((match) => (
        <MatchDayCard
          key={match.id}
          match={match}
          onPress={onPressMatch ? () => onPressMatch(match.id) : undefined}
        />
      ))}

      <View className="px-4 mt-2 mb-3">
        <Text className="font-anybody text-xs font-bold text-on-surface-variant tracking-widest">
          ÚLTIMAS NOTÍCIAS
        </Text>
      </View>

      {newsItems.map((news) => (
        <NewsCard
          key={news.id}
          news={news}
          onPress={onPressNews ? () => onPressNews(news.id) : undefined}
        />
      ))}

      <View className="h-6" />
    </ScrollView>
  );
}
