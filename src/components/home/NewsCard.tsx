import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import type { NewsItem } from '../../types/home';

interface Props {
  news: NewsItem;
  onPress?: () => void;
}

export function NewsCard({ news, onPress }: Props) {
  return (
    <Pressable testID="news-card" onPress={onPress} className="mx-4 mb-3 rounded-xl overflow-hidden">
      <ImageBackground
        source={{ uri: news.imageUrl }}
        className="w-full"
        style={{ minHeight: 180 }}
      >
        <View className="flex-1 justify-end p-4 bg-black/60">
          <View className="flex-row items-center gap-x-2 mb-2">
            <View className="bg-primary px-2 py-0.5 rounded">
              <Text className="font-work-sans text-xs font-bold text-on-primary">
                {news.category}
              </Text>
            </View>
            <Text className="font-work-sans text-xs text-on-surface-variant">{news.publishedAt}</Text>
          </View>
          <Text className="font-anybody text-base font-bold text-on-surface mb-1">
            {news.title}
          </Text>
          <Text className="font-work-sans text-xs text-on-surface-variant" numberOfLines={2}>
            {news.excerpt}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
