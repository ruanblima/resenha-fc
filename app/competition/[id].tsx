import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { CompetitionMatchesScreen } from '../../src/components/competition/CompetitionMatchesScreen';
import { getMatchesByCompetition } from '../../src/mocks/competitionMatches';
import { mockCompetitions } from '../../src/mocks/home';
import { colors } from '../../src/theme';

export default function CompetitionPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const competitionId = Array.isArray(id) ? id[0] : id;
  const competition = mockCompetitions.find((c) => c.id === competitionId);

  if (!competition) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: colors.onSurfaceVariant }}>Competição não encontrada</Text>
      </View>
    );
  }

  const matches = getMatchesByCompetition(competitionId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <AppHeader title={competition.name.toUpperCase()} showBack />
      <CompetitionMatchesScreen
        competition={competition}
        matches={matches}
        onPressMatch={(matchId) => router.push({ pathname: '/match/[id]', params: { id: matchId } })}
      />
    </SafeAreaView>
  );
}
