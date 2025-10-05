'use server';

/**
 * @fileOverview An AI agent that provides shopping advice based on the items in the cart and the user's budget.
 *
 * - shoppingCartAdvisor - A function that generates shopping advice.
 * - ShoppingCartAdvisorInput - The input type for the shoppingCartAdvisor function.
 * - ShoppingCartAdvisorOutput - The return type for the shoppingCartAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShoppingCartItemSchema = z.object({
  id: z.string().describe('The ID of the product.'),
  name: z.string().describe('The name of the product.'),
  price: z.number().describe('The price of the product.'),
  quantity: z.number().describe('The quantity of the product in the cart.'),
});

const ShoppingCartAdvisorInputSchema = z.object({
  items: z.array(ShoppingCartItemSchema).describe('The items in the shopping cart.'),
  budget: z.number().describe('The user budget.'),
});

export type ShoppingCartAdvisorInput = z.infer<typeof ShoppingCartAdvisorInputSchema>;

const ShoppingCartAdvisorOutputSchema = z.object({
  advice: z.string().describe('AI-generated advice based on the items in the cart and the user budget.'),
});

export type ShoppingCartAdvisorOutput = z.infer<typeof ShoppingCartAdvisorOutputSchema>;

export async function shoppingCartAdvisor(input: ShoppingCartAdvisorInput): Promise<ShoppingCartAdvisorOutput> {
  return shoppingCartAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shoppingCartAdvisorPrompt',
  input: {
    schema: ShoppingCartAdvisorInputSchema,
  },
  output: {
    schema: ShoppingCartAdvisorOutputSchema,
  },
  prompt: `You are a shopping advisor. Based on the items in the cart and the user's budget,
you will provide advice to the user to make informed shopping decisions.

Here are the items in the cart:
{{#each items}}
- {{name}} (Quantity: {{quantity}}, Price: {{price}})
{{/each}}

User's budget: {{budget}}

Provide specific and actionable advice. If the cart exceeds the budget, suggest items to remove. If the cart is well within budget, suggest complementary items.
`,
});

const shoppingCartAdvisorFlow = ai.defineFlow(
  {
    name: 'shoppingCartAdvisorFlow',
    inputSchema: ShoppingCartAdvisorInputSchema,
    outputSchema: ShoppingCartAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
