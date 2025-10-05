'use server';

/**
 * @fileOverview A customer support AI agent for the e-commerce store.
 *
 * - customerSupport - A function that handles customer queries.
 * - CustomerSupportInput - The input type for the customerSupport function.
 * - CustomerSupportOutput - The return type for the customerSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { products } from '@/lib/products';

const CustomerSupportInputSchema = z.object({
  query: z.string().describe("The user's question to the support agent."),
  imageDataUri: z.string().optional().describe(
      "An optional image of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CustomerSupportInput = z.infer<typeof CustomerSupportInputSchema>;

const CustomerSupportOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user query.').optional(),
  error: z.string().describe('An error message if the query failed.').optional(),
});
export type CustomerSupportOutput = z.infer<typeof CustomerSupportOutputSchema>;

const getProductInfo = ai.defineTool(
    {
      name: 'getProductInfo',
      description: 'Get information about available products based on a search query.',
      inputSchema: z.object({
        query: z.string().describe('A search query to find relevant products.'),
      }),
      outputSchema: z.array(
        z.object({
          name: z.string(),
          price: z.number(),
          category: z.string().optional(),
          isNew: z.boolean().optional(),
        })
      ),
    },
    async ({query}) => {
        const lowerCaseQuery = query.toLowerCase();
        const foundProducts = products.filter(p => 
            p.name.toLowerCase().includes(lowerCaseQuery) || 
            p.category?.toLowerCase().includes(lowerCaseQuery)
        );
        return foundProducts.map(({ name, priceAsNumber, category, isNew }) => ({ name, price: priceAsNumber, category, isNew }));
    }
);


export async function customerSupport(input: CustomerSupportInput): Promise<CustomerSupportOutput> {
  return customerSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerSupportPrompt',
  input: {
    schema: CustomerSupportInputSchema,
  },
  output: {
    schema: z.object({
        response: z.string().describe('The AI-generated response to the user query.'),
    }),
  },
  tools: [getProductInfo],
  prompt: `You are a friendly and helpful customer support assistant for an online store named 'Fashion Aura'.
Your goal is to answer user questions accurately and concisely.
You have access to product information and can answer questions about pricing, categories, and new arrivals.
If the user provides an image, use it to help identify the product they are asking about.
You can also answer general questions about shipping (it's free!), returns (they are accepted within 30 days), and order status (tell the user to check their account page).
Keep your answers brief and to the point.

User query: {{{query}}}
{{#if imageDataUri}}
User Image: {{media url=imageDataUri}}
{{/if}}
`,
});

const customerSupportFlow = ai.defineFlow(
  {
    name: 'customerSupportFlow',
    inputSchema: CustomerSupportInputSchema,
    outputSchema: CustomerSupportOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
        console.error('Error in customerSupportFlow:', error);
        return { error: 'The AI service is currently unavailable. Please try again later.' };
    }
  }
);
