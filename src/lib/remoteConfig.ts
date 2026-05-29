import AsyncStorage from '@react-native-async-storage/async-storage'

export interface RemoteConfig {
  apiUrl: string
}

const CACHE_KEY = 'remote_config_v1'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

// Stable URL: tied to Supabase project, never changes even if API URL changes
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''
const CONFIG_URL = `${SUPABASE_URL}/storage/v1/object/public/app-config/config.json`

const FALLBACK: RemoteConfig = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333',
}

// In-memory config — set once on startup, read by apiFetch
let _config: RemoteConfig = FALLBACK

export function getConfig(): RemoteConfig {
  return _config
}

interface CacheEntry {
  config: RemoteConfig
  timestamp: number
}

export async function loadRemoteConfig(): Promise<void> {
  // 1. Try AsyncStorage cache
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY)
    if (raw) {
      const entry: CacheEntry = JSON.parse(raw)
      if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
        _config = entry.config
        console.log('[remoteConfig] Loaded from cache:', _config)
        return
      }
    }
  } catch {
    // cache miss — proceed to fetch
  }

  // 2. Fetch from Supabase Storage
  try {
    const res = await fetch(CONFIG_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const config: RemoteConfig = await res.json()
    _config = config
    const entry: CacheEntry = { config, timestamp: Date.now() }
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(entry))
    console.log('[remoteConfig] Loaded from remote:', _config)
  } catch (err) {
    console.warn('[remoteConfig] Failed to fetch, using fallback:', err)
    // _config stays as FALLBACK or last cached value
  }
}
