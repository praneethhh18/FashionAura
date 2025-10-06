import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'fashion-aura';

if (!uri) {
  // Do not throw here so tests / dev can run without DB if explicitly desired
  console.warn('MONGODB_URI not set; database calls will be no-ops.');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getClient(): Promise<MongoClient | null> {
  if (!uri) return null;
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function getDb(): Promise<Db | null> {
  if (!uri) return null;
  if (cachedDb) return cachedDb;
  const client = await getClient();
  if (!client) return null;
  cachedDb = client.db(dbName);
  return cachedDb;
}

export async function closeClient() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
