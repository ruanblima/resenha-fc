import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
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
      className="flex-row"
      contentContainerClassName="px-4 gap-x-2 py-3"
    >
      {tournaments.map((tournament) => {
        const isSelected = tournament.id === selectedId;
        return (
          <Pressable
            key={tournament.id}
            testID={`tournament-tab-${tournament.id}`}
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(tournament.id)}
            className={`px-4 py-2 rounded-full border ${
              isSelected
                ? 'bg-primary border-primary'
                : 'bg-transparent border-outline-variant'
            }`}
          >
            <View>
              <Text
                className={`font-work-sans text-sm font-semibold ${
                  isSelected ? 'text-on-primary' : 'text-on-surface-variant'
                }`}
                style={isSelected ? { color: colors.onPrimary } : { color: colors.onSurfaceVariant }}
              >
                {tournament.name}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
