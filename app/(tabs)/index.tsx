import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { HomeScreen } from '../../src/components/home/HomeScreen';
import { SideMenu } from '../../src/components/SideMenu';
import { mockCompetitions, mockMatchDayItems, mockNewsItems } from '../../src/mocks/home';

export default function HomeTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppHeader onMenuPress={() => setMenuOpen(true)} />
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
        onSelectCompetition={(id) => router.push({ pathname: '/competition/[id]', params: { id } })}
        onPressMatch={(id) => router.push({ pathname: '/match/[id]', params: { id } })}
      />
      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </SafeAreaView>
  );
}
