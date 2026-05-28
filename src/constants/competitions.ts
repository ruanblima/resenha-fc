import type { ComponentProps } from 'react';
import type MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface CompetitionItem {
  id: string;
  name: string;
  icon: ComponentProps<typeof MaterialIcons>['name'];
  /** Exibida em destaque no SideMenu e na tela de Competições */
  featured?: boolean;
}

/** Lista completa de competições exibidas no app */
export const COMPETITIONS: CompetitionItem[] = [
  // Internacional — destaque
  { id: 'wc2026',      name: 'Copa do Mundo 2026',  icon: 'emoji-events',  featured: true },
  { id: 'ucl',         name: 'Champions League',    icon: 'star',          featured: true },
  { id: 'euro2024',    name: 'Euro 2024',            icon: 'flag',          featured: true },

  // Brasil
  { id: 'brasileirao', name: 'Brasileirão Série A',  icon: 'sports-soccer', featured: true },
  { id: 'serie-b',     name: 'Brasileirão Série B',  icon: 'sports-soccer' },
  { id: 'copa-brasil', name: 'Copa do Brasil',        icon: 'emoji-events' },

  // Inglaterra
  { id: 'pl',          name: 'Premier League',        icon: 'verified',      featured: true },
  { id: 'fa-cup',      name: 'FA Cup',                icon: 'emoji-events' },
  { id: 'efl-cup',     name: 'EFL Cup',               icon: 'sports-soccer' },

  // Espanha
  { id: 'la-liga',     name: 'La Liga',               icon: 'sports-soccer' },
  { id: 'copa-del-rey',name: 'Copa del Rey',           icon: 'emoji-events' },

  // Itália
  { id: 'serie-a-it',  name: 'Serie A',               icon: 'sports-soccer' },
  { id: 'coppa-italia',name: 'Coppa Italia',           icon: 'emoji-events' },
];

/** Apenas as competições em destaque — usadas no SideMenu */
export const FEATURED_COMPETITIONS = COMPETITIONS.filter((c) => c.featured);
