const { colors } = require('./src/theme/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        surface: colors.surface,
        'surface-container': colors.surfaceContainer,
        'surface-container-lowest': colors.surfaceContainerLowest,
        'surface-high': colors.surfaceHigh,
        'surface-highest': colors.surfaceHighest,
        primary: colors.primary,
        'primary-container': colors.primaryContainer,
        'on-primary': colors.onPrimary,
        'on-primary-container': colors.onPrimaryContainer,
        secondary: colors.secondary,
        'secondary-container': colors.secondaryContainer,
        'on-secondary': colors.onSecondary,
        'on-surface': colors.onSurface,
        'on-surface-variant': colors.onSurfaceVariant,
        outline: colors.outline,
        'outline-variant': colors.outlineVariant,
        error: colors.error,
      },
      fontFamily: {
        anybody: ['Anybody_400Regular'],
        'anybody-bold': ['Anybody_700Bold'],
        'anybody-extrabold': ['Anybody_800ExtraBold'],
        'work-sans': ['WorkSans_400Regular'],
        inter: ['Inter_400Regular'],
        'inter-semibold': ['Inter_600SemiBold'],
      },
    },
  },
  plugins: [],
}
