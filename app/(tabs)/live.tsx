import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { CompetitionMatchesScreen } from '../../src/components/live/CompetitionMatchesScreen';
import { SideMenu } from '../../src/components/SideMenu';
import { useMatchesByCompetition } from '../../src/hooks/useMatchesByCompetition';

const COMPETITION_ID = 'wc2026';

export default function LiveTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage } = useMatchesByCompetition(COMPETITION_ID);

  const matches = data?.pages.flatMap((page) => page.data) ?? [];

  function handleLoadMore() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppHeader onMenuPress={() => setMenuOpen(true)} />
      <CompetitionMatchesScreen
        matches={matches}
        isLoading={isLoading}
        onPressMatch={(id) => router.push({ pathname: '/match/[id]', params: { id } })}
        onLoadMore={handleLoadMore}
      />
      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </SafeAreaView>
  );
}
