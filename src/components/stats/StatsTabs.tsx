import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { StatCategory } from '../../types/stats';

const TABS: { id: StatCategory; label: string }[] = [
  { id: 'scorers', label: 'ARTILHEIROS' },
  { id: 'assists', label: 'ASSISTÊNCIAS' },
  { id: 'cards', label: 'CARTÕES' },
];

interface Props {
  selected: StatCategory;
  onSelect: (category: StatCategory) => void;
}

export function StatsTabs({ selected, onSelect }: Props) {
  return (
    <View
      className="border-b border-outline-variant"
      style={{ borderBottomWidth: 1, borderBottomColor: `${colors.outlineVariant}4D` }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {TABS.map((tab) => {
          const isActive = tab.id === selected;
          return (
            <Pressable
              key={tab.id}
              testID={`stats-tab-${tab.id}`}
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelect(tab.id)}
              className="px-6 py-3"
              style={{
                borderBottomWidth: 2,
                borderBottomColor: isActive ? colors.primary : 'transparent',
              }}
            >
              <Text
                className="font-inter-semibold text-xs tracking-widest"
                style={{ color: isActive ? colors.primary : colors.onSurfaceVariant }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
