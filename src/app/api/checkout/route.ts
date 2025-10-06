
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/mongodb';
import { randomUUID } from 'crypto';

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number().min(1),
      price: z.number(),
    })
  ),
  total: z.number(),
  userId: z.string().optional(),
  user: z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
  }).optional(),
  discounts: z.array(z.object({ code: z.string(), amount: z.number() })).optional(),
  shippingAddress: z.object({
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  location: z.object({ lat: z.number(), lng: z.number() }).optional(),
});

// This is a simulated checkout endpoint.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Debug: log incoming body and idempotency header when running locally
    try {
      // eslint-disable-next-line no-console
      console.debug('API /api/checkout received', { body, headers: { idempotencyKey: request.headers.get('idempotency-key') } });
    } catch (e) {}

    // 1. Validate the incoming data
    const validation = checkoutSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid request body', errors: validation.error.errors },
        { status: 400 }
      );
    }
    
    // In a real app, you would process payment here with a service like Stripe,
    // and then save the order to a database.

    // Persist order to MongoDB if configured
    const db = await getDb();
    const idempotencyKey = (request.headers.get('idempotency-key') as string) || (body as any).idempotencyKey;
    const orderId = (body as any).orderId || randomUUID();

    const orderDoc = {
      orderId,
      idempotencyKey: idempotencyKey ?? null,
      items: validation.data.items,
      total: validation.data.total,
      userId: validation.data.userId ?? null,
      user: validation.data.user ?? null,
      discounts: validation.data.discounts ?? [],
      shippingAddress: validation.data.shippingAddress ?? null,
      location: validation.data.location ?? null,
      createdAt: new Date().toISOString(),
      status: 'created',
    };

    if (db) {
      const orders = db.collection('orders');
      if (idempotencyKey) {
        const existing = await orders.findOne({ idempotencyKey });
        if (existing) {
          return NextResponse.json({ message: 'Checkout already processed', orderId: existing.orderId });
        }
      }
      await orders.insertOne(orderDoc as any);
    } else {
      // Fallback: log when DB not configured
      console.log('DB not configured; order simulated:', orderDoc);
    }

    return NextResponse.json({ message: 'Checkout successful!', orderId });
  } catch (error: any) {
    console.error('Checkout failed:', error);
    return NextResponse.json(
      { message: 'An error occurred during checkout.' },
      { status: 500 }
    );
  }
}
