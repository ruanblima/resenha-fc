import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { NewsItem } from '../../types/home';

interface Props {
  news: NewsItem;
  variant?: 'hero' | 'compact';
  onPress?: () => void;
}

export function NewsCard({ news, variant = 'hero', onPress }: Props) {
  if (variant === 'compact') {
    return <CompactNewsCard news={news} onPress={onPress} />;
  }
  return <HeroNewsCard news={news} onPress={onPress} />;
}

/* ── Hero card ──────────────────────────────────────────── */
function HeroNewsCard({ news, onPress }: { news: NewsItem; onPress?: () => void }) {
  return (
    <Pressable
      testID="news-card"
      onPress={onPress}
      style={{
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
        height: 220,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}40`,
      }}
    >
      <ImageBackground source={{ uri: news.imageUrl }} style={{ flex: 1 }} resizeMode="cover">
        <LinearGradient
          colors={['transparent', `${colors.surfaceContainerLowest}E6`, colors.surfaceContainerLowest]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1, justifyContent: 'flex-end', padding: 16 }}
        >
          {/* Category + read time */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                backgroundColor: `${colors.primary}22`,
                borderWidth: 1,
                borderColor: `${colors.primary}44`,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 9,
                  color: colors.primary,
                  letterSpacing: 1.2,
                }}
              >
                {news.category}
              </Text>
            </View>

            {news.readTime && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="schedule" size={11} color={colors.onSurfaceVariant} />
                <Text
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 10,
                    color: colors.onSurfaceVariant,
                    letterSpacing: 0.5,
                  }}
                >
                  {news.readTime} DE LEITURA
                </Text>
              </View>
            )}
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: 'AnyBody-Bold',
              fontSize: 16,
              color: colors.onSurface,
              lineHeight: 22,
            }}
            numberOfLines={2}
          >
            {news.title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

/* ── Compact card ───────────────────────────────────────── */
function CompactNewsCard({ news, onPress }: { news: NewsItem; onPress?: () => void }) {
  return (
    <Pressable
      testID="news-card"
      onPress={onPress}
      style={{
        marginHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: colors.surfaceContainer,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}33`,
        padding: 10,
      }}
    >
      {/* Thumbnail */}
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: colors.surfaceHigh,
          flexShrink: 0,
        }}
      >
        <Image
          source={{ uri: news.imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      {/* Text */}
      <View style={{ flex: 1, gap: 6 }}>
        {/* Category + read time */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 9,
              color: colors.primary,
              letterSpacing: 1.2,
            }}
          >
            {news.category}
          </Text>

          {news.readTime && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <MaterialIcons name="schedule" size={10} color={`${colors.onSurfaceVariant}99`} />
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 9,
                  color: `${colors.onSurfaceVariant}99`,
                  letterSpacing: 0.4,
                }}
              >
                {news.readTime}
              </Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: 'AnyBody-Bold',
            fontSize: 13,
            color: colors.onSurface,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {news.title}
        </Text>

        {/* Published */}
        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            fontSize: 11,
            color: colors.onSurfaceVariant,
          }}
        >
          {news.publishedAt}
        </Text>
      </View>
    </Pressable>
  );
}
