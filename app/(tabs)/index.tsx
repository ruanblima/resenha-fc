import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { HomeScreen } from '../../src/components/home/HomeScreen';
import { SideMenu } from '../../src/components/SideMenu';
import { useHomeFeed } from '../../src/hooks/useHomeFeed';
import { useCompetitionStandings } from '../../src/hooks/useCompetitionStandings';
import { mockNewsItems } from '../../src/mocks/home';

const COMPETITION_ID = 'wc2026';

export default function HomeTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: feedData, isLoading: feedLoading } = useHomeFeed(COMPETITION_ID);
  const { data: standingsData } = useCompetitionStandings(COMPETITION_ID);

  const isLoading = feedLoading;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppHeader onMenuPress={() => setMenuOpen(true)} />
      <HomeScreen
        live={feedData?.live ?? []}
        upcoming={feedData?.upcoming ?? []}
        groups={standingsData?.type === 'groups' ? (standingsData.groups ?? []) : []}
        newsItems={mockNewsItems}
        isLoading={isLoading}
        onPressMatch={(id) => router.push({ pathname: '/match/[id]', params: { id } })}
        onPressHub={() => router.push({ pathname: '/competition/[id]', params: { id: COMPETITION_ID } })}
      />
      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </SafeAreaView>
  );
}
