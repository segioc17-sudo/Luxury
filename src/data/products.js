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
    name: 'Toronto Blue Beige',
    price: 60000,
    image: { file: 'Gorra1.png', category: 'gorras' },
    category: 'gorras',
    description: 'Silhouette streetwear con acabado premium.',
    inStock: true,
    tags: ['Bestseller']
  },
  {
    id: 2,
    name: 'Toronto Blue Jays',
    price: 60000,
    image: { file: 'Gorra2.png', category: 'gorras' },
    category: 'gorras',
    description: 'Tono neutro para looks de alto impacto.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 3,
    name: 'Champions Bulls',
    price: 40000,
    image: { file: 'Gorra3.png', category: 'gorras' },
    category: 'gorras',
    description: 'Diseño refinado con actitud urbana.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 4,
    name: 'Gorra Angels',
    price: 40000,
    image: { file: 'Gorra4.png', category: 'gorras' },
    category: 'gorras',
    description: 'Estilo oscuro con logo discreto.',
    inStock: false,
    tags: ['Limited']
  },
  {
    id: 5,
    name: 'Gorra Hoyas ',
    price: 70000,
    image: { file: 'Gorra5.png', category: 'gorras' },
    category: 'gorras',
    description: 'Diseño moderno con presencia urbana.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 6,
    name: 'Gorra los Angeles Dodgers Divine Symbols',
    price: 70000,
    image: { file: 'Gorra6.png', category: 'gorras' },
    category: 'gorras',
    description: 'Versión premium para looks de alto impacto.',
    inStock: false,
    tags: ['Premium']
  },
  {
    id: 7,
    name: 'Gorra Chicago White Sox MLB Classics',
    price: 55000,
    image: { file: 'Gorra7.png', category: 'gorras' },
    category: 'gorras',
    description: 'Aporte de textura y alineación editorial.',
    inStock: false,
    tags: ['Editor']
  },
  {
    id: 8,
    name: 'Gorra Angels diseño clasico',
    price: 70000,
    image: { file: 'Gorra8.png', category: 'gorras' },
    category: 'gorras',
    description: 'Minimalismo con un toque de street luxury.',
    inStock: false,
    tags: ['Essential']
  },
  {
    id: 9,
    name: 'Gorra York Yankees',
    price: 40000,
    image: { file: 'Gorra9.png', category: 'gorras' },
    category: 'gorras',
    description: 'Perfil limpio y estilo contundente.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 10,
    name: 'Gorra NIKE',
    price: 50000,
    image: { file: 'Gorra10.png', category: 'gorras' },
    category: 'gorras',
    description: 'Apariencia sofisticada con actitud callejera.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 11,
    name: 'Gorra York Yankees white',
    price: 60000,
    image: { file: 'Gorra11.png', category: 'gorras' },
    category: 'gorras',
    description: 'Acabado premium para los looks más selectos.',
    inStock: true,
    tags: ['Limited']
  },
  {
    id: 12,
    name: 'Gorra Mlb pittsburgh pirates',
    price: 50000,
    image: { file: 'Gorra12.png', category: 'gorras' },
    category: 'gorras',
    description: 'Más volumen, más actitud, más presencia.',
    inStock: false,
    tags: ['Exclusive']
  },
  {
    id: 13,
    name: 'Gorra Montreal Expos',
    price: 60000,
    image: { file: 'Gorra13.png', category: 'gorras' },
    category: 'gorras',
    description: 'Diseño de alto standing para días especiales.',
    inStock: false,
    tags: ['Premium']
  },
  {
    id: 14,
    name: 'Gorra As athletics',
    price: 50000,
    image: { file: 'Gorra14.png', category: 'gorras' },
    category: 'gorras',
    description: 'Cierre visual con un aire editorial y urbano.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 15,
    name: 'Nova men',
    price: 130000,
    image: { file: 'Pantalon1.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Estilo utilitario con presencia de lujo.',
    inStock: false,
    tags: ['Essentials']
  },
  {
    id: 16,
    name: 'Nova men',
    price: 120000,
    image: { file: 'Pantalon2.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Corte impecable para una propuesta más editorial.',
    inStock: false,
    tags: ['Editor']
  },
  {
    id: 17,
    name: 'Nova men',
    price: 130000,
    image: { file: 'Pantalon3.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Minimalismo oscuro con un toque de distinción.',
    inStock: false,
    tags: ['Luxury']
  },
  {
    id: 18,
    name: 'Nova men',
    price: 110000,
    image: { file: 'Pantalon4.png', category: 'pantalones' },
    category: 'pantalones',
    description: 'Silueta relajada con exclusividad visual.',
    inStock: false,
    tags: ['New']
  },
  {
    id: 19,
    name: 'philipp plein',
    price: 95000,
    image: { file: 'Canusa1.png', category: 'camisas' },
    category: 'camisas',
    description: 'Tela ligera con un aire de alta costura urbana.',
    inStock: true,
    tags: ['Premium']
  },
  {
    id: 20,
    name: 'philipp plein',
    price: 95000,
    image: { file: 'Canusa2.png', category: 'camisas' },
    category: 'camisas',
    description: 'Color profundo y corte de alto standing.',
    inStock: true,
    tags: ['Best Seller']
  },
  {
    id: 21,
    name: 'philipp plein',
    price: 95000,
    image: { file: 'Canusa3.png', category: 'camisas' },
    category: 'camisas',
    description: 'Impacto visual con un acabado muy fashion.',
    inStock: true,
    tags: ['Edition']
  },
  {
    id: 22,
    name: 'Hellstar',
    price: 90000,
    image: { file: 'Canusa4.png', category: 'camisas' },
    category: 'camisas',
    description: 'Perfecta para combinar con pantalones de corte amplio.',
    inStock: true,
    tags: ['New']
  },
  {
    id: 23,
    name: 'New York Yankees X2',
    price: 100000,
    originalPrice: 150000,
    image: { file: 'Gorra 15.png', category: 'gorras' },
    gallery: [
      { file: 'Gorra 15.png', category: 'gorras' },
      { file: 'Gorra 15b.png', category: 'gorras' },
      { file: 'Gorra 15c.png', category: 'gorras' }
    ],
    category: 'gorras',
    description: 'Pack premium 2x con descuento exclusivo.',
    inStock: true,
    tags: ['Descuento', 'Oferta'],
    isDiscount: true
  }
];
