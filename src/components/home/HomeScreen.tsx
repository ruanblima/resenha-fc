import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchSummary, NewsArticle } from '../../types/api';
import type { StandingGroup } from '../../types/standings';
import { sortGroupsByUserCountry } from '../../utils/locale';
import { BannerAd } from '../ads/BannerAd';
import { GroupsCarousel } from './GroupsCarousel';
import { LiveActionCard } from './LiveActionCard';
import { NewsCard } from './NewsCard';
import { NoLiveMatches } from './NoLiveMatches';
import { NoMatchesToday } from './NoMatchesToday';
import { TodayMatchRow } from './TodayMatchRow';

interface Props {
  live: MatchSummary[];
  upcoming: MatchSummary[];
  groups?: StandingGroup[];
  newsItems: NewsArticle[];
  isLoading?: boolean;
  onPressMatch?: (id: number) => void;
  onPressHub?: () => void;
  onSaveMatch?: (matchId: number, saved: boolean) => void;
}

export function HomeScreen({
  live,
  upcoming,
  groups,
  newsItems,
  isLoading,
  onPressMatch,
  onPressHub,
  onSaveMatch,
}: Props) {
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
    >
      {/* ── SEM JOGOS HOJE ───────────────────────────────── */}
      {live.length === 0 && upcoming.length === 0 && (
        <NoMatchesToday onPressCalendar={onPressHub} />
      )}

      {/* ── SEM LIVE, MAS TEM JOGOS HOJE ─────────────────── */}
      {live.length === 0 && upcoming.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <SectionHeader title="AO VIVO AGORA" />
          <NoLiveMatches nextMatch={upcoming[0]} />
        </View>
      )}

      {/* ── AO VIVO AGORA ────────────────────────────────── */}
      {live.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <SectionHeader title="AO VIVO AGORA" />
          <LiveActionCard matches={live} onPressMatch={onPressMatch} />
        </View>
      )}

      {/* ── JOGOS DE HOJE ────────────────────────────────── */}
      {upcoming.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <SectionHeader title="JOGOS DE HOJE" />
          <View style={{ paddingHorizontal: 16, gap: 8 }}>
            {upcoming.map((match) => (
              <TodayMatchRow
                key={match.id}
                match={match}
                onPress={onPressMatch ? () => onPressMatch(match.id) : undefined}
                onSave={onSaveMatch}
              />
            ))}
          </View>
        </View>
      )}

      {/* ── BANNER AD ────────────────────────────────────── */}
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <BannerAd />
      </View>

      {/* ── EXPLORAR O HUB ───────────────────────────────── */}
      <ExploreHubCard onPress={onPressHub} />

      {/* ── BANNER AD ────────────────────────────────────── */}
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <BannerAd />
      </View>

      {/* ── GRUPOS ───────────────────────────────────────── */}
      {groups && groups.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <SectionHeader title="GRUPOS" />
          <GroupsCarousel
            groups={sortGroupsByUserCountry(groups)}
            onPressGroup={onPressHub}
          />
        </View>
      )}

      {/* ── BANNER AD ────────────────────────────────────── */}
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <BannerAd />
      </View>

      {/* ── NOTÍCIAS ─────────────────────────────────────── */}
      {newsItems.length > 0 && (
        <View style={{ marginTop: 8 }}>
          <SectionHeader title="NOTÍCIAS" />
          {newsItems.map((news, index) => (
            <NewsCard
              key={news.id}
              news={news}
              variant={index === 0 ? 'hero' : 'compact'}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function SectionHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
        gap: 10,
      }}
    >
      <View
        style={{ width: 3, height: 18, borderRadius: 2, backgroundColor: colors.primary }}
      />
      <Text
        style={{
          fontFamily: 'AnyBody-Bold',
          fontSize: 13,
          color: colors.onSurface,
          letterSpacing: 1.2,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

function ExploreHubCard({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginHorizontal: 16,
        marginVertical: 20,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: `${colors.primary}30`,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* Trophy icon */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: `${colors.primary}18`,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: `${colors.primary}30`,
        }}
      >
        <MaterialIcons name="emoji-events" size={26} color={colors.primary} />
      </View>

      {/* Text */}
      <View style={{ flex: 1, gap: 3 }}>
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 15,
            color: colors.onSurface,
            lineHeight: 20,
          }}
        >
          Copa do Mundo 2026
        </Text>
        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            fontSize: 12,
            color: colors.onSurfaceVariant,
          }}
        >
          Tabela, estatísticas e chaveamento
        </Text>
      </View>

      {/* Arrow */}
      <MaterialIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
    </Pressable>
  );
}
