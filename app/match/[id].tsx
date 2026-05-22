import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { MatchDetailScreen } from '../../src/components/match/MatchDetailScreen';
import { mockMatchDetails } from '../../src/mocks/matchDetails';
import { colors } from '../../src/theme';

export default function MatchDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = mockMatchDetails.find((m) => m.id === Number(id));

  if (!match) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.onSurfaceVariant }}>Partida não encontrada</Text>
      </View>
    );
  }

  const title = `${match.homeTeam.shortName} × ${match.awayTeam.shortName}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <AppHeader title={title} showBack />
      <MatchDetailScreen match={match} />
    </SafeAreaView>
  );
}
