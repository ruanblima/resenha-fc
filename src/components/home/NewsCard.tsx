import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { NewsItem } from '../../types/home';

interface Props {
  news: NewsItem;
  onPress?: () => void;
}

export function NewsCard({ news, onPress }: Props) {
  return (
    <Pressable
      testID="news-card"
      onPress={onPress}
      className="mx-4 mb-3 rounded-xl overflow-hidden border border-outline-variant"
      style={{ height: 450 }}
    >
      <ImageBackground
        source={{ uri: news.imageUrl }}
        className="flex-1"
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            colors.surfaceContainerLowest,
            `${colors.surfaceContainerLowest}CC`,
            'transparent',
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="flex-1 justify-end p-6"
        >
          <View className="flex-row items-center gap-x-3 mb-4">
            <View
              className="px-3 py-1 rounded border"
              style={{ backgroundColor: `${colors.primary}1A`, borderColor: `${colors.primary}33` }}
            >
              <Text className="font-inter-semibold text-xs tracking-widest text-primary uppercase">
                {news.category}
              </Text>
            </View>
            <Text className="font-inter-semibold text-xs tracking-widest text-on-surface-variant">
              {news.publishedAt}
            </Text>
          </View>

          <Text className="font-anybody-bold text-2xl text-on-surface mb-4 leading-8">
            {news.title}
          </Text>

          <Text className="font-work-sans text-base text-on-surface-variant leading-6" numberOfLines={3}>
            {news.excerpt}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}
