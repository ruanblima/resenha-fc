import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

import type { Tournament } from '../../types/home';

interface Props {
  tournaments: Tournament[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TournamentSelector({ tournaments, selectedId, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 12 }}
    >
      {tournaments.map((tournament) => {
        const isSelected = tournament.id === selectedId;
        return (
          <Pressable
            key={tournament.id}
            testID={`tournament-tab-${tournament.id}`}
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(tournament.id)}
            className={`px-5 py-2 rounded-full ${
              isSelected
                ? 'bg-primary-container'
                : 'bg-surface-container border border-outline-variant'
            }`}
          >
            <Text
              className={`font-inter-semibold text-xs tracking-widest uppercase ${
                isSelected ? 'text-on-primary-container' : 'text-on-surface-variant'
              }`}
            >
              {tournament.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
