import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompetitionLeagueTable } from '../../src/components/competition/CompetitionLeagueTable';
import { CompetitionMatchesFeed } from '../../src/components/competition/CompetitionMatchesFeed';
import { CompetitionStandingsTable } from '../../src/components/competition/CompetitionStandingsTable';
import { CompetitionStatsScreen } from '../../src/components/competition/CompetitionStatsScreen';
import { useCompetitionStandings } from '../../src/hooks/useCompetitionStandings';
import { mockCompetitions, mockCountryLeagues } from '../../src/mocks/home';
import { colors } from '../../src/theme';
import type { MaterialIconName } from '../../src/types/home';

type HubTab = 'tabela' | 'jogos' | 'chaveamento' | 'estatisticas';

const ALL_TABS: { id: HubTab; label: string; groupsOnly?: boolean }[] = [
  { id: 'tabela', label: 'TABELA' },
  { id: 'jogos', label: 'JOGOS' },
  { id: 'chaveamento', label: 'CHAVEAMENTO', groupsOnly: true },
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
  const [activeTab, setActiveTab] = useState<HubTab>('tabela');

  const competitionId = Array.isArray(id) ? id[0] : id;
  const competition = findCompetition(competitionId);
  const { data: standingsData } = useCompetitionStandings(competitionId);
  const isLeague = standingsData?.type === 'league';
  const tabs = ALL_TABS.filter((t) => !t.groupsOnly || !isLeague);

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

      {/* Content */}
      {activeTab === 'tabela' && (
        isLeague
          ? <CompetitionLeagueTable competitionId={competitionId} />
          : <CompetitionStandingsTable competitionId={competitionId} />
      )}

      {activeTab === 'jogos' && (
        <CompetitionMatchesFeed competitionId={competitionId} />
      )}

      {activeTab === 'chaveamento' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <MaterialIcons name="construction" size={40} color={colors.onSurfaceVariant} />
          <Text style={{ fontFamily: 'WorkSans-Regular', fontSize: 14, color: colors.onSurfaceVariant }}>
            Em breve
          </Text>
        </View>
      )}

      {activeTab === 'estatisticas' && (
        <CompetitionStatsScreen competitionId={competitionId} />
      )}
    </SafeAreaView>
  );
}
