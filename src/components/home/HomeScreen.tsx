import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

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
  onSeeAllMatches?: () => void;
}

export function HomeScreen({
  tournaments,
  selectedTournamentId,
  onSelectTournament,
  matchDayItems,
  newsItems,
  onPressMatch,
  onPressNews,
  onSeeAllMatches,
}: Props) {
  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <TournamentSelector
        tournaments={tournaments}
        selectedId={selectedTournamentId}
        onSelect={onSelectTournament}
      />

      {/* Matches of the Day */}
      <View className="px-4 flex-row justify-between items-end mb-6">
        <Text className="font-anybody-bold text-xl text-on-surface tracking-widest">
          JOGOS DO DIA
        </Text>
        <Pressable onPress={onSeeAllMatches}>
          <Text className="font-inter-semibold text-xs tracking-widest text-primary uppercase">
            VER TODOS
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16, paddingBottom: 16 }}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        {matchDayItems.map((match) => (
          <MatchDayCard
            key={match.id}
            match={match}
            onPress={onPressMatch ? () => onPressMatch(match.id) : undefined}
          />
        ))}
      </ScrollView>

      {/* Latest Headlines */}
      <View className="px-4 mt-6 mb-6">
        <Text className="font-anybody-bold text-xl text-on-surface tracking-widest">
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
