
import { PlaceHolderImages } from './placeholder-images';
import type { Product } from '@/types';

const getImage = (id: string) => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    return {
      imageUrl: 'https://placehold.co/600x400',
      imageHint: 'placeholder image',
    };
  }
  return { imageUrl: img.imageUrl, imageHint: img.imageHint };
};

const shoeColors = [
      { colorName: 'Black', imageUrl: 'https://picsum.photos/seed/shoe-black/50/50' },
      { colorName: 'Beige', imageUrl: 'https://picsum.photos/seed/shoe-beige/50/50' },
      { colorName: 'Brown', imageUrl: 'https://picsum.photos/seed/shoe-brown/50/50' },
      { colorName: 'Light Brown', imageUrl: 'https://picsum.photos/seed/shoe-light-brown/50/50' },
      { colorName: 'Gray', imageUrl: 'https://picsum.photos/seed/shoe-gray/50/50' },
      { colorName: 'Blue', imageUrl: 'https://picsum.photos/seed/shoe-blue/50/50' },
      { colorName: 'White', imageUrl: 'https://picsum.photos/seed/shoe-white/50/50' },
];

const allSizes = [
    'M10.5 - W11.5', 'M10 - W11', 'M11.5 - W12.5', 'M11 - W12', 'M12.5 - W13.5',
    'M12 - W13', 'M13 - W14', 'M4.5 - W5.5', 'M4 - W5', 'M5.5 - W6.5',
    'M5 - W6', 'M6.5 - W7.5', 'M6 - W7', 'M7.5 - W8.5', 'M7 - W8',
    'M8.5 - W9.5', 'M8 - W9', 'M9.5 - W10.5'
];

export const ivoryMen: Product[] = [
    { id: 'ivory_001', name: 'The Core Purity Tee', price: '₹1,999', priceAsNumber: 1999, category: "T-Shirts", imageUrl: '/products/ivory/1.png', imageHint: 'white crewneck t-shirt', gender: 'Men', color: 'White', tagline: 'The Clean Slate of Style.', description: 'Plain white crewneck T-shirt displayed neatly on a mannequin.' },
    { id: 'ivory_002', name: 'Meridian Polo', price: '₹2,499', priceAsNumber: 2499, category: "T-Shirts", imageUrl: '/products/ivory/2.png', imageHint: 'white polo shirt', gender: 'Men', color: 'White', tagline: 'Crisp Comfort, Refined Edge.', description: 'White/light grey polo shirt with button placket detail.' },
    { id: 'ivory_003', name: 'The Cloud Knit Pullover', price: '₹4,999', priceAsNumber: 4999, category: "Sweaters", imageUrl: '/products/ivory/3.png', imageHint: 'off-white crewneck sweater', gender: 'Men', color: 'White', tagline: 'Lightness in Every Layer.', description: 'A thick, off-white crewneck sweater or sweatshirt.' },
    { id: 'ivory_004', name: 'The Ghosted Zenith Hoodie', price: '₹5,999', priceAsNumber: 5999, category: "Hoodies", imageUrl: '/products/ivory/4.png', imageHint: 'light grey oversized hoodie', gender: 'Unisex', color: 'Grey', tagline: 'Quiet Strength, Total Comfort.', description: 'Light grey oversized hoodie with the hood up, shown on a mannequin.' },
    { id: 'ivory_005', name: 'The Frost V-Neck', price: '₹3,199', priceAsNumber: 3199, category: "Sweaters", imageUrl: '/products/ivory/5.png', imageHint: 'light grey v-neck sweater', gender: 'Men', color: 'Grey', tagline: 'Subtle Texture, Seamless Style.', description: 'A light grey/off-white V-neck sweater with a soft, visible knit texture.' },
    { id: 'ivory_006', name: 'The Summit Overshirt', price: '₹4,599', priceAsNumber: 4599, category: "Jackets", imageUrl: '/products/ivory/6.png', imageHint: 'white casual jacket', gender: 'Men', color: 'White', tagline: 'Rugged Feel, Bright Finish.', description: 'A white/light casual jacket or heavy overshirt, likely denim or canvas.' },
    { id: 'ivory_007', name: 'The Essential Broadcloth', price: '₹2,999', priceAsNumber: 2999, category: "Shirts", imageUrl: '/products/ivory/7.png', imageHint: 'white dress shirt', gender: 'Men', color: 'White', tagline: 'The Foundation of Formality.', description: 'A classic white button-up dress shirt with a structured collar.' },
    { id: 'ivory_008', name: 'The Linen Horizon Shirt', price: '₹3,799', priceAsNumber: 3799, category: "Shirts", imageUrl: '/products/ivory/8.png', imageHint: 'white linen shirt', gender: 'Men', color: 'White', tagline: 'Effortless Vacation Vibe.', description: 'A relaxed, white linen or casual cotton button-up shirt.' },
    { id: 'ivory_009', name: 'The Modernist Blazer', price: '₹7,999', priceAsNumber: 7999, category: "Blazers", imageUrl: '/products/ivory/9.png', imageHint: 'white blazer', gender: 'Men', color: 'White', tagline: 'Sharp Lines, Clean Impact.', description: 'A formal white or light-colored blazer hanging on a hanger.' },
    { id: 'ivory_010', name: 'The Undisclosed Graphic Tee', price: '₹2,299', priceAsNumber: 2299, category: "T-Shirts", imageUrl: '/products/ivory/10.png', imageHint: 'white graphic t-shirt', gender: 'Men', color: 'White', tagline: 'Art That Speaks Softly.', description: 'A white T-shirt featuring a subtle, abstract photographic graphic centered on the chest.' },
];

export const urbanEdgeSneakers: Product[] = [
    { 
      id: 'ue_001', name: 'URBAN EDGE BLACKCHROME', price: '₹14,000', priceAsNumber: 14000, 
      tagline: 'Weather-ready icon for the elements.',
      category: "Unisex Sportstyle Shoes", imageUrl: '/products/urban-edge/gallery-1.jpg', imageHint: 'beige sneaker', 
      gallery: [
        '/products/urban-edge/gallery-1.jpg',
        '/products/urban-edge/gallery-2.jpg',
        '/products/urban-edge/gallery-3.jpg',
        '/products/urban-edge/gallery-4.jpg',
      ],
      gender: 'Unisex', sizes: allSizes.slice(0, 8), color: 'Brown', waterproofness: 'GORE-TEX', lacingSystem: 'Quicklace®',
      description: 'The URBAN EDGE BLACKCHROME is a weather-ready icon for the elements. Featuring an innovative ePE membrane, PFC-free materials, and a durable build, it offers superior protection against the elements. Its GORE-TEX technology ensures your feet stay dry and comfortable, no matter the conditions.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Synthetic / Textile' }, { name: 'Weight', value: '359 g' }
      ],
      rating: 5,
      reviews: [{author: 'Alex', rating: 5, comment: 'Incredible waterproofing. Perfect for trails.'}]
    },
    { 
      id: 'ue_002', name: 'Urban Edge LuminaStride', price: '₹12,600', priceAsNumber: 12600, 
      tagline: 'Gradient-shifting tribute to nature.',
      category: "Unisex Sneakers", isNew: true, imageUrl: '/products/UB/LuminaStride.jpg', imageHint: 'black neon sneaker', 
      gender: 'Unisex', sizes: allSizes.slice(5, 12), color: 'Black', waterproofness: 'None', lacingSystem: 'Quicklace®',
      description: 'The Urban Edge LuminaStride features a gradient-shifting design that pays tribute to the natural world. Its lightweight construction and specialized chassis provide stability and cushioning for any adventure, making it a stylish and functional choice for urban explorers.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Synthetic / Textile' }, { name: 'Weight', value: '365 g' }
      ],
      rating: 4,
      reviews: [{author: 'Sam', rating: 4, comment: 'Love the colors, very unique.'}]
    },
    { 
      id: 'ue_003', name: 'Urban Edge Velocity Runner', price: '₹12,600', priceAsNumber: 12600, 
      tagline: 'Conquer the Concrete.',
      category: "Unisex Sportstyle Shoes", imageUrl: '/products/UB/Velocity Runner.jpg', imageHint: 'yellow purple sneaker', 
      gender: 'Unisex', sizes: allSizes.slice(2, 10), color: 'Yellow', waterproofness: 'None', lacingSystem: 'Regular laces',
      description: 'The Urban Edge Velocity Runner is designed for speed and agility. Its responsive foam midsole and lightweight upper provide the perfect combination of cushioning and support for your fastest runs. The durable outsole offers excellent traction on both wet and dry surfaces.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Synthetic / Textile' }, { name: 'Weight', value: '280 g' }
      ],
      rating: 5,
      reviews: []
    },
    { 
      id: 'ue_004', name: 'Urban Edge AeroGlide', price: '₹12,600', priceAsNumber: 12600, 
      tagline: 'Effortless Flow.',
      category: "Unisex Sportstyle Shoes", imageUrl: '/products/UB/AeroGlide.jpg', imageHint: 'white grey sneaker', 
      gender: 'Men', sizes: allSizes.slice(8, 15), color: 'White', waterproofness: 'None', lacingSystem: 'Regular laces',
      description: 'Experience a smooth ride with the Urban Edge AeroGlide. The advanced cushioning system absorbs impact, while the breathable upper keeps your feet cool and comfortable. Ideal for long-distance runners seeking maximum comfort.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Synthetic / Textile' }, { name: 'Weight', value: '320 g' }
      ],
      rating: 4,
      reviews: []
    },
    { 
      id: 'ue_005', name: 'Urban Edge TerraFlex', price: '₹12,600', priceAsNumber: 12600, 
      tagline: 'Built for Any Terrain.',
      category: "Unisex Sportstyle Shoes", imageUrl: '/products/UB/TerraFlex.jpg', imageHint: 'dark grey sneaker', 
      gender: 'Men', sizes: allSizes.slice(4, 11), color: 'Grey', waterproofness: 'None', lacingSystem: 'Quicklace®',
      description: 'The Urban Edge TerraFlex is your go-to shoe for off-road adventures. Its rugged outsole provides superior grip on uneven terrain, while the reinforced upper protects your feet from rocks and debris. Get ready to explore with confidence.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Synthetic / Textile' }, { name: 'Weight', value: '380 g' }
      ],
      rating: 5,
      reviews: []
    },
    { 
      id: 'ue_006', name: 'Urban Edge SynthWave', price: '₹12,600', priceAsNumber: 12600, 
      tagline: 'Future on Your Feet.',
      category: "Unisex Sportstyle Shoes", isNew: true, imageUrl: '/products/UB/SynthWave.jpg', imageHint: 'black purple sneaker', 
      gender: 'Women', sizes: allSizes.slice(0, 5), color: 'Purple', waterproofness: 'None', lacingSystem: 'Quicklace®',
      description: 'Step into the future with the Urban Edge SynthWave. This shoe features a bold, retro-futuristic design with vibrant colors and a chunky sole. It\'s not just about looks—the advanced cushioning provides all-day comfort.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Synthetic / Textile' }, { name: 'Weight', value: '340 g' }
      ],
      rating: 4,
      reviews: []
    },
    { 
      id: 'ue_007', name: 'Urban Edge Core Classic', price: '₹11,900', priceAsNumber: 11900, 
      tagline: 'Everyday Essential.',
      category: "Unisex Sportstyle Shoes", isNew: true, imageUrl: '/products/UB/Core Classic.jpg', imageHint: 'brown orange sneaker', 
      gender: 'Women', sizes: allSizes.slice(3, 9), color: 'Orange', waterproofness: 'None', lacingSystem: 'Regular laces',
      description: 'The Urban Edge Core Classic is a timeless sneaker that belongs in every wardrobe. Its clean, minimalist design pairs well with any outfit, while the premium materials and comfortable fit make it perfect for everyday wear.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Leather / Textile' }, { name: 'Weight', value: '365 g' }
      ],
      rating: 5,
      reviews: []
    },
    { 
      id: 'ue_008', name: 'Urban Edge Metropolitan Loafer', price: '₹12,600', priceAsNumber: 12600, 
      tagline: 'Refined Urbanity.',
      category: "Unisex Sportstyle Shoes", imageUrl: '/products/UB/Metropolitan Loafer.jpg', imageHint: 'light grey sneaker', 
      gender: 'Unisex', sizes: allSizes.slice(6, 14), color: 'White', waterproofness: 'GORE-TEX', lacingSystem: 'Regular laces',
      description: 'The Urban Edge Metropolitan Loafer combines the comfort of a sneaker with the sophisticated look of a loafer. Its waterproof GORE-TEX lining and sleek design make it the perfect shoe for navigating the city in style, no matter the weather.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Textile' }, { name: 'Weight', value: '330 g' }
      ],
      rating: 4,
      reviews: []
    },
    { 
      id: 'ue_009', name: 'Urban Edge Trailblazer Boot', price: '₹14,000', priceAsNumber: 14000, 
      tagline: 'Explore Your City.',
      category: "Unisex Sportstyle Shoes", imageUrl: '/products/UB/Trailblazer Boot.jpg', imageHint: 'black leather sneaker', 
      gender: 'Men', sizes: allSizes.slice(9, 17), color: 'Black', waterproofness: 'None', lacingSystem: 'Regular laces',
      description: 'The Urban Edge Trailblazer Boot is built for the modern explorer. It combines the durability of a hiking boot with the style of a high-top sneaker. The premium leather upper and rugged outsole provide both comfort and traction for all your urban adventures.',
      specifications: [
        { name: 'Inlay sole', value: 'Textile' }, { name: 'Lining', value: 'Textile' }, { name: 'Outsole', value: 'Rubber' }, { name: 'Upper', value: 'Leather' }, { name: 'Weight', value: '450 g' }
      ],
      rating: 5,
      reviews: []
    },
];

export const femmeEdge: Product[] = [
    { id: 'femme_edge_001', name: 'Folded Formalist', price: '₹2,799', priceAsNumber: 2799, tagline: 'Precision in Presentation.', category: 'Shirts', imageUrl: '/products/femme/1.png', imageHint: 'white dress shirt', gender: 'Men', description: 'A neatly folded crisp white dress shirt with a classic collar and front pocket, ready for wear.' },
    { id: 'femme_edge_002', name: 'Contoured Executive', price: '₹3,499', priceAsNumber: 3499, tagline: 'Power Sleeves, Soft Finish.', category: 'Tops', imageUrl: '/products/femme/2.png', imageHint: 'white high-collared shirt', gender: 'Women', description: 'A female model wearing a white, high-collared shirt with pronounced shoulder details, tucked into cream-colored corduroy trousers.' },
    { id: 'femme_edge_003', name: 'Sculpted Rib Turtleneck', price: '₹4,199', priceAsNumber: 4199, tagline: 'Autumnal Texture, Modern Hue.', category: 'Sweaters', imageUrl: '/products/femme/3.png', imageHint: 'ribbed turtleneck sweater', gender: 'Women', description: 'A female model in a ribbed, form-fitting turtleneck sweater in a warm nude/tan color, styled with a wide leather belt.' },
    { id: 'femme_edge_004', name: 'Sunset Crop Top', price: '₹1,999', priceAsNumber: 1999, tagline: 'Radiance in Ribbing.', category: 'Tops', imageUrl: '/products/femme/4.png', imageHint: 'orange crop top', gender: 'Women', description: 'A female model in an orange, off-the-shoulder ribbed crop top with a visible belly piercing, outdoors with soft lighting.' },
    { id: 'femme_edge_005', name: 'Metro Slim Trouser', price: '₹3,899', priceAsNumber: 3899, tagline: 'Sharp Crease, All-Day Comfort.', category: 'Bottoms', imageUrl: '/products/femme/5.png', imageHint: 'slim-fit trousers', gender: 'Men', description: 'A pair of men\'s white/cream slim-fit trousers, shown on a model without a top, styled with dark sandals.' },
    { id: 'femme_edge_006', name: 'Explorer Utility Shirt', price: '₹3,199', priceAsNumber: 3199, tagline: 'Pockets for the Journey.', category: 'Shirts', imageUrl: '/products/femme/6.png', imageHint: 'white utility shirt', gender: 'Men', description: 'A male model wearing a white utility shirt with two prominent chest pockets and rolled-up sleeves, over a dark undershirt.' },
    { id: 'femme_edge_007', name: 'Seaside Stripe Dress', price: '₹4,499', priceAsNumber: 4499, tagline: 'Effortless Midday Chic.', category: 'Dresses', imageUrl: '/products/femme/7.png', imageHint: 'striped midi dress', gender: 'Women', description: 'A female model in a navy and white horizontal striped midi dress with short sleeves, posing casually in an indoor, bohemian-style setting.' },
    { id: 'femme_edge_008', name: 'Riviera Plissé Shirt', price: '₹3,399', priceAsNumber: 3399, tagline: 'Textured Flow, Tropical Feel.', category: 'Shirts', imageUrl: '/products/femme/8.png', imageHint: 'white plissé shirt', gender: 'Men', description: 'A male model wearing a white, long-sleeve shirt with vertical plissé (pleated) texture and black buttons, sleeves rolled to the forearms.' },
    { id: 'femme_edge_009', name: 'Essential Ivory Tee', price: '₹1,799', priceAsNumber: 1799, tagline: 'The Blank Canvas.', category: 'T-Shirts', imageUrl: '/products/femme/9.png', imageHint: 'off-white t-shirt', gender: 'Men', description: 'A male model wearing a plain, off-white crewneck T-shirt and light pants, with sunglasses and one hand in his pocket.' },
    { id: 'femme_edge_010', name: 'Abstract Block Tee', price: '₹2,199', priceAsNumber: 2199, tagline: 'Graphic Message, Soft Delivery.', category: 'T-Shirts', imageUrl: '/products/femme/10.png', imageHint: 'white graphic tee', gender: 'Men', description: 'A male model wearing a white T-shirt featuring a subtle, abstract photographic graphic centered on the chest.' },
    { id: 'femme_edge_011', name: 'Heritage Plaid Blazer', price: '₹7,599', priceAsNumber: 7599, tagline: 'Classic Check, Modern Cut.', category: 'Blazers', imageUrl: '/products/femme/11.png', imageHint: 'plaid blazer', gender: 'Women', description: 'A female model wearing an oversized, brown and black plaid blazer over a black turtleneck, giving a structured, vintage look.' },
    { id: 'femme_edge_012', name: 'Teal V-Neck Polo', price: '₹2,599', priceAsNumber: 2599, tagline: 'Rich Color, Sporty Trim.', category: 'Tops', imageUrl: '/products/femme/12.png', imageHint: 'teal polo shirt', gender: 'Women', description: 'A female model wearing a cropped, teal/dark green polo shirt with white contrast trim on the collar and sleeves.' }
];


export const products: Product[] = [
    {
    id: 'prod_001',
    name: 'URBAN EDGE SNEAKERS',
    price: '₹7,999',
    priceAsNumber: 7999,
    tagline: 'Step up your street style.',
    category: 'Footwear',
    imageUrl: '/products/Urban Edge Sneakers.png',
    imageHint: 'urban edge sneakers',
    gallery: [
        '/products/urban-edge/gallery-1.jpg',
        '/products/urban-edge/gallery-2.jpg',
        '/products/urban-edge/gallery-3.jpg',
        '/products/urban-edge/gallery-4.jpg',
    ],
    isNew: true,
    description: "Step up your street style with the Urban Edge Sneakers. Combining modern design with ultimate comfort, these sneakers are perfect for everyday wear. The durable sole and breathable materials ensure your feet stay comfortable all day long.",
    specifications: [
      { name: 'Upper', value: 'Breathable Mesh & Synthetic Overlays' },
      { name: 'Sole', value: 'Durable Rubber' },
      { name: 'Best For', value: 'Casual, Streetwear' },
    ],
    rating: 5,
    reviews: [
      { author: 'Rahul V.', rating: 5, comment: "Super comfortable and they look amazing!"},
    ]
  },
  {
    id: 'prod_002',
    name: 'Classic Leather Strap Watch',
    price: '₹15,999',
    priceAsNumber: 15999,
    tagline: 'Timeless elegance on your wrist.',
    category: 'Accessories',
    imageUrl: '/products/Classic Leather Strap Watch.jpg',
    imageHint: 'leather strap watch',
    gallery: [
        '/products/leather-watch/w1.jpg',
        '/products/leather-watch/w2.jpg',
        '/products/leather-watch/w3.jpg',
        '/products/leather-watch/w4.jpg',
    ],
    description: "A timeless piece that combines classic design with modern reliability. Featuring a genuine leather strap and a stainless steel case, this watch is the perfect accessory for any formal or casual occasion.",
    specifications: [
      { name: 'Case', value: 'Stainless Steel' },
      { name: 'Strap', value: 'Genuine Leather' },
      { name: 'Movement', value: 'Quartz' },
      { name: 'Water Resistance', value: '3 ATM' }
    ],
    rating: 5,
    reviews: []
  },
  {
    id: 'prod_003',
    name: 'Elegance Street Top',
    price: '₹12,499',
    priceAsNumber: 12499,
    tagline: 'Make a stunning entrance.',
    category: 'Womenswear',
    imageUrl: '/products/Elegance Evening Gown.jpg',
    imageHint: 'evening gown',
    gallery: [
        '/products/gown/g1.jpg',
        '/products/gown/g2.jpg',
        '/products/gown/g3.jpg',
        '/products/gown/g4.jpg',
    ],
    description: "Make a stunning entrance with the Elegance Street Top. This beautiful dress features a flattering silhouette and delicate detailing, perfect for any formal event, from weddings to gala dinners.",
    specifications: [
      { name: 'Material', value: 'Satin & Lace' },
      { name: 'Fit', value: 'Floor-length A-line' },
      { name: 'Care', value: 'Dry Clean Only' },
    ],
    rating: 5,
    reviews: []
  },
  {
    id: 'prod_004',
    name: 'Trendy Oversized Hoodie',
    price: '₹3,499',
    priceAsNumber: 3499,
    tagline: 'Comfort meets cool.',
    category: 'Streetwear',
    imageUrl: '/products/Trendy Oversized Hoodie.jpg',
    imageHint: 'oversized hoodie',
    gallery: [
        '/products/hoodie/h1.jpg',
        '/products/hoodie/h2.jpg',
        '/products/hoodie/h3.jpg',
        '/products/hoodie/h4.jpg',
    ],
    description: "Stay comfortable and stylish with our Trendy Oversized Hoodie. Made from a soft cotton blend, this hoodie is perfect for a relaxed, casual look. Its oversized fit provides extra comfort, making it a wardrobe essential.",
    specifications: [
      { name: 'Material', value: 'Cotton Blend' },
      { name: 'Fit', value: 'Oversized' },
      { name: 'Features', value: 'Drawstring Hood, Kangaroo Pocket' },
    ],
    rating: 4,
    reviews: []
  },
  {
    id: 'prod_005',
    name: 'Slim-Fit Formal Blazer',
    price: '₹8,999',
    priceAsNumber: 8999,
    tagline: 'Sharp, sophisticated, and stylish.',
    category: 'Menswear',
    imageUrl: '/products/Slim-Fit Formal Blazer.jpeg',
    imageHint: 'formal blazer',
    gallery: [
      '/products/Blazer/b1.jpg',
      '/products/Blazer/b2.jpg',
      '/products/Blazer/b3.jpg',
      '/products/Blazer/b4.jpg'
    ],
    isNew: true,
    description: "Elevate your formal look with this slim-fit blazer. Expertly tailored for a sharp silhouette, it's the perfect addition to your work or event wardrobe. Made from a premium fabric blend for comfort and durability.",
    specifications: [
      { name: 'Fit', value: 'Slim' },
      { name: 'Material', value: 'Polyester-Viscose Blend' },
      { name: 'Features', value: 'Notched Lapel, Two-button closure' },
    ],
    rating: 5,
    reviews: [
       { author: 'Vikram C.', rating: 5, comment: "Perfect fit and great quality material. Looks very premium."},
    ]
  },
];

export const streetStyleMen: Product[] = [
    {
    id: 'prod_006',
    name: 'City Scape Graphic Tee',
    price: '₹1,799',
    priceAsNumber: 1799,
    tagline: 'Wear the city vibe.',
    category: 'Streetwear',
    imageUrl: '/pages/street/men/st01.jpg',
    imageHint: 'men graphic tee',
    isNew: true,
    description: "Express your urban spirit with this City Scape Graphic Tee. Made from 100% soft cotton, it features a unique print of the city skyline.",
    specifications: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Fit', value: 'Regular' },
    ],
    rating: 4,
    reviews: []
  },
  {
    id: 'prod_007',
    name: 'Urban Cargo Pants',
    price: '₹3,999',
    priceAsNumber: 3999,
    tagline: 'Functionality meets fashion.',
    category: 'Streetwear',
    imageUrl: '/pages/street/men/st02.jpg',
    imageHint: 'men cargo pants',
    isNew: false,
    description: "These cargo pants are built for the urban explorer. With multiple pockets and a durable fabric, they are as practical as they are stylish.",
    specifications: [
      { name: 'Material', value: 'Cotton Twill' },
      { name: 'Fit', value: 'Relaxed' },
      { name: 'Pockets', value: '6' },
    ],
    rating: 5,
    reviews: []
  },
];

export const streetStyleWomen: Product[] = [
    {
    id: 'women_street_001',
    name: 'Oversized Graphic Tee',
    price: '₹1,899',
    priceAsNumber: 1899,
    tagline: 'Effortless street cred.',
    category: 'Streetwear',
    imageUrl: '/pages/street/women/st003.jpg',
    imageHint: 'women graphic tee',
    isNew: true,
    description: "A bold graphic tee with an oversized fit, perfect for a relaxed yet edgy look.",
    specifications: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Fit', value: 'Oversized' },
    ],
    rating: 4,
    reviews: []
  },
  {
    id: 'women_street_002',
    name: 'Ripped Baggy Jeans',
    price: '₹4,299',
    priceAsNumber: 4299,
    tagline: 'Comfortable and cool.',
    category: 'Streetwear',
    imageUrl: '/pages/street/women/st004.jpg',
    imageHint: 'women ripped jeans',
    isNew: false,
    description: "Channel the 90s with these comfortable, baggy jeans featuring stylish rips.",
    specifications: [
      { name: 'Material', value: 'Denim' },
      { name: 'Fit', value: 'Baggy' },
    ],
    rating: 5,
    reviews: []
  },
];

export const casualWearMen: Product[] = [
  { id: 'men_casual_001', name: 'Classic Crewneck T-Shirt', price: '₹999', priceAsNumber: 999, tagline: "A timeless wardrobe staple.", category: "Tops", imageUrl: '/pages/casual-wear/men/cas01.jpg', imageHint: 'men t-shirt' },
  { id: 'men_casual_002', name: 'Slim-Fit Chinos', price: '₹2,499', priceAsNumber: 2499, tagline: "Versatile and effortlessly stylish.", category: "Bottoms", imageUrl: '/pages/casual-wear/men/cas02.jpg', imageHint: 'men chinos' },
  { id: 'men_casual_003', name: 'Leather Loafers', price: '₹3,999', priceAsNumber: 3999, tagline: "Sophistication meets comfort.", category: "Shoes", imageUrl: '/pages/casual-wear/men/cas03.jpg', imageHint: 'men loafers' },
  { id: 'men_casual_004', name: 'Canvas Messenger Bag', price: '₹1,799', priceAsNumber: 1799, tagline: "Carry your essentials in style.", category: "Accessories", imageUrl: '/pages/casual-wear/men/cas04.jpg', imageHint: 'men messenger bag' },
  { id: 'men_casual_005', name: 'Denim Jacket', price: '₹3,299', priceAsNumber: 3299, tagline: "The perfect layering piece.", category: "Outfits", imageUrl: '/pages/casual-wear/men/cas05.jpg', imageHint: 'men denim jacket' },
];

export const casualWearWomen: Product[] = [
  { id: 'women_casual_001', name: 'Flowy Floral Dress', price: '₹2,999', priceAsNumber: 2999, tagline: "Bohemian chic for sunny days.", category: "Dresses", imageUrl: '/pages/casual-wear/women/cas001.jpg', imageHint: 'floral dress' },
  { id: 'women_casual_002', name: 'High-Waist Skinny Jeans', price: '₹2,199', priceAsNumber: 2199, tagline: "Your go-to for a perfect fit.", category: "Bottoms", imageUrl: '/pages/casual-wear/women/cas002.jpg', imageHint: 'women jeans' },
  { id: 'women_casual_003', name: 'White Canvas Sneakers', price: '₹1,999', priceAsNumber: 1999, tagline: "Timeless, versatile, and comfy.", category: "Shoes", imageUrl: '/pages/casual-wear/women/cas003.jpg', imageHint: 'white sneakers' },
  { id: 'women_casual_004', name: 'Leather Crossbody Bag', price: '₹2,499', priceAsNumber: 2499, tagline: "Chic and practical for on-the-go.", category: "Accessories", imageUrl: '/pages/casual-wear/women/cas004.jpg', imageHint: 'leather crossbody bag' },
  { id: 'women_casual_005', name: 'Striped Linen Shirt', price: '₹1,599', priceAsNumber: 1599, tagline: "Breezy, classic, and cool.", category: "Tops", imageUrl: '/pages/casual-wear/women/cas005.jpg', imageHint: 'linen shirt' },
  { id: 'women_casual_006', name: 'Gold Pendant Necklace', price: '₹5,999', priceAsNumber: 5999, tagline: "A touch of delicate elegance.", category: "Jewelry", imageUrl: '/pages/casual-wear/women/cas006.jpg', imageHint: 'gold necklace' },
];

export const workFormalMen: Product[] = [
    { id: 'men_formal_001', name: 'Classic Suit', price: '₹15,999', priceAsNumber: 15999, tagline: "Impeccably tailored for success.", category: "Suits", imageUrl: '/pages/work-formal/men/for01.jpg', imageHint: 'men suit' },
    { id: 'men_formal_002', name: 'Formal Shirt', price: '₹2,999', priceAsNumber: 2999, tagline: "Crisp, clean, and professional.", category: "Shirts", imageUrl: '/pages/work-formal/men/for02.jpg', imageHint: 'men formal shirt' },
    { id: 'men_formal_003', name: 'Leather Shoes', price: '₹4,999', priceAsNumber: 4999, tagline: "The foundation of a power look.", category: "Shoes", imageUrl: '/pages/work-formal/men/for03.jpg', imageHint: 'men formal shoes' },
    { id: 'men_formal_004', name: 'Silk Tie', price: '₹1,499', priceAsNumber: 1499, tagline: "A touch of classic refinement.", category: "Accessories", imageUrl: '/pages/work-formal/men/for04.jpg', imageHint: 'men tie' },
    { id: 'men_formal_005', name: 'Leather Belt', price: '₹1,999', priceAsNumber: 1999, tagline: "Polish your look.", category: "Accessories", imageUrl: '/pages/work-formal/men/for05.jpg', imageHint: 'men leather belt' },
];

export const workFormalWomen: Product[] = [
    { id: 'women_formal_001', name: 'Pencil Skirt', price: '₹3,499', priceAsNumber: 3499, tagline: "Sleek and sophisticated.", category: "Skirts", imageUrl: '/pages/work-formal/women/for001.jpg', imageHint: 'pencil skirt' },
    { id: 'women_formal_002', name: 'Blouse', price: '₹2,499', priceAsNumber: 2499, tagline: "Effortless professional elegance.", category: "Tops", imageUrl: '/pages/work-formal/women/for002.jpg', imageHint: 'women blouse' },
    { id: 'women_formal_003', name: 'Pumps', price: '₹3,999', priceAsNumber: 3999, tagline: "Elevate your office attire.", category: "Shoes", imageUrl: '/pages/work-formal/women/for003.jpg', imageHint: 'women pumps' },
    { id: 'women_formal_004', name: 'Tote Bag', price: '₹4,999', priceAsNumber: 4999, tagline: "Carry your ambition.", category: "Accessories", imageUrl: '/pages/work-formal/women/for004.jpg', imageHint: 'women tote bag' },
    { id: 'women_formal_005', name: 'Formal Blazer', price: '₹6,999', priceAsNumber: 6999, tagline: "Command the boardroom.", category: "Blazers", imageUrl: '/pages/work-formal/women/for005.jpg', imageHint: 'women blazer' },
];

export const partyEveningMen: Product[] = [
    { id: 'men_party_001', name: 'Velvet Blazer', price: '₹7,999', priceAsNumber: 7999, tagline: "Luxe and ready to celebrate.", category: "Blazers", imageUrl: '/pages/party-evening/men/par01.jpg', imageHint: 'men velvet blazer' },
    { id: 'men_party_002', name: 'Stylish Loafers', price: '₹5,499', priceAsNumber: 5499, tagline: "Dance the night away.", category: "Shoes", imageUrl: '/pages/party-evening/men/par02.jpg', imageHint: 'stylish loafers' },
    { id: 'men_party_003', name: 'Cufflinks', price: '₹2,499', priceAsNumber: 2499, tagline: "A subtle touch of class.", category: "Accessories", imageUrl: '/pages/party-evening/men/par03.jpg', imageHint: 'cufflinks' },
    { id: 'men_party_004', name: 'Designer Perfume', price: '₹6,499', priceAsNumber: 6499, tagline: "An unforgettable presence.", category: "Accessories", imageUrl: '/pages/party-evening/men/par04.jpg', imageHint: 'men perfume bottle' },
    { id: 'men_party_005', name: 'Stylish Shirt', price: '₹3,199', priceAsNumber: 3199, tagline: "Designed for the spotlight.", category: "Shirts", imageUrl: '/pages/party-evening/men/par05.jpg', imageHint: 'men party shirt' },
];

export const partyEveningWomen: Product[] = [
    { id: 'women_party_001', name: 'Cocktail Dress', price: '₹8,999', priceAsNumber: 8999, tagline: "The life of the party.", category: "Dresses", imageUrl: '/pages/party-evening/women/par001.jpg', imageHint: 'cocktail dress' },
    { id: 'women_party_002', name: 'Clutch', price: '₹3,499', priceAsNumber: 3499, tagline: "Your sparkling evening companion.", category: "Accessories", imageUrl: '/pages/party-evening/women/par002.jpg', imageHint: 'evening clutch' },
    { id: 'women_party_003', name: 'Stilettos', price: '₹4,999', priceAsNumber: 4999, tagline: "Stand tall, stand out.", category: "Shoes", imageUrl: '/pages/party-evening/women/par003.jpg', imageHint: 'stilettos' },
    { id: 'women_party_004', name: 'Statement Earrings', price: '₹2,999', priceAsNumber: 2999, tagline: "Bold and beautiful.", category: "Jewelry", imageUrl: '/pages/party-evening/women/par004.jpg', imageHint: 'statement earrings' },
    { id: 'women_party_005', name: 'Elegance Street Top', price: '₹12,999', priceAsNumber: 12999, tagline: "For a night to remember.", category: "Dresses", imageUrl: '/products/Elegance Evening Gown.jpg', imageHint: 'evening gown' },
];

export const ethnicWearMen: Product[] = [
    { id: 'men_ethnic_001', name: 'Royal Heritage Kurta Set', price: '₹4,999', priceAsNumber: 4999, tagline: "Traditional grace, modern fit.", category: "Ethnic Wear", imageUrl: '/products/Royal Heritage Kurta Set.jpeg', imageHint: 'men kurta' },
    { id: 'men_ethnic_002', name: 'Sherwani', price: '₹19,999', priceAsNumber: 19999, tagline: "Regal attire for special occasions.", category: "Ethnic Wear", imageUrl: '/pages/ethnic/men/eth01.jpg', imageHint: 'men sherwani' },
    { id: 'men_ethnic_003', name: 'Ethnic Jacket', price: '₹3,499', priceAsNumber: 3499, tagline: "A fusion of style and tradition.", category: "Ethnic Wear", imageUrl: '/pages/ethnic/men/eth02.jpg', imageHint: 'men ethnic jacket' },
    { id: 'men_ethnic_004', name: 'Juttis', price: '₹2,999', priceAsNumber: 2999, tagline: "Handcrafted heritage for your feet.", category: "Ethnic Wear", imageUrl: '/pages/ethnic/men/eth03.jpg', imageHint: 'men jutti' },
    { id: 'men_ethnic_005', name: 'Nehru Jacket', price: '₹4,599', priceAsNumber: 4599, tagline: "Sophisticated and versatile.", category: "Ethnic Wear", imageUrl: '/pages/ethnic/men/eth04.jpg', imageHint: 'men nehru jacket' },
];

export const ethnicWearWomen: Product[] = [
    { id: 'women_ethnic_001', name: 'Regal Silk Saree', price: '₹12,999', priceAsNumber: 12999, tagline: "Draped in elegance.", category: "Sarees", imageUrl: '/products/Regal Silk Saree.png', imageHint: 'woman saree' },
    { id: 'women_ethnic_002', name: 'Lehenga', price: '₹24,999', priceAsNumber: 24999, tagline: "A fairytale ensemble.", category: "Lehengas", imageUrl: '/pages/ethnic/women/eth001.jpg', imageHint: 'wedding lehenga' },
    { id: 'women_ethnic_003', name: 'Kurti', price: '₹2,199', priceAsNumber: 2199, tagline: "Comfortable and chic for every day.", category: "Kurtis", imageUrl: '/pages/ethnic/women/eth002.jpg', imageHint: 'women kurti' },
    { id: 'women_ethnic_004', name: 'Ethnic Jewelry', price: '₹7,999', priceAsNumber: 7999, tagline: "Adorn yourself in tradition.", category: "Jewelry", imageUrl: '/pages/ethnic/women/eth003.jpg', imageHint: 'indian jewelry' },
    { id: 'women_ethnic_005', name: 'Salwar Suit', price: '₹6,499', priceAsNumber: 6499, tagline: "Graceful and timeless.", category: "Kurtis", imageUrl: '/pages/ethnic/women/eth004.jpg', imageHint: 'salwar kameez' },
];

export const sportsActivewearMen: Product[] = [
    { id: 'men_sports_001', name: 'Track Pants', price: '₹2,499', priceAsNumber: 2499, tagline: "Move freely, train harder.", category: "Track Pants", imageUrl: '/pages/athl/men/at01.jpg', imageHint: 'men track pants' },
    { id: 'men_sports_002', name: 'Gym T-shirt', price: '₹1,299', priceAsNumber: 1299, tagline: "Stay cool and dry.", category: "Gym T-shirts", imageUrl: '/pages/athl/men/at02.jpg', imageHint: 'men gym shirt' },
    { id: 'men_sports_003', name: 'Running Shoes', price: '₹4,999', priceAsNumber: 4999, tagline: "Engineered for performance.", category: "Running Shoes", imageUrl: '/pages/athl/men/at03.jpg', imageHint: 'men running shoes' },
    { id: 'men_sports_004', name: 'Sports Watch', price: '₹8,999', priceAsNumber: 8999, tagline: "Track your progress.", category: "Accessories", imageUrl: '/pages/athl/men/at04.jpg', imageHint: 'men sports watch' },
    { id: 'men_sports_005', name: 'Performance Hoodie', price: '₹3,499', priceAsNumber: 3499, tagline: "For warm-ups and cool-downs.", category: "Hoodies", imageUrl: '/pages/athl/men/at05.jpg', imageHint: 'men sports hoodie' },
];

export const sportsActivewearWomen: Product[] = [
    { id: 'women_sports_001', name: 'High-Waist Leggings', price: '₹2,999', priceAsNumber: 2999, tagline: "Support and style in one.", category: "Leggings", imageUrl: '/pages/athl/women/at001.jpg', imageHint: 'women leggings' },
    { id: 'women_sports_002', name: 'Sports Bra', price: '₹1,799', priceAsNumber: 1799, tagline: "Maximum support, minimum distraction.", category: "Sports Bras", imageUrl: '/pages/athl/women/at002.jpg', imageHint: 'women sports bra' },
    { id: 'women_sports_003', name: 'Running Shoes', price: '₹4,599', priceAsNumber: 4599, tagline: "Cushioned for every stride.", category: "Running Shoes", imageUrl: '/pages/athl/women/at003.jpg', imageHint: 'women running shoes' },
    { id: 'women_sports_004', name: 'Fitness Band', price: '₹3,999', priceAsNumber: 3999, tagline: "Your personal fitness tracker.", category: "Accessories", imageUrl: '/pages/athl/women/at004.jpg', imageHint: 'fitness band' },
    { id: 'women_sports_005', name: 'Yoga Top', price: '₹1,999', priceAsNumber: 1999, tagline: "Breathe, stretch, and flow.", category: "Yoga Tops", imageUrl: '/pages/athl/women/at005.jpg', imageHint: 'women yoga top' },
];

export const accessoriesMen: Product[] = [
    { id: 'men_acc_001', name: 'Leather Wallet', price: '₹1,999', priceAsNumber: 1999, tagline: "Sleek, secure, and stylish.", category: "Accessories", imageUrl: '/pages/collections/men/ass01.jpg', imageHint: 'men wallet' },
    { id: 'men_acc_002', name: 'Vintage Aviator Sunglasses', price: '₹3,499', priceAsNumber: 3499, tagline: "Iconic style, timeless appeal.", category: "Accessories", imageUrl: '/products/Vintage Aviator Sunglasses.jpeg', imageHint: 'men aviator sunglasses' },
    { id: 'men_acc_003', name: 'Silver Wristband', price: '₹4,999', priceAsNumber: 4999, tagline: "A modern touch of elegance.", category: "Accessories", imageUrl: '/pages/collections/men/ass03.jpg', imageHint: 'men wristband' },
    { id: 'men_acc_004', name: 'Classic Leather Strap Watch', price: '₹12,999', priceAsNumber: 12999, tagline: "Precision and prestige.", category: "Accessories", imageUrl: '/products/Classic Leather Strap Watch.jpg', imageHint: 'men formal watch' },
    { id: 'men_acc_005', name: 'Scarf', price: '₹1,499', priceAsNumber: 1499, tagline: "Warmth and style combined.", category: "Accessories", imageUrl: '/pages/collections/men/ass05.jpg', imageHint: 'men scarf' },
];

export const accessoriesWomen: Product[] = [
    { id: 'women_acc_001', name: 'Designer Handbag', price: '₹9,999', priceAsNumber: 9999, tagline: "Luxury in your hands.", category: "Accessories", imageUrl: '/pages/collections/women/ass1.jpg', imageHint: 'designer handbag' },
    { id: 'women_acc_002', name: 'Cat-Eye Sunglasses', price: '₹3,199', priceAsNumber: 3199, tagline: "Feminine and fierce.", category: "Accessories", imageUrl: '/pages/collections/women/ass2.jpg', imageHint: 'cat eye sunglasses' },
    { id: 'women_acc_003', name: 'Silk Scarf', price: '₹2,499', priceAsNumber: 2499, tagline: "A versatile touch of luxury.", category: "Accessories", imageUrl: '/pages/collections/women/ass3.jpg', imageHint: 'silk scarf' },
    { id: 'women_acc_004', name: 'Diamond Necklace', price: '₹49,999', priceAsNumber: 49999, tagline: "Shine bright.", category: "Accessories", imageUrl: '/pages/collections/women/ass4.jpg', imageHint: 'diamond necklace' },
    { id: 'women_acc_005', name: 'Elegant Perfume', price: '₹5,999', priceAsNumber: 5999, tagline: "A scent of sophistication.", category: "Accessories", imageUrl: '/pages/collections/women/ass5.jpg', imageHint: 'perfume bottle' },
];

export const jewelry: Product[] = [
    { 
        id: 'jewel_001', 
        name: 'The Constellation Duo', 
        price: '₹8,999', 
        priceAsNumber: 8999, 
        tagline: "Your Guiding Light.", 
        category: "Jewelry", 
        imageUrl: '/products/jewel/1.png', 
        imageHint: 'star necklace earrings',
        description: "A delicate and modern set featuring a pendant necklace and matching stud earrings. The design centers on an eight-pointed star outline crafted in warm gold, with a cluster of small diamonds set at the core for subtle brilliance. The pendant hangs from a fine gold chain. This piece is perfect for everyday elegance.",
        specifications: [
            { name: 'Material', value: '925 Sterling Silver' },
            { name: 'Stone', value: 'Cubic Zirconia' },
            { name: 'Set Includes', value: 'Necklace and a pair of earrings' },
        ],
        rating: 5,
        reviews: [],
    },
    { 
        id: 'jewel_002', 
        name: 'The Sovereign Stream', 
        price: '₹12,499', 
        priceAsNumber: 12499, 
        tagline: "Legacy in Every Luminescence.", 
        category: "Jewelry", 
        imageUrl: '/products/jewel/2.png', 
        imageHint: 'waterfall diamond earrings',
        description: "A magnificent statement necklace and earring set, designed for formal events. The necklace features an intricate, curving design set with brilliant-cut diamonds in rose gold, culminating in a large, striking teardrop-shaped emerald at the center. The matching chandelier earrings mirror the design with twin emerald drops, set against a backdrop of flowing diamonds.",
        specifications: [
            { name: 'Material', value: 'Platinum Plated' },
            { name: 'Stone', value: 'Marquise-cut Simulated Diamonds' },
            { name: 'Type', value: 'Dangle Earrings' },
        ],
        rating: 5,
        reviews: [],
    },
    { 
        id: 'jewel_003', 
        name: 'The Verdant Muse Set', 
        price: '₹15,999', 
        priceAsNumber: 15999, 
        tagline: "Grounded in Luxury.", 
        category: "Jewelry", 
        imageUrl: '/products/jewel/3.png', 
        imageHint: 'emerald jewelry set',
        description: "A bold, art-deco inspired ensemble that includes a cuff bangle, a ring, a pendant necklace, and stud earrings. Each piece showcases a unique, fan-shaped inlay of green malachite with distinctive black stripes, set in polished gold. The cuff and ring are open-style, punctuated with small accent diamonds for a touch of sparkle.",
        specifications: [
            { name: 'Material', value: '18k Gold Plated' },
            { name: 'Main Stone', value: 'Lab-created Emerald' },
            { name: 'Accent Stones', value: 'Cubic Zirconia' },
        ],
        rating: 5,
        reviews: [],
    },
    { 
        id: 'jewel_004', 
        name: 'The Mariposa Flight', 
        price: '₹4,999', 
        priceAsNumber: 4999, 
        tagline: "Free to Shine.", 
        category: "Jewelry", 
        imageUrl: '/products/jewel/4.png', 
        imageHint: 'butterfly diamond ring',
        description: "A charming and airy necklace and stud earring set. Both the pendant and earrings feature a stylized butterfly design crafted from bright gold. The butterfly wings are created using expertly placed marquise and pear-shaped diamonds, giving the illusion of fluttering movement and exceptional sparkle. A fine, delicate chain completes the necklace.",
        specifications: [
            { name: 'Material', value: 'Rose Gold Plated' },
            { name: 'Stone', value: 'Simulated Diamonds' },
            { name: 'Style', value: 'Open Band Ring' },
        ],
        rating: 4,
        reviews: [],
    },
    { 
        id: 'jewel_005', 
        name: 'The Helios Chain', 
        price: '₹7,499', 
        priceAsNumber: 7499, 
        tagline: "Power and Polish.", 
        category: "Jewelry", 
        imageUrl: '/products/jewel/5.png', 
        imageHint: 'gold chain necklace',
        description: "A close-up shot highlighting a chunky, classic link bracelet in rich, polished yellow gold. The bracelet features wide, interlocking, rectangular links with rounded corners, giving it a substantial and luxurious feel. It is shown being worn with a clean, white blazer, emphasizing its powerful, high-fashion aesthetic.",
        specifications: [
            { name: 'Material', value: 'Gold Plated Stainless Steel' },
            { name: 'Style', value: 'Cuban Link Chain' },
            { name: 'Clasp', value: 'Box Clasp' },
        ],
        rating: 5,
        reviews: [],
    },
];
