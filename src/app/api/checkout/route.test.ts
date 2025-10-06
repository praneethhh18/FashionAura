import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import { spawn } from 'child_process';
import path from 'path';

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

test('POST /api/checkout persists order', async () => {
  // Directly import the route handler file and call POST function is tricky in Next env.
  // Instead we exercise the function via the getDb helper to ensure insert works.
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('testdb');

  const checkoutPayload = {
    items: [{ id: 'prod-1', name: 'Product 1', quantity: 2, price: 10 }],
    total: 20,
  };

  // Use the route module directly
  const route = await import('./route');
  // Emulate Request object minimally
  const req = new Request('http://localhost/api/checkout', { method: 'POST', body: JSON.stringify(checkoutPayload) });
  const res = await route.POST(req);
  const data = await res.json();
  expect(data.orderId).toBeDefined();

  // verify in DB
  const inserted = await db.collection('orders').findOne({ orderId: data.orderId });
  expect(inserted).toBeTruthy();
  await client.close();
});
