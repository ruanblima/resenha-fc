import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchSummary } from '../../types/api';

interface Props {
  nextMatch: MatchSummary;
}

export function NoLiveMatches({ nextMatch }: Props) {
  const [countdown, setCountdown] = useState(() => getCountdown(nextMatch.startTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(nextMatch.startTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [nextMatch.startTime]);

  const [hh, mm, ss] = countdown.split(':');

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginBottom: 20,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 16,
        borderTopWidth: 3,
        borderTopColor: `${colors.outlineVariant}80`,
        overflow: 'hidden',
      }}
    >
      {/* Header row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 10,
        }}
      >
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: `${colors.outlineVariant}30`,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: `${colors.outlineVariant}50`,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.onSurfaceVariant,
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 10,
              color: colors.onSurfaceVariant,
              letterSpacing: 1,
            }}
          >
            STANDBY
          </Text>
        </View>
      </View>

      {/* Icon + title */}
      <View style={{ alignItems: 'center', paddingHorizontal: 24, gap: 8 }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: `${colors.primary}18`,
            borderWidth: 1,
            borderColor: `${colors.primary}30`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name="schedule" size={28} color={colors.primary} />
        </View>

        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 16,
            color: colors.onSurface,
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          Nenhuma partida ao vivo no momento
        </Text>

        <Text
          style={{
            fontFamily: 'WorkSans-Regular',
            fontSize: 12,
            color: colors.onSurfaceVariant,
            textAlign: 'center',
            lineHeight: 18,
          }}
        >
          O campo está em preparação. Os holofotes aquecem para o próximo confronto.
        </Text>
      </View>

      {/* Countdown */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginTop: 20,
          marginBottom: 4,
        }}
      >
        <CountdownUnit value={hh} label="HRS" />
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 36,
            color: colors.primary,
            marginBottom: 12,
          }}
        >
          :
        </Text>
        <CountdownUnit value={mm} label="MIN" />
        <Text
          style={{
            fontFamily: 'AnyBody-ExtraBold',
            fontSize: 36,
            color: colors.primary,
            marginBottom: 12,
          }}
        >
          :
        </Text>
        <CountdownUnit value={ss} label="SEG" />
      </View>

      {/* Next match info */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          paddingHorizontal: 16,
          paddingVertical: 16,
          marginTop: 4,
          borderTopWidth: 1,
          borderTopColor: `${colors.outlineVariant}30`,
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 9,
            color: colors.onSurfaceVariant,
            letterSpacing: 0.8,
          }}
        >
          {nextMatch.stage.toUpperCase()}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <FlagSmall uri={nextMatch.homeTeam.flagUrl} />
          <Text
            style={{
              fontFamily: 'AnyBody-Bold',
              fontSize: 13,
              color: colors.onSurface,
            }}
          >
            {nextMatch.homeTeam.shortName}
          </Text>
          <Text
            style={{
              fontFamily: 'WorkSans-Regular',
              fontSize: 11,
              color: colors.onSurfaceVariant,
            }}
          >
            vs
          </Text>
          <Text
            style={{
              fontFamily: 'AnyBody-Bold',
              fontSize: 13,
              color: colors.onSurface,
            }}
          >
            {nextMatch.awayTeam.shortName}
          </Text>
          <FlagSmall uri={nextMatch.awayTeam.flagUrl} />
        </View>
      </View>
    </View>
  );
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <Text
        style={{
          fontFamily: 'AnyBody-ExtraBold',
          fontSize: 36,
          color: colors.primary,
          letterSpacing: -1,
          lineHeight: 40,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: 9,
          color: colors.onSurfaceVariant,
          letterSpacing: 1,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function FlagSmall({ uri }: { uri: string }) {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: colors.surfaceContainer,
      }}
    >
      <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
    </View>
  );
}

/**
 * Computes "HH:MM:SS" remaining until a match's startTime (BRT string like "16:00").
 * Returns "00:00:00" if the time has already passed.
 *
 * Uses raw UTC math: BRT = UTC-3 (Brazil dropped DST in 2019, always UTC-3).
 * Avoids new Date(localeString) which Hermes does not parse reliably.
 */
function getCountdown(startTime?: string): string {
  if (!startTime) return '00:00:00';

  try {
    const parts = startTime.split(':');
    const targetH = parseInt(parts[0], 10);
    const targetM = parseInt(parts[1], 10);

    if (isNaN(targetH) || isNaN(targetM)) return '00:00:00';

    const now = new Date();
    // BRT = UTC - 3h (no DST)
    const brtH = (now.getUTCHours() + 21) % 24; // +21 = -3 mod 24
    const brtM = now.getUTCMinutes();
    const brtS = now.getUTCSeconds();

    const targetSecs = targetH * 3600 + targetM * 60;
    const currentSecs = brtH * 3600 + brtM * 60 + brtS;

    const diff = targetSecs - currentSecs;
    if (diff <= 0) return '00:00:00';

    const hh = Math.floor(diff / 3600);
    const mm = Math.floor((diff % 3600) / 60);
    const ss = diff % 60;

    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  } catch {
    return '00:00:00';
  }
}
