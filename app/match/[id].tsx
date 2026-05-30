import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '../../src/components/AppHeader';
import { MatchDetailScreen } from '../../src/components/match/MatchDetailScreen';
import { useInterstitialAd } from '../../src/hooks/useInterstitialAd';
import { useMatchDetail } from '../../src/hooks/useMatchDetail';
import { colors } from '../../src/theme';

export default function MatchDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const fixtureId = Number(Array.isArray(id) ? id[0] : id);

  // Mostra anúncio intersticial a cada 2 aberturas de partida
  useInterstitialAd(2);

  const { data: match, isLoading, isError } = useMatchDetail(fixtureId);

  const title = match
    ? `${match.homeTeam.shortName} × ${match.awayTeam.shortName}`
    : '...';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <AppHeader title={title} showBack />

      {isLoading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {isError && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.onSurfaceVariant }}>Erro ao carregar partida</Text>
        </View>
      )}

      {match && <MatchDetailScreen match={match} />}
    </SafeAreaView>
  );
}
