type CacheEntry = {
  response: string;
  timestamp: number;
};

class ResponseCache {
  private static instance: ResponseCache;
  private cache: Map<string, CacheEntry> = new Map();
  private readonly ttl: number; // Time to live in milliseconds

  private constructor(ttlMinutes: number = 60) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  static getInstance(): ResponseCache {
    if (!ResponseCache.instance) {
      ResponseCache.instance = new ResponseCache();
    }
    return ResponseCache.instance;
  }

  set(key: string, value: string): void {
    this.cache.set(key, {
      response: value,
      timestamp: Date.now(),
    });
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.response;
  }

  // Generate a cache key from the prompt and chat history
  static generateKey(prompt: string, chatHistory: Array<{ role: string, text: string }> = []): string {
    return JSON.stringify({ prompt, chatHistory });
  }
}

export { ResponseCache };
