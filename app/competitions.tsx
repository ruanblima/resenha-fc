import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../src/components/AppHeader';
import { CompetitionsScreen } from '../src/components/competitions/CompetitionsScreen';
import { mockCompetitions, mockCountryLeagues } from '../src/mocks/home';
import { colors } from '../src/theme';

export default function CompetitionsPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <AppHeader title="COMPETIÇÕES" showBack onSearchPress={() => {}} />
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
        onSelectCompetition={(id) => router.push({ pathname: '/competition/[id]', params: { id } })}
        onSelectLeague={(id) => router.push({ pathname: '/competition/[id]', params: { id } })}
      />
    </SafeAreaView>
  );
}
