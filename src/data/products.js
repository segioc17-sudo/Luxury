const imageModules = import.meta.glob('../assets/products/*/*.{png,jpg,jpeg}');

export async function loadImage(category, filename) {
  const normalized = String(filename);
  const assetKey = `../assets/products/${category}/${normalized}`;
  const importer = imageModules[assetKey];
  if (!importer) return '';
  try {
    const mod = await importer();
    return mod?.default || '';
  } catch (e) {
    return '';
  }
}

export const fallbackImage = 'https://images.unsplash.com/photo-1521369909029-2afc2965a459?auto=format&fit=crop&w=900&q=80';

export const products = [
  {
    id: 1,
    name: 'Gorra 01',
    price: 49.99,
    image: { file: 'Gorra1.png', category: 'gorras' },
    category: 'gorras',
    description: 'Silhouette streetwear con acabado premium.',
    inStock: true,
    tags: ['Bestseller']
  },
  {
    id: 2,
    name: 'Gorra 02',
    price: 39.99,
    image: { file: 'Gorra2.png', category: 'gorras' },
    category: 'gorras',
    description: 'Tono neutro para looks de alto impacto.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 3,
    name: 'Gorra 03',
    price: 54.99,
    image: { file: 'Gorra3.png', category: 'gorras' },
    category: 'gorras',
    description: 'Diseño refinado con actitud urbana.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 4,
    name: 'Gorra 04',
    price: 44.99,
    image: { file: 'Gorra4.png', category: 'gorras' },
    category: 'gorras',
    description: 'Estilo oscuro con logo discreto.',
    inStock: true,
    tags: ['Limited']
  },
  {
    id: 5,
    name: 'Gorra 05',
    price: 42.99,
    image: { file: 'Gorra5.png', category: 'gorras' },
    category: 'gorras',
    description: 'Diseño moderno con presencia urbana.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 6,
    name: 'Gorra 06',
    price: 47.99,
    image: { file: 'Gorra6.png', category: 'gorras' },
    category: 'gorras',
    description: 'Versión premium para looks de alto impacto.',
    inStock: true,
    tags: ['Premium']
  },
  {
    id: 7,
    name: 'Gorra 07',
    price: 46.99,
    image: { file: 'Gorra7.png', category: 'gorras' },
    category: 'gorras',
    description: 'Aporte de textura y alineación editorial.',
    inStock: true,
    tags: ['Editor']
  },
  {
    id: 8,
    name: 'Gorra 08',
    price: 41.99,
    image: { file: 'Gorra8.png', category: 'gorras' },
    category: 'gorras',
    description: 'Minimalismo con un toque de street luxury.',
    inStock: true,
    tags: ['Essential']
  },
  {
    id: 9,
    name: 'Gorra 09',
    price: 43.99,
    image: { file: 'Gorra9.png', category: 'gorras' },
    category: 'gorras',
    description: 'Perfil limpio y estilo contundente.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 10,
    name: 'Gorra 10',
    price: 48.99,
    image: { file: 'Gorra10.png', category: 'gorras' },
    category: 'gorras',
    description: 'Apariencia sofisticada con actitud callejera.',
    inStock: true,
    tags: ['Luxury']
  },
  {
    id: 11,
    name: 'Gorra 11',
    price: 45.99,
    image: { file: 'Gorra11.png', category: 'gorras' },
    category: 'gorras',
    description: 'Acabado premium para los looks más selectos.',
    inStock: true,
    tags: ['Limited']
  },
  {
    id: 12,
    name: 'Gorra 12',
    price: 50.99,
    image: { file: 'Gorra12.png', category: 'gorras' },
    category: 'gorras',
    description: 'Más volumen, más actitud, más presencia.',
    inStock: true,
    tags: ['Exclusive']
  },
  {
    id: 13,
    name: 'Gorra 13',
    price: 51.99,
    image: { file: 'Gorra13.png', category: 'gorras' },
    category: 'gorras',
    description: 'Diseño de alto standing para días especiales.',
    inStock: true,
    tags: ['Premium']
  },
  {
    id: 14,
    name: 'Gorra 14',
    price: 52.99,
    image: { file: 'Gorra14.png', category: 'gorras' },
    category: 'gorras',
    description: 'Cierre visual con un aire editorial y urbano.',
    inStock: true,
    tags: ['Luxury']
  },
  {
    id: 15,
    name: 'Pantalón Cargo Sand',
    price: 79.99,
    image: { file: 'Pantalon1.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Estilo utilitario con presencia de lujo.',
    inStock: true,
    tags: ['Essentials']
  },
  {
    id: 16,
    name: 'Pantalón Tailored Ash',
    price: 89.99,
    image: { file: 'Pantalon2.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Corte impecable para una propuesta más editorial.',
    inStock: true,
    tags: ['Editor']
  },
  {
    id: 17,
    name: 'Pantalón Noir Slim',
    price: 99.99,
    image: { file: 'Pantalon3.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Minimalismo oscuro con un toque de distinción.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 18,
    name: 'Pantalón Wide Black',
    price: 94.99,
    image: { file: 'Pantalon4.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Silueta relajada con exclusividad visual.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 19,
    name: 'Camisa Linen Ivory',
    price: 69.99,
    image: { file: 'Canusa1.png', category: 'camisas' },
    category: 'camisas',
    description: 'Tela ligera con un aire de alta costura urbana.',
    inStock: true,
    tags: ['Premium']
  },
  {
    id: 20,
    name: 'Camisa Midnight Blue',
    price: 74.99,
    image: { file: 'Canusa2.png', category: 'camisas' },
    category: 'camisas',
    description: 'Color profundo y corte de alto standing.',
    inStock: true,
    tags: ['Best Seller']
  },
  {
    id: 21,
    name: 'Camisa Rouge Atelier',
    price: 64.99,
    image: { file: 'Canusa3.png', category: 'camisas' },
    category: 'camisas',
    description: 'Impacto visual con un acabado muy fashion.',
    inStock: true,
    tags: ['Edition']
  },
  {
    id: 22,
    name: 'Camiseta Oversize Stone',
    price: 59.99,
    image: { file: 'Canusa4.png', category: 'camisas' },
    category: 'camisas',
    description: 'Perfecta para combinar con pantalones de corte amplio.',
    inStock: true,
    tags: ['New']
  }
];
