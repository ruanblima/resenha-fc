import { useEffect } from 'react'

// TODO: Substituir com seus dados reais após aprovação do AdSense
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX'
const AD_SLOT = 'XXXXXXXXXX'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function BannerAd() {
  useEffect(() => {
    // Injeta o script do AdSense uma única vez na página
    if (!document.querySelector('script[data-adsense]')) {
      const script = document.createElement('script')
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`
      script.async = true
      script.crossOrigin = 'anonymous'
      script.dataset.adsense = 'true'
      document.head.appendChild(script)
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense ainda não disponível
    }
  }, [])

  return (
    <div style={{ textAlign: 'center', margin: '8px 0' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
