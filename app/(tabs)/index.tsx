import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { HomeScreen } from '../../src/components/home/HomeScreen';
import { mockMatchDayItems, mockNewsItems, mockTournaments } from '../../src/mocks/home';

export default function HomeTab() {
  const [selectedTournamentId, setSelectedTournamentId] = useState('wc2026');
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <AppHeader />
      <HomeScreen
        tournaments={mockTournaments}
        selectedTournamentId={selectedTournamentId}
        onSelectTournament={setSelectedTournamentId}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
        onPressMatch={(id) => router.push(`/match/${id}` as any)}
      />
    </SafeAreaView>
  );
}
