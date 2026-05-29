import { getConfig } from './remoteConfig'

export async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number>
): Promise<T> {
  const baseUrl = getConfig().apiUrl
  const url = new URL(`${baseUrl}${path}`)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }
  }

  console.log('[api] GET', url.toString())
  const response = await fetch(url.toString())

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`API error ${response.status}: ${body}`)
  }

  return response.json() as Promise<T>
}
