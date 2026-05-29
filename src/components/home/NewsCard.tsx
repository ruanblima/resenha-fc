import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';
import React from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { NewsArticle } from '../../types/api';

interface Props {
  news: NewsArticle;
  variant?: 'hero' | 'compact';
  onPress?: () => void;
}

export function NewsCard({ news, variant = 'hero', onPress }: Props) {
  const handlePress = onPress ?? (() => Linking.openURL(news.url));

  if (variant === 'compact') {
    return <CompactNewsCard news={news} onPress={handlePress} />;
  }
  return <HeroNewsCard news={news} onPress={handlePress} />;
}

/* ── Hero card ──────────────────────────────────────────── */
function HeroNewsCard({ news, onPress }: { news: NewsArticle; onPress: () => void }) {
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
      <ImageBackground
        source={news.imageUrl ? { uri: news.imageUrl } : undefined}
        style={{ flex: 1, backgroundColor: colors.surfaceContainer }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', `${colors.surfaceContainerLowest}E6`, colors.surfaceContainerLowest]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1, justifyContent: 'flex-end', padding: 16 }}
        >
          {/* Source badge */}
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
                numberOfLines={1}
              >
                {news.source.toUpperCase()}
              </Text>
            </View>

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
                {news.publishedAgo}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: 'Anybody_700Bold',
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
function CompactNewsCard({ news, onPress }: { news: NewsArticle; onPress: () => void }) {
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
        {news.imageUrl ? (
          <Image
            source={{ uri: news.imageUrl }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="article" size={24} color={colors.onSurfaceVariant} />
          </View>
        )}
      </View>

      {/* Text */}
      <View style={{ flex: 1, gap: 6 }}>
        {/* Source + time */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 9,
              color: colors.primary,
              letterSpacing: 1.2,
            }}
            numberOfLines={1}
          >
            {news.source.toUpperCase()}
          </Text>

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
              {news.publishedAgo}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: 'Anybody_700Bold',
            fontSize: 13,
            color: colors.onSurface,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {news.title}
        </Text>

        {/* Excerpt */}
        {!!news.excerpt && (
          <Text
            style={{
              fontFamily: 'WorkSans-Regular',
              fontSize: 11,
              color: colors.onSurfaceVariant,
            }}
            numberOfLines={1}
          >
            {news.excerpt}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
