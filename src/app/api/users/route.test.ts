import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let mongod: MongoMemoryServer;
let uri: string;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  uri = mongod.getUri();
  process.env.MONGODB_URI = uri;
  process.env.MONGODB_DB = 'testdb';
});

afterAll(async () => {
  try {
    const mod = await import('@/lib/mongodb');
    if (mod && typeof mod.closeClient === 'function') await mod.closeClient();
  } catch (e) {}
  if (mongod) await mongod.stop();
});

test('POST /api/users creates user', async () => {
  const route = await import('./route');
  const payload = { email: 'qa@example.com', name: 'QA' };
  const req = new Request('http://localhost/api/users', { method: 'POST', body: JSON.stringify(payload) });
  const res = await route.POST(req);
  const data = await res.json();
  expect(data.ok).toBeTruthy();
  expect(data.userId).toBeDefined();
});
