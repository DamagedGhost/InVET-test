import { useState, useEffect } from 'react';

// --- NUESTRA "BASE DE DATOS" INICIAL ---
// Esta es tu lista de productos original
// Se usará SOLO la primera vez que el usuario abra la app.
const rawProducts = [
  { 
    id: 1,
    codigo: 'GU-001',
    title: 'Guitarra Rosewood', 
    price: 45000, 
    stock: 15,
    stockCritico: 5,
    categoria: "Guitarras",
    image: 'https://audiomusicacl.vtexassets.com/arquivos/ids/192797/1-guitarra-acustica-vizcaya-con-cuerdas-de-nylon-arcg39-rb-207758.jpg?v=638556328914200000',
    miniatura1: 'https://audiomusicacl.vtexassets.com/arquivos/ids/192803-1200-auto?v=638556328978830000&width=1200&height=auto&aspect=true',
    miniatura2: 'https://audiomusicacl.vtexassets.com/arquivos/ids/192809-1200-auto?v=638556329040800000&width=1200&height=auto&aspect=true',
    descripcion: 'La Guitarra Rosewood es un instrumento de alta calidad, diseñado para ofrecer un sonido cálido y rico...'
  },
  { 
    id: 2,
    codigo: 'GU-002',
    title: 'Guitarra Electrica Blackout', 
    price: 55000, 
    stock: 10,
    stockCritico: 3,
    categoria: "Guitarras",
    image: 'https://ieebolivia.net/es/2981-home_default/guitarra-coronado-guitar-rosewood-fingerboard-black-0243000506.jpg',
    miniatura1: 'https://tmsmusic.co/cdn/shop/products/guitarra-electrica-fender-coronado-guitar-rosewood-fingerboard-black-the-music-site-1.jpg?v=1696261218&width=800',
    miniatura2: 'https://tmsmusic.co/cdn/shop/products/guitarra-electrica-fender-coronado-guitar-rosewood-fingerboard-black-the-music-site-2.jpg?v=1696261220&width=600',
    descripcion: 'Guitarra eléctrica Blackout con diseño moderno y sonido potente...'
  },
  { 
    id: 3,
    codigo: 'GU-003',
    title: 'Guitarra Electrica Black', 
    price: 50000, 
    stock: 12,
    stockCritico: 4,
    categoria: "Guitarras",
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQzH4snsv9Ozn7mGLOZRJ7bk7jmgPTliWrYYAIZl5mcEn2sKHL9',
    miniatura1: 'https://galerimusikindonesia.com/image/cache/data/gitar%20dan%20bass/Gitar%20Elektrik/gretsch/G5122DC%20Electromatic%20Hollowbody/gretsch-g5122dc-electromatic-hollowbody-a83897-700x700.jpg',
    miniatura2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Ksb7nRcWo5ccb9n1gI-mQ413CKe6WQRSMw&s',
    descripcion: 'Guitarra eléctrica Black con acabado elegante y componentes de alta calidad...'
  },
  { 
    id: 4,
    codigo: 'GU-004',
    title: 'Guitarra Electrica Turkey', 
    price: 37000, 
    stock: 18,
    stockCritico: 6,
    categoria: "Guitarras",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKmmQvzfGrCHEVG4YumP7UDnpaBXPaoV--EAuEAbhgp-2YmYWQOCQUcTfxPzfLUaxeQas&usqp=CAU',
    miniatura1: 'https://maneimport.com/wp-content/uploads/2021/10/G5622T3.jpg',
    miniatura2: 'https://http2.mlstatic.com/D_Q_NP_625773-MLA48210969935_112021-O.webp',
    descripcion: 'Guitarra eléctrica Turkey con diseño moderno y sonido potente...'
  },
  { 
    id: 5,
    codigo: 'TEC-001',
    title: 'Teclado Clasico', 
    price: 20000, 
    stock: 25,
    stockCritico: 10,
    categoria: "Teclados",
    image: 'https://casaroyal.vtexassets.com/arquivos/ids/162255/111977_1.jpg?v=638774932664670000',
    miniatura1: 'https://casaroyal.vtexassets.com/arquivos/ids/162258-1200-1200?v=638774932682000000&width=1200&height=1200&aspect=true',
    miniatura2: 'https://casaroyal.vtexassets.com/arquivos/ids/162257-1200-1200?v=638774932676400000&width=1200&height=1200&aspect=true',
    descripcion: 'El teclado clásico es un instrumento musical versátil y expresivo...'
  },
  { 
    id: 6,
    codigo: 'TEC-002',
    title: 'Teclado Clasico Red', 
    price: 25000, 
    stock: 20,
    stockCritico: 8,
    categoria: "Teclados",
    image: 'https://cdnx.jumpseller.com/mercurymusic/image/63154456/resize/1080/1080?1746481815',
    miniatura1: 'https://cdnx.jumpseller.com/mercurymusic/image/63154469/resize/1080/1080?1746481819',
    miniatura2: 'https://cdnx.jumpseller.com/mercurymusic/image/63154472/resize/1080/1080?1746481821',
    descripcion: 'Descubre el Teclado Clásico Red: perfecto para aprender y crear música...'
  },
  { 
    id: 7,
    codigo: 'BAT-001',
    title: 'Bateria Dark', 
    price: 80000, 
    stock: 8,
    stockCritico: 2,
    categoria: "Baterías",
    image: 'https://biomusic.cl/wp-content/uploads/2022/11/bateria-pearl-roadshow-jet-black-rs525scc-31-D_NQ_NP_691555-MPE31254699226_062019-F.jpeg',
    miniatura1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_HCtNRGyX5Mubvtw9HM1uK2NrlLzHNwOHiA&s',
    miniatura2: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_600,h_600/https://yaparu.com/wp-content/uploads/2022/05/EM-02143-2.jpg',
    descripcion: 'La Batería Dark es ideal para músicos que buscan potencia y estilo...'
  },
  { 
    id: 8,
    codigo: 'BAT-002',
    title: 'Bateria DarkWood', 
    price: 95000, 
    stock: 5,
    stockCritico: 2,
    categoria: "Baterías",
    image: 'https://alamomusical.com/wp-content/uploads/2020/10/a1-33.jpg',
    miniatura1: 'https://http2.mlstatic.com/D_NQ_NP_784632-MLA31592144602_072019-O.webp',
    miniatura2: 'https://http2.mlstatic.com/D_NQ_NP_758460-MLB77084437908_062024-O.webp',
    descripcion: 'La Batería DarkWood combina un diseño elegante con un sonido potente...'
  }
];

// Nombre de la "tabla" en localStorage
const DB_NAME = 'products';

// Función para cargar los productos desde localStorage
const loadProducts = () => {
  try {
    const data = localStorage.getItem(DB_NAME);
    if (data) {
      // Si ya hay datos en localStorage, úsalos
      return JSON.parse(data);
    } else {
      // Si no hay nada, carga los datos iniciales y guárdalos
      localStorage.setItem(DB_NAME, JSON.stringify(rawProducts));
      return rawProducts;
    }
  } catch (error) {
    console.error("Error al cargar productos de localStorage", error);
    return rawProducts; // Fallback a los datos iniciales
  }
};

// Hook principal que manejará el CRUD
const useProductsViewModel = () => {
  
  // El estado 'products' ahora se inicializa desde la función loadProducts
  const [products, setProducts] = useState(() => loadProducts());

  // Sincronizador: Escucha cambios en otras pestañas
  // (Esto es opcional pero muy útil si tienes la app abierta en dos ventanas)
  useEffect(() => {
    const syncData = (e) => {
      if (e.key === DB_NAME) {
        setProducts(JSON.parse(e.newValue || '[]'));
      }
    };
    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncData);
  }, []);

  // Función interna para guardar y actualizar el estado
  const _saveAndSet = (newProducts) => {
    localStorage.setItem(DB_NAME, JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  // --- FUNCIÓN CREATE ---
  const addProducto = (productoData) => {
    const newProduct = {
      ...productoData,
      id: Date.now(), // ID único basado en la fecha
      price: parseInt(productoData.price, 10),
      stock: parseInt(productoData.stock, 10),
      stockCritico: parseInt(productoData.stockCritico, 10),
      // Si el usuario no puso imagen, usa un placeholder
      image: productoData.image || 'https://via.placeholder.com/300x300.png?text=Sin+Imagen',
      miniatura1: 'https://via.placeholder.com/100x100.png',
      miniatura2: 'https://via.placeholder.com/100x100.png',
      descripcion: productoData.descripcion || 'Sin descripción.'
    };
    
    const updatedProducts = [...products, newProduct];
    _saveAndSet(updatedProducts);
  };

  // --- FUNCIÓN READ (Single) ---
  const getProductoById = (id) => {
    return products.find(p => p.id === id);
  };

  // --- FUNCIÓN UPDATE ---
  const updateProducto = (id, updatedData) => {
    // Asegurarse de que los números sean números
    const dataToSave = {
      ...updatedData,
      price: parseInt(updatedData.price, 10),
      stock: parseInt(updatedData.stock, 10),
      stockCritico: parseInt(updatedData.stockCritico, 10),
    };
    
    const updatedProducts = products.map(p => 
      p.id === id ? dataToSave : p
    );
    _saveAndSet(updatedProducts);
  };

  // --- FUNCIÓN DELETE ---
  const deleteProducto = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    _saveAndSet(updatedProducts);
  };

  // Exponemos los productos (READ all) y las funciones CRUD
  return { 
    products, 
    addProducto, 
    getProductoById, 
    updateProducto, 
    deleteProducto 
  };
};

export default useProductsViewModel;