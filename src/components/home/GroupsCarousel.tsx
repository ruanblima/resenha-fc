import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { StandingEntry, StandingGroup } from '../../types/standings';

interface Props {
  groups: StandingGroup[];
  onPressGroup?: (groupName: string) => void;
}

export function GroupsCarousel({ groups, onPressGroup }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 4 }}
      decelerationRate="fast"
      snapToAlignment="start"
    >
      {groups.map((group) => (
        <GroupCard
          key={group.name}
          group={group}
          onPress={onPressGroup ? () => onPressGroup(group.name) : undefined}
        />
      ))}
    </ScrollView>
  );
}

function GroupCard({
  group,
  onPress,
}: {
  group: StandingGroup;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 210,
        backgroundColor: colors.surfaceHigh,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: `${colors.outlineVariant}40`,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 14,
          paddingTop: 12,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: `${colors.outlineVariant}30`,
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 11,
            color: colors.primary,
            letterSpacing: 1.2,
          }}
        >
          {group.name.toUpperCase()}
        </Text>
      </View>

      {/* Column headers */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingTop: 8,
          paddingBottom: 4,
        }}
      >
        <Text style={[colHeaderStyle, { width: 20 }]}>#</Text>
        <Text style={[colHeaderStyle, { flex: 1 }]}>TIME</Text>
        <Text style={[colHeaderStyle, { width: 24, textAlign: 'center' }]}>J</Text>
        <Text style={[colHeaderStyle, { width: 28, textAlign: 'center', color: colors.primary }]}>PTS</Text>
      </View>

      {/* Rows */}
      <View style={{ paddingHorizontal: 14, paddingBottom: 12, gap: 6 }}>
        {group.entries.map((entry) => (
          <GroupRow key={entry.team.id} entry={entry} />
        ))}
      </View>
    </Pressable>
  );
}

function GroupRow({ entry }: { entry: StandingEntry }) {
  const qualifies = entry.zone === 'qualify';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 0 }}>
      {/* Rank + qualifier indicator */}
      <View style={{ width: 20, alignItems: 'center' }}>
        {qualifies ? (
          <View
            style={{
              width: 4,
              height: 14,
              borderRadius: 2,
              backgroundColor: colors.secondary,
            }}
          />
        ) : (
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 11,
              color: colors.onSurfaceVariant,
            }}
          >
            {entry.rank}
          </Text>
        )}
      </View>

      {/* Flag */}
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: colors.surfaceContainer,
          marginRight: 6,
        }}
      >
        <Image
          source={{ uri: entry.team.imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      {/* Team name */}
      <Text
        style={{
          fontFamily: qualifies ? 'AnyBody-Bold' : 'WorkSans-Regular',
          fontSize: 12,
          color: qualifies ? colors.onSurface : colors.onSurfaceVariant,
          flex: 1,
        }}
        numberOfLines={1}
      >
        {entry.team.shortName}
      </Text>

      {/* Played */}
      <Text
        style={{
          fontFamily: 'WorkSans-Regular',
          fontSize: 11,
          color: colors.onSurfaceVariant,
          width: 24,
          textAlign: 'center',
        }}
      >
        {entry.played}
      </Text>

      {/* Points */}
      <Text
        style={{
          fontFamily: 'AnyBody-ExtraBold',
          fontSize: 13,
          color: qualifies ? colors.primary : colors.onSurfaceVariant,
          width: 28,
          textAlign: 'center',
        }}
      >
        {entry.points}
      </Text>
    </View>
  );
}

const colHeaderStyle = {
  fontFamily: 'Inter_600SemiBold',
  fontSize: 9,
  color: colors.onSurfaceVariant,
  letterSpacing: 0.8,
} as const;
