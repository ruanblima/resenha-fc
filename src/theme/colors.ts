export const colors = {
  // Superfícies
  background: '#131313',
  surface: '#1c1b1b',
  surfaceContainer: '#201f1f',
  surfaceContainerLowest: '#0e0e0e',
  surfaceHigh: '#2a2a2a',
  surfaceHighest: '#353534',

  // Primária — Victory Gold
  primary: '#f2ca50',
  primaryContainer: '#d4af37',
  onPrimary: '#3c2f00',
  onPrimaryContainer: '#554300',

  // Secundária — Pitch Green
  secondary: '#4ae183',
  secondaryContainer: '#06bb63',
  onSecondary: '#003919',

  // Conteúdo
  onSurface: '#e5e2e1',
  onSurfaceVariant: '#d0c5af',

  // Bordas
  outline: '#99907c',
  outlineVariant: '#4d4635',

  // Erro
  error: '#ffb4ab',
} as const;

export type ColorToken = keyof typeof colors;
