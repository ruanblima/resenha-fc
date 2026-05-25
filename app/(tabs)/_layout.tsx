import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { CompetitionsBottomSheet } from '../../src/components/competitions/CompetitionsBottomSheet';
import { colors } from '../../src/theme';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

function TabIcon({ name, color }: { name: IconName; color: string }) {
  return <MaterialIcons name={name} size={22} color={color} />;
}

export default function TabLayout() {
  const router = useRouter();
  const [showCompetitions, setShowCompetitions] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.outlineVariant,
            borderTopWidth: 1,
            height: Platform.OS === 'ios' ? 84 : 60,
            paddingBottom: Platform.OS === 'ios' ? 28 : 8,
            paddingTop: 6,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.outline,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="following"
          options={{
            title: 'Ligas',
            tabBarIcon: ({ color }) => <TabIcon name="emoji-events" color={color} />,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => setShowCompetitions(true)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="live"
          options={{
            title: 'Ao Vivo',
            tabBarIcon: ({ color }) => <TabIcon name="live-tv" color={color} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color }) => <TabIcon name="leaderboard" color={color} />,
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color }) => <TabIcon name="more-horiz" color={color} />,
          }}
        />
      </Tabs>

      <CompetitionsBottomSheet
        visible={showCompetitions}
        onClose={() => setShowCompetitions(false)}
        onSelectCompetition={(id) => {
          router.push({ pathname: '/competition/[id]', params: { id } });
        }}
      />
    </>
  );
}
