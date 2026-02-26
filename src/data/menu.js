export const categorias = [
  { id: 'clasicas',     label: 'Arepas Clásicas',      emoji: '🫓' },
  { id: 'especiales',   label: 'Arepas Especiales',     emoji: '🌟' },
  { id: 'desgranadas',  label: 'Arepas Desgranadas',    emoji: '🌽' },
  { id: 'chicharronas', label: 'Arepas Chicharronas',   emoji: '🐷' },
  { id: 'hamburguesas', label: 'Arepas Hamburguesa',    emoji: '🍔' },
  { id: 'parrilla',     label: 'Parrilla',              emoji: '🥩' },
  { id: 'delicias',     label: 'Delicias de mi Tierra', emoji: '🍲' },
  { id: 'frias',        label: 'Bebidas Frías',         emoji: '🍹' },
  { id: 'calientes',    label: 'Bebidas Calientes',     emoji: '☕' },
  { id: 'adicionales',  label: 'Adicionales',           emoji: '➕' },
]

export const productos = [
  // AREPAS CLÁSICAS
  { id: 'ac1', cat: 'clasicas',     nombre: 'Arepa Clásica',                   desc: 'Queso Costeño y Mantequilla',                                                                                                                         precio: 14000, emoji: '🫓',     badge: 'Clásica' },
  { id: 'ac2', cat: 'clasicas',     nombre: 'Pollo + Queso',                   desc: 'Combinación de pollo desmechado con queso costeño',                                                                                                   precio: 18000, emoji: '🫓🍗' },
  { id: 'ac3', cat: 'clasicas',     nombre: 'Aguacate + Queso',                desc: 'Puré de aguacate fresco con queso costeño',                                                                                                           precio: 18000, emoji: '🫓🥑' },
  { id: 'ac4', cat: 'clasicas',     nombre: 'Carne + Queso',                   desc: 'Carne desmechada con queso costeño',                                                                                                                  precio: 18000, emoji: '🫓🥩' },
  { id: 'ac5', cat: 'clasicas',     nombre: 'Chorizo BBQ + Queso',             desc: 'Chorizo en salsa BBQ con queso costeño',                                                                                                              precio: 18000, emoji: '🫓🌭' },
  { id: 'ac6', cat: 'clasicas',     nombre: 'Carne + Aguacate + Queso',        desc: 'Carne desmechada, aguacate y queso costeño',                                                                                                          precio: 20500, emoji: '🫓' },
  { id: 'ac7', cat: 'clasicas',     nombre: 'Carne + Chorizo + Queso',         desc: 'Carne desmechada, chorizo BBQ y queso costeño',                                                                                                       precio: 20500, emoji: '🫓' },
  { id: 'ac8', cat: 'clasicas',     nombre: 'Pollo + Chorizo + Aguacate + Queso', desc: 'Combinación completa: pollo, chorizo, aguacate y queso',                                                                                          precio: 23000, emoji: '🫓🌟' },

  // AREPAS ESPECIALES
  { id: 'ae1', cat: 'especiales',   nombre: 'Ocañerisima',                     desc: 'Carne, pollo, chorizo BBQ, tocineta, maduro, maíz desgranado, salchicha ranchera, queso mozarella, queso costeño y salsas (tartara y piña)',          precio: 30000, emoji: '🌟',    badge: 'Especial', img: '/images/pinar-del-rio.png' },
  { id: 'ae2', cat: 'especiales',   nombre: 'Mega Especial',                   desc: 'Pollo en cuadritos, camarones, palmitos, champiñones, maíz desgranado, cebolla y pimentón salteados, queso mozarella fundido, queso costeño y salsas', precio: 33500, emoji: '👑',    badge: 'Especial' },
  { id: 'ae3', cat: 'especiales',   nombre: 'Caribeña',                        desc: 'Camarones al ajillo, pollo en cuadritos, champiñones, cebolla ocañera, salsa de la casa, queso mozarella y costeño',                                  precio: 30000, emoji: '🌊' },
  { id: 'ae4', cat: 'especiales',   nombre: 'Marinera',                        desc: 'Lomitos de atún en aceite de oliva, palmitos al ajillo, champiñones, maíz desgranado, cebolla, tomate, queso mozarella y costeño',                    precio: 30000, emoji: '🐟' },
  { id: 'ae5', cat: 'especiales',   nombre: 'Full Arepa',                      desc: 'Carne, pollo, chorizo BBQ, maíz desgranado, huevo de codorniz, aguacate y queso costeño',                                                             precio: 27000, emoji: '🫓💪' },
  { id: 'ae6', cat: 'especiales',   nombre: 'Ropa Vieja',                      desc: 'Carne desmechada con huevo, cebolla, pimentón en julianas y queso costeño',                                                                           precio: 27000, emoji: '🍳' },
  { id: 'ae7', cat: 'especiales',   nombre: 'Montañera',                       desc: 'Maduro frito, maíz desgranado, chorizo paisa en salsa BBQ, carne desmechada en salsa criolla y queso costeño',                                        precio: 27000, emoji: '⛰️' },
  { id: 'ae8', cat: 'especiales',   nombre: 'Napolitana',                      desc: 'Pollo, tocineta, champiñones salteados, salsa napolitana y queso costeño',                                                                             precio: 25000, emoji: '🍅' },
  { id: 'ae9', cat: 'especiales',   nombre: 'Jalapeña',                        desc: 'Carne desmechada, frijol refrito, maíz desgranado, pimentón, jalapeños, guacamole y queso costeño',                                                   precio: 25000, emoji: '🌶️' },

  // AREPAS DESGRANADAS
  { id: 'ad1', cat: 'desgranadas',  nombre: 'Ocañerisimo Desgranado',          desc: '200gr de maíz con lomito fino de res, pechuga de pollo, salchicha ranchera, queso mozarella fundido, huevo de codorniz, salsa tartara y piña. Con Arepa Ocañera', precio: 33500, emoji: '🌽🌟', badge: 'Desgranado' },
  { id: 'ad2', cat: 'desgranadas',  nombre: 'Carnivoro',                       desc: '200gr de maíz con carne y pollo en salsa criolla, chorizo BBQ, queso mozarella, huevo de codorniz, tartara y piña. Con Arepa Ocañera',               precio: 30000, emoji: '🌽🥩' },
  { id: 'ad3', cat: 'desgranadas',  nombre: 'Napolitano Desgranado',           desc: '200gr de maíz con pollo desmechado, champiñones y tocineta en salsa napolitana, queso mozarella, huevo de codorniz. Con Arepa Ocañera',               precio: 28000, emoji: '🌽🍅' },

  // AREPAS CHICHARRONAS
  { id: 'ach1', cat: 'chicharronas', nombre: 'Marranita',                      desc: 'Trocitos de chicharrón artesanal, puré de aguacate y queso costeño',                                                                                  precio: 27500, emoji: '🐷',    badge: 'Chicharrona' },
  { id: 'ach2', cat: 'chicharronas', nombre: 'Cerdísima',                      desc: 'Carne de cerdo, chicharrón artesanal, puré de aguacate, maíz desgranado, trocitos de maduro y fusión de quesos',                                       precio: 32500, emoji: '🐷🧀' },
  { id: 'ach3', cat: 'chicharronas', nombre: 'Chicharrona',                    desc: 'Carne desmechada, trocitos de chicharrón artesanal, puré de aguacate y queso costeño',                                                                 precio: 30000, emoji: '🐷🥩' },

  // AREPAS HAMBURGUESA
  { id: 'ah1', cat: 'hamburguesas', nombre: 'Burger Estoraques',               desc: 'Carne de res, filete de pechuga, camarón, tocineta, champiñones, queso mozarella, queso costeño, salsas y verduras',                                  precio: 33500, emoji: '🍔🌊', badge: 'Hamburguesa' },
  { id: 'ah2', cat: 'hamburguesas', nombre: 'Burger Torcoroma',                desc: 'Carne de res, filete de pechuga, tocineta, queso costeño, salsas y verduras',                                                                          precio: 30000, emoji: '🍔' },
  { id: 'ah3', cat: 'hamburguesas', nombre: 'Burger Montañera',                desc: 'Carne de res, tocineta, chorizo BBQ, maíz desgranado, maduro, queso costeño, mozarella, salsas y verduras',                                            precio: 30000, emoji: '🍔⛰️' },
  { id: 'ah4', cat: 'hamburguesas', nombre: 'Burger Ranchera',                 desc: 'Carne de res, huevos rancheros (tocineta, salchicha y tomate), queso costeño, salsas y verduras',                                                       precio: 30000, emoji: '🍔🤠' },
  { id: 'ah5', cat: 'hamburguesas', nombre: 'Burguer de mi Tierra',            desc: 'Carne de res, tocineta, queso costeño, salsas y verduras',                                                                                             precio: 24000, emoji: '🍔🏡' },

  // PARRILLA
  { id: 'p1', cat: 'parrilla',      nombre: 'Piquete Juan Vaca',               desc: '300gr chatas o costillas BBQ asadas, pechuga, 5 chorizos BBQ, chicharrón artesanal, 2 arepas ocañeras, bollo de mazorca, cebollitas y hogao. ¡Incluye 2 granizadas de naranja!', precio: 65000, emoji: '🥩🔥', badge: 'Compartir' },
  { id: 'p2', cat: 'parrilla',      nombre: 'Tradicional Ocañerisimo',         desc: 'Caldo con huevos en leche, chatas asadas a la parrilla con chimichurri, Arepa Ocañera queso y cebollitas ocañeras. (+$4.000 caldo de costilla adicional)', precio: 46000, emoji: '🍳🫓', badge: 'Desayuno' },
  { id: 'p3', cat: 'parrilla',      nombre: 'Costillitas de Cerdo BBQ',        desc: 'Horneadas y bañadas en salsa BBQ, acompañadas de Arepa Ocañera clásica de mantequilla y queso',                                                          precio: 36000, emoji: '🐖🔥' },
  { id: 'p4', cat: 'parrilla',      nombre: 'Típico Ocañero',                  desc: '300gr de chatas asadas a la parrilla con chimichurri, ensalada, cebollitas ocañeras y Arepa Ocañera con queso y mantequilla',                            precio: 38000, emoji: '🥩🌿' },
  { id: 'p5', cat: 'parrilla',      nombre: 'Pechuga Gratinada',               desc: '350gr de pechuga a la parrilla, gratinada con queso y tocineta. Acompañada de Arepa Ocañera con queso y mantequilla',                                    precio: 34000, emoji: '🍗🧀' },
  { id: 'p6', cat: 'parrilla',      nombre: 'Chorizos BBQ con Arepa Ocañera',  desc: '5 chorizos asados bañados en salsa BBQ con semillas de ajonjolí, con Arepa Ocañera rellena de queso',                                                    precio: 24000, emoji: '🌭🔥' },

  // DELICIAS DE MI TIERRA
  { id: 'd1',  cat: 'delicias',     nombre: 'Caldo de Huevo',                  desc: 'Caldo de huevo en leche, acompañado de Arepa Ocañera con mantequilla y queso',                                                                          precio: 24000, emoji: '🍲' },
  { id: 'd2',  cat: 'delicias',     nombre: 'Caldo de Costilla',               desc: 'Caldo de costilla acompañado de Arepa Ocañera con mantequilla y queso',                                                                                 precio: 26000, emoji: '🍖',    badge: 'Popular' },
  { id: 'd3',  cat: 'delicias',     nombre: 'Caldo de Pollo',                  desc: 'Caldo de pollo (pierna pernil) acompañado con Arepa Ocañera de mantequilla y queso',                                                                     precio: 24000, emoji: '🍗🍲' },
  { id: 'd4',  cat: 'delicias',     nombre: 'Bollos de Mazorca',               desc: 'Envuelto de pura mazorca con corazón de queso costeño',                                                                                                  precio: 7000,  emoji: '🌽🧀' },
  { id: 'd5',  cat: 'delicias',     nombre: 'Porción de Chorizos',             desc: '4 chorizos asados en salsa BBQ',                                                                                                                          precio: 9500,  emoji: '🌭' },
  { id: 'd6',  cat: 'delicias',     nombre: 'Huevitos de Codorniz',            desc: 'Porción de 10 huevos de codorniz en salsa rosada, tocineta y queso mozarella',                                                                           precio: 8500,  emoji: '🥚' },
  { id: 'd7',  cat: 'delicias',     nombre: 'Papas a la Francesa',             desc: 'Deliciosas papas a la francesa (260gr) con queso costeño rayado',                                                                                        precio: 9500,  emoji: '🍟' },
  { id: 'd8',  cat: 'delicias',     nombre: 'Salchipapa',                      desc: '260gr de papas a la francesa, 2 salchichas tipo americana, queso costeño, tártara y piña',                                                               precio: 19000, emoji: '🍟🌭' },
  { id: 'd9',  cat: 'delicias',     nombre: 'Pan Ocañero Bolsa x5',            desc: '5 unidades de pan ocañero artesanal',                                                                                                                     precio: 4500,  emoji: '🍞' },
  { id: 'd10', cat: 'delicias',     nombre: 'Cebollitas Ocañeras',             desc: 'Frasco por 500ml de cebollitas ocañeras artesanales',                                                                                                     precio: 10000, emoji: '🧅' },

  // BEBIDAS FRÍAS
  { id: 'bf1',  cat: 'frias',       nombre: 'Limonada de Panela',              desc: 'Jarra completa: $17.500 · Media jarra: $11.000 · Vaso: $5.000',                                                                                          precio: 5000,  emoji: '🍋',    badge: 'Jarra disponible',
    variantes: [{ label: 'Vaso', precio: 5000 }, { label: 'Media Jarra', precio: 11000 }, { label: 'Jarra', precio: 17500 }] },
  { id: 'bf2',  cat: 'frias',       nombre: 'Limonada de Comunera',            desc: 'Jarra: $20.000 · Media: $14.000 · Vaso: $8.500',                                                                                                          precio: 8500,  emoji: '🍋💛',
    variantes: [{ label: 'Vaso', precio: 8500 }, { label: 'Media Jarra', precio: 14000 }, { label: 'Jarra', precio: 20000 }] },
  { id: 'bf3',  cat: 'frias',       nombre: 'Limonada de Hierbabuena',         desc: 'Jarra: $20.000 · Media: $14.000 · Vaso: $8.500',                                                                                                          precio: 8500,  emoji: '🍋🌿',
    variantes: [{ label: 'Vaso', precio: 8500 }, { label: 'Media Jarra', precio: 14000 }, { label: 'Jarra', precio: 20000 }] },
  { id: 'bf4',  cat: 'frias',       nombre: 'Limonada Cerezada',               desc: 'Jarra: $23.000 · Media: $16.000 · Vaso: $9.500',                                                                                                          precio: 9500,  emoji: '🍒🍋',
    variantes: [{ label: 'Vaso', precio: 9500 }, { label: 'Media Jarra', precio: 16000 }, { label: 'Jarra', precio: 23000 }] },
  { id: 'bf5',  cat: 'frias',       nombre: 'Limonada de Coco',                desc: 'Jarra: $23.000 · Media: $16.000 · Vaso: $9.500',                                                                                                          precio: 9500,  emoji: '🥥🍋',
    variantes: [{ label: 'Vaso', precio: 9500 }, { label: 'Media Jarra', precio: 16000 }, { label: 'Jarra', precio: 23000 }] },
  { id: 'bf6',  cat: 'frias',       nombre: 'Granizada',                       desc: 'Mandarina, naranja, limón o maracuyá. Jarra: $20.000 · Media: $14.000 · Vaso: $8.500',                                                                   precio: 8500,  emoji: '🧊🍊', badge: 'Jarra disponible',
    variantes: [{ label: 'Vaso', precio: 8500 }, { label: 'Media Jarra', precio: 14000 }, { label: 'Jarra', precio: 20000 }],
    sabores: ['Mandarina', 'Naranja', 'Limón', 'Maracuyá'] },
  { id: 'bf7',  cat: 'frias',       nombre: 'Jugo en Agua',                    desc: 'Guanábana, fresa, lulo o mango. Jarra: $20.000 · Media: $14.000 · Vaso: $8.500',                                                                         precio: 8500,  emoji: '🥤',
    variantes: [{ label: 'Vaso', precio: 8500 }, { label: 'Media Jarra', precio: 14000 }, { label: 'Jarra', precio: 20000 }],
    sabores: ['Guanábana', 'Fresa', 'Lulo', 'Mango'] },
  { id: 'bf8',  cat: 'frias',       nombre: 'Jugo en Leche',                   desc: 'Guanábana, fresa, lulo o mango. Jarra: $23.000 · Media: $16.000 · Vaso: $9.500',                                                                         precio: 9500,  emoji: '🥛🥤',
    variantes: [{ label: 'Vaso', precio: 9500 }, { label: 'Media Jarra', precio: 16000 }, { label: 'Jarra', precio: 23000 }],
    sabores: ['Guanábana', 'Fresa', 'Lulo', 'Mango'] },
  { id: 'bf9',  cat: 'frias',       nombre: 'Cerveza Nacional',                desc: 'Club, Águila, Light o Poker',                                                                                                                             precio: 5500,  emoji: '🍺' },
  { id: 'bf10', cat: 'frias',       nombre: 'Cerveza Importada',               desc: 'Corona o Estella',                                                                                                                                        precio: 7500,  emoji: '🍻' },
  { id: 'bf11', cat: 'frias',       nombre: 'Coronita',                        desc: '',                                                                                                                                                        precio: 5500,  emoji: '👑🍺' },
  { id: 'bf12', cat: 'frias',       nombre: 'Gaseosa Personal 400ml',          desc: '',                                                                                                                                                        precio: 5000,  emoji: '🥤' },
  { id: 'bf13', cat: 'frias',       nombre: 'Gaseosa 1.5L',                    desc: '',                                                                                                                                                        precio: 10000, emoji: '🥤' },
  { id: 'bf14', cat: 'frias',       nombre: 'Mr. Tea Personal',                desc: '',                                                                                                                                                        precio: 5000,  emoji: '🧋' },
  { id: 'bf15', cat: 'frias',       nombre: 'Agua sin gas / con gas',          desc: '',                                                                                                                                                        precio: 5000,  emoji: '💧' },

  // BEBIDAS CALIENTES
  { id: 'bc1', cat: 'calientes',    nombre: 'Chocolate y Pan Ocañero',         desc: 'Delicioso chocolate caliente con pan ocañero artesanal',                                                                                                  precio: 6000,  emoji: '☕🍞', badge: 'Caliente' },
  { id: 'bc2', cat: 'calientes',    nombre: 'Café con Leche y Pan Ocañero',    desc: '',                                                                                                                                                        precio: 5000,  emoji: '☕' },
  { id: 'bc3', cat: 'calientes',    nombre: 'Café Negro y Pan Ocañero',        desc: '',                                                                                                                                                        precio: 4000,  emoji: '☕' },
  { id: 'bc4', cat: 'calientes',    nombre: 'Agua de Panela y Pan Ocañero',    desc: '',                                                                                                                                                        precio: 4000,  emoji: '🍵' },

  // ADICIONALES
  { id: 'add1',  cat: 'adicionales', nombre: 'Maduro Frito en Trocitos',       desc: 'Porción de maduro frito caramelizado',                                                                                                                    precio: 5000,  emoji: '🍌' },
  { id: 'add2',  cat: 'adicionales', nombre: 'Maíz Dulce Desgranado',          desc: '',                                                                                                                                                        precio: 5000,  emoji: '🌽' },
  { id: 'add3',  cat: 'adicionales', nombre: 'Frijol Refrito',                 desc: '',                                                                                                                                                        precio: 4000,  emoji: '🫘' },
  { id: 'add4',  cat: 'adicionales', nombre: 'Puré de Aguacate',               desc: '',                                                                                                                                                        precio: 5000,  emoji: '🥑' },
  { id: 'add5',  cat: 'adicionales', nombre: 'Queso Costeño',                  desc: '',                                                                                                                                                        precio: 6000,  emoji: '🧀' },
  { id: 'add6',  cat: 'adicionales', nombre: 'Queso Mozarella',                desc: 'Porción extra de queso mozarella fundido',                                                                                                                precio: 6000,  emoji: '🧀🫠' },
  { id: 'add7',  cat: 'adicionales', nombre: 'Champiñones',                    desc: '',                                                                                                                                                        precio: 6000,  emoji: '🍄' },
  { id: 'add8',  cat: 'adicionales', nombre: 'Tocineta',                       desc: 'Porción de tocineta crujiente',                                                                                                                           precio: 6000,  emoji: '🥓' },
  { id: 'add9',  cat: 'adicionales', nombre: 'Pollo Desmechado',               desc: '',                                                                                                                                                        precio: 7000,  emoji: '🐓' },
  { id: 'add10', cat: 'adicionales', nombre: 'Carne Desmechada',               desc: '',                                                                                                                                                        precio: 7000,  emoji: '🥩' },
  { id: 'add11', cat: 'adicionales', nombre: 'Chorizo en Rodajas BBQ',         desc: '',                                                                                                                                                        precio: 7000,  emoji: '🌭' },
  { id: 'add12', cat: 'adicionales', nombre: 'Chicharrón Frito Artesanal',     desc: '',                                                                                                                                                        precio: 9000,  emoji: '🐷' },
]

export const banners = [
  {
    id: 1,
    tag: '⭐ Lo más pedido',
    titulo: 'Arepa Ocañerisima',
    subtexto: 'Nuestra estrella — desde $30.000',
    emoji: '🫓',
    gradient: 'linear-gradient(135deg, #C8334A 0%, #8B1A2E 100%)',
  },
  {
    id: 2,
    tag: '🔥 Parrilla',
    titulo: 'Piquete Juan Vaca',
    subtexto: 'El combo más completo — $65.000',
    emoji: '🥩',
    gradient: 'linear-gradient(135deg, #7B3F00 0%, #5C3317 100%)',
  },
  {
    id: 3,
    tag: '❄️ Refrescante',
    titulo: 'Granizadas & Limonadas',
    subtexto: 'Jarras desde $17.500',
    emoji: '🍹',
    gradient: 'linear-gradient(135deg, #1a6b3a 0%, #0d4225 100%)',
  },
  {
    id: 4,
    tag: '🆕 Nuevo',
    titulo: 'Arma tu Quesudita',
    subtexto: 'Elige tus 7 ingredientes — $33.500',
    emoji: '🧀',
    gradient: 'linear-gradient(135deg, #5C3317 0%, #2C1A0E 100%)',
  },
]
