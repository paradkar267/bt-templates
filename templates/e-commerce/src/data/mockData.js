export const categories = [
  { id: 'fashion', name: 'Fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop' },
  { id: 'home', name: 'Home Goods', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop' }
];

export const products = [
  {
    id: 'p1',
    name: 'Cashmere Blend Overcoat',
    price: 395.00,
    originalPrice: 450.00,
    category: 'fashion',
    rating: 4.8,
    reviews: 124,
    stock: 12,
    isNew: true,
    colors: ['#000000', '#c4a173', '#4b5563'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A luxurious cashmere blend overcoat designed for the modern minimalists. Features a tailored fit, hidden placket, and premium Italian hardware.'
  },
  {
    id: 'p2',
    name: 'Linen Relaxed Shirt',
    price: 85.00,
    category: 'fashion',
    rating: 4.5,
    reviews: 89,
    stock: 45,
    isNew: false,
    colors: ['#ffffff', '#e5e5e5'],
    sizes: ['M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Breezy and lightweight, this 100% organic linen shirt is garment-dyed for a lived-in softness from day one.'
  },
  {
    id: 'p3',
    name: 'Minimalist Leather Watch',
    price: 195.00,
    category: 'accessories',
    rating: 4.9,
    reviews: 210,
    stock: 5,
    isNew: true,
    colors: ['#000000', '#8b4513'],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508656936551-7053e19c3b88?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Precision Swiss movement meets Scandinavian design. Features a genuine Italian leather strap and scratch-resistant sapphire crystal.'
  },
  {
    id: 'p4',
    name: 'Handcrafted Ceramic Vase',
    price: 65.00,
    category: 'home',
    rating: 4.7,
    reviews: 42,
    stock: 18,
    isNew: false,
    colors: ['#f5f5dc'],
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Wheel-thrown by master artisans, this minimalist vase features a unique matte glaze and sculptural silhouette.'
  },
  {
    id: 'p5',
    name: 'Premium Leather Tote',
    price: 250.00,
    originalPrice: 300.00,
    category: 'accessories',
    rating: 4.6,
    reviews: 156,
    stock: 22,
    isNew: false,
    colors: ['#000000', '#8b4513', '#d2b48c'],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Crafted from full-grain vegetable-tanned leather, this spacious tote only gets better with age. Includes a detachable laptop sleeve.'
  },
  {
    id: 'p6',
    name: 'Silk Blend Slip Dress',
    price: 145.00,
    category: 'fashion',
    rating: 4.8,
    reviews: 67,
    stock: 30,
    isNew: true,
    colors: ['#000000', '#ffc0cb', '#c4a173'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ef08ba37e5c9?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An effortlessly elegant midi dress cut from liquid-like silk charmeuse. Perfect for evening events or layered over a tee.'
  },
  {
    id: 'p7',
    name: 'Brushed Brass Table Lamp',
    price: 180.00,
    category: 'home',
    rating: 4.4,
    reviews: 28,
    stock: 0,
    isNew: false,
    colors: ['#ffd700'],
    sizes: ['Standard'],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Add a warm glow to any space. Solid brass construction with a dimmable LED element and frosted glass diffuser.'
  },
  {
    id: 'p8',
    name: 'Acetate Sunglasses',
    price: 120.00,
    category: 'accessories',
    rating: 4.9,
    reviews: 112,
    stock: 40,
    isNew: true,
    colors: ['#000000', '#a0522d'],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Vintage-inspired frames made from sustainable cellulose acetate. Features polarized lenses with 100% UV protection.'
  },
  {
    id: 'p9',
    name: 'Wool Throw Blanket',
    price: 110.00,
    originalPrice: 150.00,
    category: 'home',
    rating: 4.7,
    reviews: 84,
    stock: 15,
    isNew: false,
    colors: ['#e5e5e5', '#4b5563'],
    sizes: ['Large'],
    images: [
      'https://images.unsplash.com/photo-1580828369019-18ba4c1858a7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Woven in Scotland from pure virgin wool. Heavyweight, exceptionally warm, and finished with classic fringe edges.'
  },
  {
    id: 'p10',
    name: 'Textured Knit Sweater',
    price: 135.00,
    category: 'fashion',
    rating: 4.6,
    reviews: 53,
    stock: 25,
    isNew: true,
    colors: ['#f5f5dc', '#000000'],
    sizes: ['S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Chunky yet breathable cotton-merino blend. Features a unique waffle texture and relaxed drop-shoulder fit.'
  },
  {
    id: 'p11',
    name: 'Matte Black French Press',
    price: 45.00,
    category: 'home',
    rating: 4.8,
    reviews: 320,
    stock: 60,
    isNew: false,
    colors: ['#000000'],
    sizes: ['1 Liter'],
    images: [
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Double-walled stainless steel keeps coffee hot for hours. The fine mesh filter ensures a perfectly clean cup every time.'
  },
  {
    id: 'p12',
    name: 'Minimalist Cardholder',
    price: 35.00,
    category: 'accessories',
    rating: 4.5,
    reviews: 92,
    stock: 120,
    isNew: false,
    colors: ['#000000', '#8b4513', '#808080'],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Slim profile designed for front-pocket carry. Holds 4-6 cards and folded bills. Hand-stitched full-grain leather.'
  }
];
