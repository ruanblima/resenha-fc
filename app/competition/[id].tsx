import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BannerAd } from '../../src/components/ads/BannerAd';
import { BracketScreen } from '../../src/components/competition/BracketScreen';
import { CompetitionLeagueTable } from '../../src/components/competition/CompetitionLeagueTable';
import { CompetitionMatchesFeed } from '../../src/components/competition/CompetitionMatchesFeed';
import { CompetitionStandingsTable } from '../../src/components/competition/CompetitionStandingsTable';
import { CompetitionStatsScreen } from '../../src/components/competition/CompetitionStatsScreen';
import { BRACKET_COMPETITIONS, KNOCKOUT_ONLY_COMPETITIONS } from '../../src/constants/competitions';
import { useCompetitionStandings } from '../../src/hooks/useCompetitionStandings';
import { mockCompetitions, mockCountryLeagues } from '../../src/mocks/home';
import { colors } from '../../src/theme';
import type { MaterialIconName } from '../../src/types/home';

type HubTab = 'tabela' | 'jogos' | 'chaveamento' | 'estatisticas';

interface TabDef {
  id: HubTab;
  label: string;
  /** Só aparece em competições com mata-mata */
  bracketOnly?: boolean;
  /** Oculta em competições sem fase de grupos/tabela */
  hideForKnockoutOnly?: boolean;
}

const ALL_TABS: TabDef[] = [
  { id: 'tabela',      label: 'TABELA',      hideForKnockoutOnly: true },
  { id: 'jogos',       label: 'JOGOS' },
  { id: 'chaveamento', label: 'MATA MATA',   bracketOnly: true },
  { id: 'estatisticas', label: 'ESTATÍSTICAS' },
];

function findCompetition(id: string) {
  const featured = mockCompetitions.find((c) => c.id === id);
  if (featured) return featured;

  for (const country of mockCountryLeagues) {
    const league = country.leagues.find((l) => l.id === id);
    if (league) {
      return {
        id: league.id,
        name: league.name,
        category: country.name,
        icon: league.icon,
        location: country.name,
      };
    }
  }
  return null;
}

export default function CompetitionPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<HubTab>(() =>
    KNOCKOUT_ONLY_COMPETITIONS.has(Array.isArray(id) ? id[0] : (id ?? '')) ? 'chaveamento' : 'tabela'
  );

  const competitionId = Array.isArray(id) ? id[0] : id;
  const competition = findCompetition(competitionId);
  const { data: standingsData } = useCompetitionStandings(competitionId);
  const hasBracket = BRACKET_COMPETITIONS.has(competitionId);
  const isKnockoutOnly = KNOCKOUT_ONLY_COMPETITIONS.has(competitionId);

  const tabs = ALL_TABS.filter((t) => {
    if (t.bracketOnly && !hasBracket) return false;
    if (t.hideForKnockoutOnly && isKnockoutOnly) return false;
    return true;
  });


  if (!competition) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.onSurfaceVariant }}>Competição não encontrada</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <View
        style={{
          backgroundColor: colors.surfaceHigh,
          borderBottomWidth: 1,
          borderBottomColor: `${colors.outlineVariant}33`,
        }}
      >
        {/* App bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, gap: 8 }}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
            <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'AnyBody-Bold', fontSize: 15, color: colors.onSurface, letterSpacing: 0.2 }}>
            {competition.name}
          </Text>
        </View>

        {/* Hero */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16, gap: 14 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: `${colors.primary}1A`,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: `${colors.primary}33`,
            }}
          >
            <MaterialIcons name={competition.icon as MaterialIconName} size={30} color={colors.primary} />
          </View>

          <View style={{ flex: 1, gap: 3 }}>
            <Text style={{ fontFamily: 'AnyBody-ExtraBold', fontSize: 20, color: colors.onSurface, lineHeight: 24 }} numberOfLines={2}>
              {competition.name}
            </Text>
            {competition.location && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="location-on" size={12} color={colors.onSurfaceVariant} />
                <Text style={{ fontFamily: 'WorkSans-Regular', fontSize: 12, color: colors.onSurfaceVariant }}>
                  {competition.location}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Tabs */}
        <View style={{ flexDirection: 'row' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: isActive ? colors.primary : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 10,
                    letterSpacing: 0.8,
                    color: isActive ? colors.primary : colors.onSurfaceVariant,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Banner abaixo das abas */}
      <View style={{ alignItems: 'center', paddingVertical: 8, backgroundColor: colors.background }}>
        <BannerAd />
      </View>

      {/* Content */}
      {activeTab === 'tabela' && (
        standingsData?.type === 'league'
          ? <CompetitionLeagueTable competitionId={competitionId} />
          : <CompetitionStandingsTable competitionId={competitionId} />
      )}

      {activeTab === 'jogos' && (
        <CompetitionMatchesFeed competitionId={competitionId} />
      )}

      {activeTab === 'chaveamento' && (
        <BracketScreen competitionId={competitionId} />
      )}

      {activeTab === 'estatisticas' && (
        <CompetitionStatsScreen competitionId={competitionId} />
      )}
    </SafeAreaView>
  );
}
