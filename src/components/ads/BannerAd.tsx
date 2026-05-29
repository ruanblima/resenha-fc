import { NativeModules, Platform } from 'react-native'

// react-native-google-mobile-ads requer build nativo — não funciona no Expo Go
const IS_AVAILABLE =
  Platform.OS !== 'web' && 'RNGoogleMobileAdsModule' in NativeModules

// Só faz require se o módulo nativo estiver disponível
const AdsModule = IS_AVAILABLE ? require('react-native-google-mobile-ads') : null

const PRODUCTION_UNIT_ID = 'ca-app-pub-3363106042195024/9075768606'

export function BannerAd() {
  if (!AdsModule) return null

  const { BannerAd: GoogleBannerAd, BannerAdSize, TestIds } = AdsModule
  const AD_UNIT_ID = __DEV__ ? TestIds.BANNER : PRODUCTION_UNIT_ID

  return (
    <GoogleBannerAd
      unitId={AD_UNIT_ID}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{ requestNonPersonalizedAdsOnly: false }}
    />
  )
}
