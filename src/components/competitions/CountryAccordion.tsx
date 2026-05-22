import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme';
import type { CountryLeagues } from '../../types/home';

interface Props {
  country: CountryLeagues;
  onSelectLeague?: (id: string) => void;
}

export function CountryAccordion({ country, onSelectLeague }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}33`,
        backgroundColor: 'rgba(26,26,26,0.6)',
      }}
    >
      <TouchableOpacity
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: colors.surfaceHigh,
        }}
      >
        <Text
          style={{
            fontFamily: 'Anybody_700Bold',
            fontSize: 16,
            color: colors.onSurface,
          }}
        >
          {country.name}
        </Text>
        <MaterialIcons
          name={expanded ? 'expand-less' : 'expand-more'}
          size={22}
          color={colors.primaryContainer}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={{ borderTopWidth: 1, borderTopColor: `${colors.outlineVariant}30` }}>
          {country.leagues.map((league, idx) => (
            <TouchableOpacity
              key={league.id}
              onPress={() => onSelectLeague?.(league.id)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderTopWidth: idx > 0 ? 1 : 0,
                borderTopColor: `${colors.outlineVariant}25`,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <MaterialIcons
                  name={league.icon}
                  size={20}
                  color={league.isFeatured ? colors.primary : colors.outline}
                />
                <Text
                  style={{
                    fontFamily: 'WorkSans_400Regular',
                    fontSize: 15,
                    color: league.isFeatured ? colors.primary : colors.onSurface,
                    fontWeight: league.isFeatured ? '600' : '400',
                  }}
                >
                  {league.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {league.isFeatured && (
                  <View
                    style={{
                      backgroundColor: colors.primaryContainer,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 10,
                        color: colors.onPrimaryContainer,
                        fontWeight: 'bold',
                      }}
                    >
                      TOP
                    </Text>
                  </View>
                )}
                <MaterialIcons name="chevron-right" size={18} color={colors.outlineVariant} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
