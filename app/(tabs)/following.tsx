import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { CompetitionsScreen } from '../../src/components/competitions/CompetitionsScreen';
import { SideMenu } from '../../src/components/SideMenu';
import { mockCompetitions, mockCountryLeagues } from '../../src/mocks/home';

export default function FollowingTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelect = (id: string) => {
    router.push({ pathname: '/competition/[id]', params: { id } });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppHeader title="COMPETIÇÕES" onMenuPress={() => setMenuOpen(true)} />
      <CompetitionsScreen
        featuredCompetitions={mockCompetitions}
        countryLeagues={mockCountryLeagues}
        onSelectCompetition={handleSelect}
        onSelectLeague={handleSelect}
      />
      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </SafeAreaView>
  );
}
