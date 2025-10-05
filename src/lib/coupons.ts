
export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountValue: number; // Percentage
  minPurchase: number; // in INR
}

export const coupons: Coupon[] = [
    { 
        code: 'FLAT50', 
        title: "50% Off on Men’s & Women’s Clothing", 
        description: 'Get a flat 50% discount on all items in the Men & Women clothing categories. Minimum purchase of ₹3000.',
        discountValue: 50,
        minPurchase: 3000
    },
    { 
        code: 'B1G1ACC', 
        title: 'Buy 1 Get 1 Free on Accessories', 
        description: 'Add any two accessories to your cart and get the lower-priced one for free. Not valid on watches.',
        discountValue: 50, // Effectively 50% on two items
        minPurchase: 500
    },
    { 
        code: 'SEASON25', 
        title: '25% Off on Summer & Winter Collections', 
        description: 'Flat 25% off on all products from our seasonal summer and winter collections. No minimum purchase.',
        discountValue: 25,
        minPurchase: 0
    },
    { 
        code: 'FEST30', 
        title: '30% Off on Party & Evening Wear', 
        description: 'Get ready to party with a 30% discount on our entire Party & Evening wear collection. Minimum cart value of ₹4000.',
        discountValue: 30,
        minPurchase: 4000
    },
    { 
        code: 'STYLE20', 
        title: '20% Off Storewide', 
        description: 'Enjoy a 20% discount on your entire order. Minimum purchase of ₹2500 required.',
        discountValue: 20,
        minPurchase: 2500
    },
    { 
        code: 'NEW15', 
        title: '15% Off For New Users', 
        description: 'Welcome to Fashion Aura! Enjoy a 15% discount on your first order. No minimum purchase required.',
        discountValue: 15,
        minPurchase: 0
    },
    { 
        code: 'FREEBIE', 
        title: 'Free Gift on Orders Above ₹5000', 
        description: 'Receive a surprise free gift with every order over ₹5000.',
        discountValue: 0, // This is a special case, logic handled separately
        minPurchase: 5000
    },
    { 
        code: 'ETHNIC40', 
        title: '40% Off on Ethnic Wear', 
        description: 'Celebrate tradition with a 40% discount on all ethnic wear. Minimum purchase of ₹7000.',
        discountValue: 40,
        minPurchase: 7000
    },
];
