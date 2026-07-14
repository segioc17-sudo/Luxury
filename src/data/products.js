const imageModules = import.meta.glob('../assets/products/*/*.{png,jpg,jpeg}', { eager: true });

const getImagePath = (filename, category) => {
  const normalized = String(filename);
  const assetKey = `../assets/products/${category}/${normalized}`;
  const module = imageModules[assetKey];
  return module?.default || '';
};

const fallbackImage = 'https://images.unsplash.com/photo-1521369909029-2afc2965a459?auto=format&fit=crop&w=900&q=80';

export const products = [
  {
    id: 1,
    name: 'Gorra 01',
    price: 49.99,
    image: getImagePath('Gorra1.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Silhouette streetwear con acabado premium.',
    inStock: true,
    tags: ['Bestseller']
  },
  {
    id: 2,
    name: 'Gorra 02',
    price: 39.99,
    image: getImagePath('Gorra2.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Tono neutro para looks de alto impacto.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 3,
    name: 'Gorra 03',
    price: 54.99,
    image: getImagePath('Gorra3.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Diseño refinado con actitud urbana.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 4,
    name: 'Gorra 04',
    price: 44.99,
    image: getImagePath('Gorra4.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Estilo oscuro con logo discreto.',
    inStock: true,
    tags: ['Limited']
  },
  {
    id: 5,
    name: 'Gorra 05',
    price: 42.99,
    image: getImagePath('Gorra5.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Diseño moderno con presencia urbana.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 6,
    name: 'Gorra 06',
    price: 47.99,
    image: getImagePath('Gorra6.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Versión premium para looks de alto impacto.',
    inStock: true,
    tags: ['Premium']
  },
  {
    id: 7,
    name: 'Gorra 07',
    price: 46.99,
    image: getImagePath('Gorra7.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Aporte de textura y alineación editorial.',
    inStock: true,
    tags: ['Editor']
  },
  {
    id: 8,
    name: 'Gorra 08',
    price: 41.99,
    image: getImagePath('Gorra8.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Minimalismo con un toque de street luxury.',
    inStock: true,
    tags: ['Essential']
  },
  {
    id: 9,
    name: 'Gorra 09',
    price: 43.99,
    image: getImagePath('Gorra9.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Perfil limpio y estilo contundente.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 10,
    name: 'Gorra 10',
    price: 48.99,
    image: getImagePath('Gorra10.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Apariencia sofisticada con actitud callejera.',
    inStock: true,
    tags: ['Luxury']
  },
  {
    id: 11,
    name: 'Gorra 11',
    price: 45.99,
    image: getImagePath('Gorra11.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Acabado premium para los looks más selectos.',
    inStock: true,
    tags: ['Limited']
  },
  {
    id: 12,
    name: 'Gorra 12',
    price: 50.99,
    image: getImagePath('Gorra12.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Más volumen, más actitud, más presencia.',
    inStock: true,
    tags: ['Exclusive']
  },
  {
    id: 13,
    name: 'Gorra 13',
    price: 51.99,
    image: getImagePath('Gorra13.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Diseño de alto standing para días especiales.',
    inStock: true,
    tags: ['Premium']
  },
  {
    id: 14,
    name: 'Gorra 14',
    price: 52.99,
    image: getImagePath('Gorra14.png', 'gorras') || fallbackImage,
    category: 'gorras',
    description: 'Cierre visual con un aire editorial y urbano.',
    inStock: true,
    tags: ['Luxury']
  },
  {
    id: 15,
    name: 'Pantalón Cargo Sand',
    price: 79.99,
    image: getImagePath('Pantalon1.png', 'pantalones') || fallbackImage,
    category: 'pantalones',
    description: 'Estilo utilitario con presencia de lujo.',
    inStock: true,
    tags: ['Essentials']
  },
  {
    id: 16,
    name: 'Pantalón Tailored Ash',
    price: 89.99,
    image: getImagePath('Pantalon2.png', 'pantalones') || fallbackImage,
    category: 'pantalones',
    description: 'Corte impecable para una propuesta más editorial.',
    inStock: true,
    tags: ['Editor']
  },
  {
    id: 17,
    name: 'Pantalón Noir Slim',
    price: 99.99,
    image: getImagePath('Pantalon3.png', 'pantalones') || fallbackImage,
    category: 'pantalones',
    description: 'Minimalismo oscuro con un toque de distinción.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 18,
    name: 'Pantalón Wide Black',
    price: 94.99,
    image: getImagePath('Pantalon4.png', 'pantalones') || fallbackImage,
    category: 'pantalones',
    description: 'Silueta relajada con exclusividad visual.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 19,
    name: 'Camisa Linen Ivory',
    price: 69.99,
    image: getImagePath('Canusa1.png', 'camisas') || fallbackImage,
    category: 'camisas',
    description: 'Tela ligera con un aire de alta costura urbana.',
    inStock: true,
    tags: ['Premium']
  },
  {
    id: 20,
    name: 'Camisa Midnight Blue',
    price: 74.99,
    image: getImagePath('Canusa2.png', 'camisas') || fallbackImage,
    category: 'camisas',
    description: 'Color profundo y corte de alto standing.',
    inStock: true,
    tags: ['Best Seller']
  },
  {
    id: 21,
    name: 'Camisa Rouge Atelier',
    price: 64.99,
    image: getImagePath('Canusa3.png', 'camisas') || fallbackImage,
    category: 'camisas',
    description: 'Impacto visual con un acabado muy fashion.',
    inStock: true,
    tags: ['Edition']
  },
  {
    id: 22,
    name: 'Camiseta Oversize Stone',
    price: 59.99,
    image: getImagePath('Canusa4.png', 'camisas') || fallbackImage,
    category: 'camisas',
    description: 'Perfecta para combinar con pantalones de corte amplio.',
    inStock: true,
    tags: ['New']
  }
];
