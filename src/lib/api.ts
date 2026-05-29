// Base URL for the resenha-fc-api.
// iOS simulator: localhost works. Android emulator: use 10.0.2.2
// Override via EXPO_PUBLIC_API_URL env var.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333'

export async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number>
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)

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
