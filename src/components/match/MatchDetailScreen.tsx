import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { colors } from '../../theme';
import type { MatchDetailTab, MatchDetails } from '../../types/match';
import { MatchDetailTabs } from './MatchDetailTabs';
import { MatchLineupsPanel } from './MatchLineupsPanel';
import { MatchScoreboardHero } from './MatchScoreboardHero';
import { MatchStatsPanel } from './MatchStatsPanel';
import { MatchTimeline } from './MatchTimeline';
import { WinProbabilityCard } from './WinProbabilityCard';

interface Props {
  match: MatchDetails;
}

export function MatchDetailScreen({ match }: Props) {
  const [activeTab, setActiveTab] = useState<MatchDetailTab>('events');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Scoreboard */}
        <View className="px-4 pt-4 pb-2">
          <MatchScoreboardHero match={match} />
        </View>

        {/* Tabs */}
        <MatchDetailTabs selected={activeTab} onSelect={setActiveTab} />

        {/* Tab content */}
        <View className="px-4 pt-4 gap-y-4">
          {activeTab === 'events' && (
            <MatchTimeline
              events={match.events}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />
          )}

          {activeTab === 'lineups' && match.lineup && (
            <MatchLineupsPanel
              lineup={match.lineup}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />
          )}

          {activeTab === 'stats' && (
            <>
              <MatchStatsPanel
                stats={match.stats}
                homeShortName={match.homeTeam.shortName}
                awayShortName={match.awayTeam.shortName}
              />
              {match.winProbability && (
                <WinProbabilityCard
                  probability={match.winProbability}
                  homeShortName={match.homeTeam.shortName}
                  awayShortName={match.awayTeam.shortName}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
