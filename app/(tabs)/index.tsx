import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { HomeScreen } from '../../src/components/home/HomeScreen';
import { mockCompetitions, mockMatchDayItems, mockNewsItems } from '../../src/mocks/home';

export default function HomeTab() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      <AppHeader />
      <HomeScreen
        competitions={mockCompetitions}
        matchDayItems={mockMatchDayItems}
        newsItems={mockNewsItems}
        onPressMatch={(id) => router.push(`/match/${id}` as any)}
      />
    </SafeAreaView>
  );
}
