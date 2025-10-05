import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

export async function GET() {
  // In a real app, you'd fetch this from a database.
  // Here, we're just returning our hardcoded data.
  return NextResponse.json(products);
}
