import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme';
import type { Competition, CountryLeagues } from '../../types/home';
import { CountryAccordion } from './CountryAccordion';

interface Props {
  featuredCompetitions: Competition[];
  countryLeagues: CountryLeagues[];
  onSelectCompetition?: (id: string) => void;
  onSelectLeague?: (id: string) => void;
}

const CARD_BACKGROUNDS: Record<string, string> = {
  wc2026: '#1a2a1a',
  ucl: '#1a1a2a',
  pl: '#2a1a1a',
  euro2024: '#1a221a',
};

export function CompetitionsScreen({
  featuredCompetitions,
  countryLeagues,
  onSelectCompetition,
  onSelectLeague,
}: Props) {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* International section */}
      <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text
            style={{
              fontFamily: 'Anybody_700Bold',
              fontSize: 18,
              color: colors.onSurface,
              letterSpacing: 0.5,
            }}
          >
            INTERNACIONAL
          </Text>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 12,
              color: colors.primary,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Ver Tudo
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingBottom: 4 }}
        >
          {featuredCompetitions.map((comp) => (
            <FeaturedCompetitionCard
              key={comp.id}
              competition={comp}
              onPress={() => onSelectCompetition?.(comp.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Countries section */}
      <View style={{ marginTop: 32, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontFamily: 'Anybody_700Bold',
            fontSize: 18,
            color: colors.onSurface,
            letterSpacing: 0.5,
            marginBottom: 16,
          }}
        >
          PAÍSES
        </Text>
        <View style={{ gap: 12 }}>
          {countryLeagues.map((country) => (
            <CountryAccordion
              key={country.id}
              country={country}
              onSelectLeague={onSelectLeague}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function FeaturedCompetitionCard({
  competition,
  onPress,
}: {
  competition: Competition;
  onPress: () => void;
}) {
  const bgColor = CARD_BACKGROUNDS[competition.id] ?? '#1a1a1a';
  const isActive = competition.isActive;

  return (
    <TouchableOpacity
      testID={`featured-competition-${competition.id}`}
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: 200,
        height: 130,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: bgColor,
        borderWidth: isActive ? 1.5 : 1,
        borderColor: isActive ? colors.primary : `${colors.outlineVariant}33`,
        ...(isActive && {
          shadowColor: colors.primary,
          shadowOpacity: 0.3,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }),
      }}
    >
      {/* Icon top-right */}
      <View style={{ position: 'absolute', top: 12, right: 12 }}>
        <MaterialIcons
          name={competition.icon}
          size={20}
          color={isActive ? colors.primary : colors.onSurfaceVariant}
        />
      </View>

      {/* Bottom content */}
      <View style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
        {isActive && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: colors.secondary,
              }}
            />
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 10,
                color: colors.secondary,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              ATIVO
            </Text>
          </View>
        )}
        <Text
          style={{
            fontFamily: 'Anybody_700Bold',
            fontSize: 14,
            color: colors.onSurface,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {competition.name}
        </Text>
        {competition.region && (
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 10,
              color: `${colors.onSurfaceVariant}B3`,
              marginTop: 2,
              letterSpacing: 0.5,
            }}
          >
            {competition.region}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
