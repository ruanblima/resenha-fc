import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { Competition, MatchDayItem, NewsItem } from '../../types/home';
import { CompetitionCarousel } from './CompetitionCarousel';
import { MatchDayCard } from './MatchDayCard';
import { NewsCard } from './NewsCard';

interface Props {
  competitions: Competition[];
  matchDayItems: MatchDayItem[];
  newsItems: NewsItem[];
  liveCount?: number;
  onSelectCompetition?: (id: string) => void;
  onPressMatch?: (id: number) => void;
  onPressNews?: (id: string) => void;
  onSeeAllMatches?: () => void;
}

export function HomeScreen({
  competitions,
  matchDayItems,
  newsItems,
  liveCount,
  onSelectCompetition,
  onPressMatch,
  onPressNews,
  onSeeAllMatches,
}: Props) {
  const liveMatches = liveCount ?? matchDayItems.filter((m) => m.status === 'live').length;

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Competition Carousel */}
      <View className="pt-4">
        <CompetitionCarousel competitions={competitions} onSelect={onSelectCompetition} />
      </View>

      {/* Matches of the Day header */}
      <View className="flex-row items-center px-4 mb-4">
        <View
          style={{
            width: 4,
            height: 22,
            borderRadius: 2,
            backgroundColor: colors.primary,
            marginRight: 10,
          }}
        />
        <Text className="font-anybody-bold text-xl text-on-surface uppercase tracking-tight flex-1">
          JOGOS DO DIA
        </Text>
        {liveMatches > 0 && (
          <View
            className="flex-row items-center gap-x-1 px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${colors.secondary}1A`,
              borderWidth: 1,
              borderColor: `${colors.secondary}33`,
            }}
          >
            <View className="w-2 h-2 rounded-full bg-secondary" />
            <Text className="font-inter-semibold text-secondary" style={{ fontSize: 10 }}>
              {liveMatches} AO VIVO
            </Text>
          </View>
        )}
        <Pressable onPress={onSeeAllMatches} className="ml-3">
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

      {/* Latest Headlines header */}
      <View className="flex-row items-center px-4 mt-4 mb-4">
        <View
          style={{
            width: 4,
            height: 22,
            borderRadius: 2,
            backgroundColor: colors.primary,
            marginRight: 10,
          }}
        />
        <Text className="font-anybody-bold text-xl text-on-surface uppercase tracking-tight">
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
