import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { LiveGamesScreen } from '../../src/components/live/LiveGamesScreen';
import { SideMenu } from '../../src/components/SideMenu';
import { mockCompetitions } from '../../src/mocks/home';
import { mockLiveMatches } from '../../src/mocks/matches';
import type { LiveMatch } from '../../src/types/match';

export default function LiveTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCompetitionId, setActiveCompetitionId] = useState('wc2026');

  function handleMatchPress(match: LiveMatch) {
    router.push({ pathname: '/match/[id]', params: { id: match.id } });
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppHeader onMenuPress={() => setMenuOpen(true)} />
      <LiveGamesScreen matches={mockLiveMatches} onMatchPress={handleMatchPress} />
      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        competitions={mockCompetitions}
        activeCompetitionId={activeCompetitionId}
        onSelectCompetition={(id) => setActiveCompetitionId(id)}
      />
    </SafeAreaView>
  );
}
