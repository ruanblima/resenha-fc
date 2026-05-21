import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import type { LiveMatch } from '../../types/match';

import { LiveMatchCard } from './LiveMatchCard';

interface Props {
  matches: LiveMatch[];
  onMatchPress?: (match: LiveMatch) => void;
}

export function LiveGamesScreen({ matches, onMatchPress }: Props) {
  return (
    <View className="flex-1 bg-background">
      <View className="px-4 pt-4 pb-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-on-surface font-anybody-bold text-2xl tracking-tight">AO VIVO</Text>
          {matches.length > 0 && (
            <View className="flex-row items-center gap-1 bg-secondary/10 px-2 py-0.5 rounded-full">
              <View className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <Text className="text-secondary font-inter-semibold text-xs">
                {matches.length} ao vivo
              </Text>
            </View>
          )}
        </View>
        <Text className="text-on-surface-variant font-work-sans text-sm mt-0.5">
          Fixtures em andamento e atualizações em tempo real.
        </Text>
      </View>

      {matches.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-3 px-8">
          <Text className="text-4xl">⚽</Text>
          <Text className="text-on-surface font-anybody-bold text-lg text-center">
            Nenhum jogo ao vivo
          </Text>
          <Text className="text-on-surface-variant font-work-sans text-sm text-center">
            No momento não há partidas em andamento. Volte mais tarde.
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-6"
          showsVerticalScrollIndicator={false}
        >
          {matches.map((match) => (
            <LiveMatchCard key={match.id} match={match} onPress={() => onMatchPress?.(match)} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
