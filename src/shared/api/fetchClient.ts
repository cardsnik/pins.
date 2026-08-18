export async function apiRequest<T>(
  url: string,
  params: Record<string, string> = {},
  headers: Record<string, string> = {}
): Promise<T> {
  const requestUrl = new URL(url);
  Object.entries(params).forEach(([key, value]) => requestUrl.searchParams.set(key, value));

  const response = await fetch(requestUrl.toString(), { headers });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
