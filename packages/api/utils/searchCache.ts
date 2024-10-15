// Author-comment: in real app this would be replaced with redis

export const searchCache: Record<string, Record<'value' | 'expiresAt', any>> = {};
const pollingInterval = 1000 * 60 * 5; // 5 minutes

export function clearInvalidCachePoll() {
  setTimeout(() => {
    for (const key in searchCache) {
      if (searchCache[key].expiresAt < Date.now()) {
        delete searchCache[key];
      }
    }

    setTimeout(clearInvalidCachePoll, pollingInterval);
  }, pollingInterval);
}