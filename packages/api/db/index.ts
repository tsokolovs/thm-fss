export const openDBConnection = async () => {
  if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
    await import('./startAndSeedMemoryDB');
  }

  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
  const DATABASE_URL = process.env.DATABASE_URL;
};
