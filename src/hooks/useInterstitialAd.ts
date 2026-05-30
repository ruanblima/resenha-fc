import { useEffect } from 'react'
import { NativeModules, Platform } from 'react-native'

const IS_AVAILABLE = Platform.OS !== 'web' && 'RNGoogleMobileAdsModule' in NativeModules

const PRODUCTION_UNIT_ID = Platform.select({
  android: 'ca-app-pub-3363106042195024/7124392680',
  ios: 'ca-app-pub-3363106042195024/9120000635',
})!

// Contador global — incrementa a cada abertura de partida, enquanto o app estiver aberto
let matchOpenCount = 0

export function useInterstitialAd(triggerEvery = 2) {
  useEffect(() => {
    // Incrementa sempre que o usuário abre uma tela de partida
    matchOpenCount++

    if (!IS_AVAILABLE) return
    if (matchOpenCount % triggerEvery !== 0) return

    // É a Nª abertura — carrega e exibe o anúncio
    const { InterstitialAd, AdEventType, TestIds } = require('react-native-google-mobile-ads')

    const AD_UNIT_ID = __DEV__ ? TestIds.INTERSTITIAL : PRODUCTION_UNIT_ID
    const ad = InterstitialAd.createForAdRequest(AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: false,
    })

    const unsubscribe = ad.addAdEventListener(AdEventType.LOADED, () => {
      ad.show()
      unsubscribe()
    })

    ad.load()
  }, [triggerEvery])
}
