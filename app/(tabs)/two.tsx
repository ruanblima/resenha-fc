import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { StatsScreen } from '../../src/components/stats/StatsScreen';
import {
  mockAssists,
  mockCards,
  mockGroupStanding,
  mockScorers,
  statValueLabel,
} from '../../src/mocks/stats';
import type { StatCategory } from '../../src/types/stats';

const playersByCategory = {
  scorers: mockScorers,
  assists: mockAssists,
  cards: mockCards,
};

export default function StatsTab() {
  const [selectedCategory, setSelectedCategory] = useState<StatCategory>('scorers');

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppHeader />
      <StatsScreen
        players={playersByCategory[selectedCategory]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        groupStanding={mockGroupStanding}
        statLabel={statValueLabel[selectedCategory]}
      />
    </SafeAreaView>
  );
}
