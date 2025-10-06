import { getDb, getClient } from '../src/lib/mongodb';

async function main() {
  const db = await getDb();
  if (!db) {
    console.error('MONGODB_URI not set; cannot create indexes.');
    process.exit(1);
  }

  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('orders').createIndex({ orderId: 1 }, { unique: true });
  await db.collection('orders').createIndex({ idempotencyKey: 1 }, { unique: true, sparse: true });
  await db.collection('orders').createIndex({ createdAt: -1 });

  console.log('Indexes created');
  const client = await getClient();
  if (client) await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
