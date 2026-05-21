import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchDetailTab } from '../../types/match';

const TABS: { id: MatchDetailTab; label: string }[] = [
  { id: 'events', label: 'LANCES' },
  { id: 'lineups', label: 'ESCALAÇÕES' },
  { id: 'stats', label: 'ESTATÍSTICAS' },
  { id: 'summary', label: 'RESUMO' },
];

interface Props {
  selected: MatchDetailTab;
  onSelect: (tab: MatchDetailTab) => void;
}

export function MatchDetailTabs({ selected, onSelect }: Props) {
  return (
    <View
      style={{ borderBottomWidth: 1, borderBottomColor: `${colors.outlineVariant}4D` }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {TABS.map((tab) => {
          const isActive = tab.id === selected;
          return (
            <Pressable
              key={tab.id}
              testID={`match-tab-${tab.id}`}
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelect(tab.id)}
              className="px-6 py-4"
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
