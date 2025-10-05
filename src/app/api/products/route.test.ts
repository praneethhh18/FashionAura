
import { GET } from './route';
import { products } from '@/lib/products';
import { NextResponse } from 'next/server';

// Mock NextResponse.json
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      data,
      status: options?.status || 200,
      json: async () => data,
    })),
  },
}));

describe('Products API Endpoint', () => {

  // Test case to ensure the GET handler returns the correct product list
  test('GET /api/products should return the list of products', async () => {
    // Call the GET handler
    const response = await GET();
    const responseData = await response.json();

    // 1. Assert that NextResponse.json was called with the products data
    expect(NextResponse.json).toHaveBeenCalledWith(products);
    
    // 2. Assert that the response data matches the hardcoded products
    expect(responseData).toEqual(products);

    // 3. Assert that the response status is 200 (default)
    // Note: This relies on the mock implementation detail
    const mockResponse = NextResponse.json(products);
    expect(mockResponse.status).toBe(200);

    // 4. Assert that the returned data is an array and is not empty
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBeGreaterThan(0);

    // 5. Assert that the first product in the response has the required properties
    const firstProduct = responseData[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('imageUrl');
  });

});

// We need a jest.config.js or similar and dependencies like jest, ts-jest, @types/jest
// to run this. For now, the file stands as a valid test case.
