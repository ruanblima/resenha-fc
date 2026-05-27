import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchSummary } from '../../types/api';

interface Props {
  match: MatchSummary;
  onPress?: () => void;
  onSave?: (matchId: number, saved: boolean) => void;
}

export function TodayMatchRow({ match, onPress, onSave }: Props) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const next = !saved;
    setSaved(next);
    onSave?.(match.id, next);
  }

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surfaceContainer,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: saved ? `${colors.primary}40` : `${colors.outlineVariant}33`,
        paddingLeft: 14,
        paddingRight: 8,
        paddingVertical: 12,
        gap: 10,
      }}
    >
      {/* Home team */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
        <FlagCircle uri={match.homeTeam.flagUrl} />
        <Text
          style={{ fontFamily: 'AnyBody-Bold', fontSize: 13, color: colors.onSurface }}
          numberOfLines={1}
        >
          {match.homeTeam.shortName}
        </Text>
      </View>

      {/* Time + stage */}
      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text
          style={{
            fontFamily: 'AnyBody-Bold',
            fontSize: 14,
            color: colors.onSurface,
            letterSpacing: 0.5,
          }}
        >
          {match.startTime}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 9,
            color: colors.onSurfaceVariant,
            letterSpacing: 0.8,
          }}
        >
          {match.stage.toUpperCase()}
        </Text>
      </View>

      {/* Away team */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Text
          style={{ fontFamily: 'AnyBody-Bold', fontSize: 13, color: colors.onSurface }}
          numberOfLines={1}
        >
          {match.awayTeam.shortName}
        </Text>
        <FlagCircle uri={match.awayTeam.flagUrl} />
      </View>

      {/* Save / notification button */}
      <TouchableOpacity
        onPress={handleSave}
        hitSlop={8}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: saved ? `${colors.primary}18` : 'transparent',
          borderWidth: saved ? 1 : 0,
          borderColor: `${colors.primary}40`,
          marginLeft: 2,
        }}
      >
        <MaterialIcons
          name={saved ? 'notifications-active' : 'notifications-none'}
          size={18}
          color={saved ? colors.primary : colors.onSurfaceVariant}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

function FlagCircle({ uri }: { uri: string }) {
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: colors.surfaceHigh,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}33`,
      }}
    >
      <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
    </View>
  );
}
