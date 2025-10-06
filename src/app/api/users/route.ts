import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/mongodb';

const addressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal: z.string().optional(),
  country: z.string().optional(),
});

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  address: addressSchema.optional(),
  location: z.object({ lat: z.number(), lng: z.number() }).optional(),
  metadata: z.record(z.any()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid payload', errors: parsed.error.errors }, { status: 400 });
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json({ message: 'DB not configured' }, { status: 500 });
    }

    const users = db.collection('users');
    const existing = await users.findOne({ email: parsed.data.email });
    if (existing) return NextResponse.json({ ok: true, userId: existing._id }, { status: 200 });

    const userDoc = {
      email: parsed.data.email,
      name: parsed.data.name ?? null,
      phone: parsed.data.phone ?? null,
      address: parsed.data.address ?? null,
      location: parsed.data.location ?? null,
      metadata: parsed.data.metadata ?? {},
      createdAt: new Date().toISOString(),
    };

    const res = await users.insertOne(userDoc as any);
    return NextResponse.json({ ok: true, userId: res.insertedId }, { status: 201 });
  } catch (err) {
    console.error('User signup failed', err);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
