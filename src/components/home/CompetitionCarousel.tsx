import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { Competition } from '../../types/home';

interface Props {
  competitions: Competition[];
  onSelect?: (id: string) => void;
}

const CARD_BG: Record<string, string> = {
  wc2026: '#1a1f12',
  ucl: '#0e1320',
  pl: '#12141a',
  euro2024: '#111a1a',
};

export function CompetitionCarousel({ competitions, onSelect }: Props) {
  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <Text className="font-anybody-bold text-xl text-on-surface uppercase tracking-tight">
          Competições
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 4 }}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        {competitions.map((comp) => (
          <CompetitionCard key={comp.id} comp={comp} onPress={() => onSelect?.(comp.id)} />
        ))}
      </ScrollView>
    </View>
  );
}

function CompetitionCard({ comp, onPress }: { comp: Competition; onPress: () => void }) {
  const bg = CARD_BG[comp.id] ?? '#1a1a1a';

  return (
    <Pressable
      testID={`competition-card-${comp.id}`}
      accessibilityState={{ selected: !!comp.isActive }}
      onPress={onPress}
      style={{
        width: 200,
        height: 130,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: comp.isActive ? 1.5 : 1,
        borderColor: comp.isActive ? colors.primaryContainer : `${colors.outlineVariant}33`,
        shadowColor: comp.isActive ? colors.primary : 'transparent',
        shadowOpacity: comp.isActive ? 0.15 : 0,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: bg,
      }}
    >
      {/* Gradient overlay from bottom */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: undefined,
        }}
        pointerEvents="none"
      >
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(19,19,19,0.7)',
          }}
        />
      </View>

      {/* LIVE NOW badge */}
      {comp.isLive && (
        <View
          className="absolute top-3 left-3 px-2 py-0.5 rounded"
          style={{ backgroundColor: colors.primary }}
        >
          <Text
            className="font-inter-semibold"
            style={{ fontSize: 9, color: colors.onPrimary, letterSpacing: 1 }}
          >
            AO VIVO
          </Text>
        </View>
      )}

      {/* Icon top-right */}
      <View className="absolute top-3 right-3">
        <MaterialIcons
          name={comp.icon as any}
          size={18}
          color={comp.isActive ? colors.primary : `${colors.onSurfaceVariant}99`}
        />
      </View>

      {/* Category + Name bottom-left */}
      <View className="absolute bottom-3 left-3 right-3">
        <Text
          className="font-inter-semibold mb-0.5"
          style={{ fontSize: 9, color: colors.primary, letterSpacing: 1.5 }}
        >
          {comp.category.toUpperCase()}
        </Text>
        <Text className="font-anybody-bold text-sm text-on-surface" numberOfLines={1}>
          {comp.name}
        </Text>
      </View>
    </Pressable>
  );
}
