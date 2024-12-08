export class RateLimiter {
  private timestamps: number[] = [];
  private readonly limit: number;
  private readonly interval: number;

  constructor(limit: number, interval: number = 60000) { // default 60 seconds
    this.limit = limit;
    this.interval = interval;
  }

  async waitForToken(): Promise<void> {
    const now = Date.now();
    
    // Remove timestamps outside the current interval window
    this.timestamps = this.timestamps.filter(
      timestamp => now - timestamp < this.interval
    );

    if (this.timestamps.length >= this.limit) {
      // Calculate required delay
      const oldestTimestamp = this.timestamps[0];
      const delay = this.interval - (now - oldestTimestamp);
      
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    this.timestamps.push(Date.now());
  }
}
