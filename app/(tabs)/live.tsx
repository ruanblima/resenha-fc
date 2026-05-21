import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { LiveGamesScreen } from '../../src/components/live/LiveGamesScreen';
import { mockLiveMatches } from '../../src/mocks/matches';
import type { LiveMatch } from '../../src/types/match';

export default function LiveTab() {
  const router = useRouter();

  function handleMatchPress(match: LiveMatch) {
    router.push(`/match/${match.id}` as any);
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppHeader />
      <LiveGamesScreen matches={mockLiveMatches} onMatchPress={handleMatchPress} />
    </SafeAreaView>
  );
}
