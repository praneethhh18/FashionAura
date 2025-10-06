import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'fashion-aura';

if (!uri) {
  // Do not throw here so tests / dev can run without DB if explicitly desired
  console.warn('MONGODB_URI not set; database calls will be no-ops.');
}

declare global {
  // eslint-disable-next-line no-var
  var __mongo_global__: { client?: MongoClient; db?: Db } | undefined;
}

async function createClient() {
  // Tune pool size for serverless: lower if you hit connection limits
  const client = new MongoClient(uri!, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  return client;
}

export async function getClient(): Promise<MongoClient | null> {
  if (!uri) return null;
  if (!global.__mongo_global__) global.__mongo_global__ = {};
  if (global.__mongo_global__.client) return global.__mongo_global__.client;
  const client = await createClient();
  global.__mongo_global__.client = client;
  return client;
}

export async function getDb(): Promise<Db | null> {
  if (!uri) return null;
  if (!global.__mongo_global__) global.__mongo_global__ = {};
  if (global.__mongo_global__.db) return global.__mongo_global__.db;
  const client = await getClient();
  if (!client) return null;
  global.__mongo_global__.db = client.db(dbName);
  return global.__mongo_global__.db;
}

export async function closeClient() {
  if (global.__mongo_global__ && global.__mongo_global__.client) {
    try {
      await global.__mongo_global__.client.close();
    } catch (e) {
      // ignore
    }
    global.__mongo_global__ = undefined;
  }
}
