/**
 * Minecraft item registry.
 * icon: slug for https://minecraft.wiki/images/ItemSprite_{slug}.png?format=original
 * id: java material name (uppercase)
 */

export const MC_ITEMS = [
  // ─── Decoración / vetanas de vidrio
  { id: 'BLACK_STAINED_GLASS_PANE',   name: 'Cristal negro',         icon: 'black-stained-glass-pane',   cat: 'Decoración' },
  { id: 'GRAY_STAINED_GLASS_PANE',    name: 'Cristal gris',          icon: 'gray-stained-glass-pane',    cat: 'Decoración' },
  { id: 'WHITE_STAINED_GLASS_PANE',   name: 'Cristal blanco',        icon: 'white-stained-glass-pane',   cat: 'Decoración' },
  { id: 'RED_STAINED_GLASS_PANE',     name: 'Cristal rojo',          icon: 'red-stained-glass-pane',     cat: 'Decoración' },
  { id: 'GREEN_STAINED_GLASS_PANE',   name: 'Cristal verde',         icon: 'green-stained-glass-pane',   cat: 'Decoración' },
  { id: 'BLUE_STAINED_GLASS_PANE',    name: 'Cristal azul',          icon: 'blue-stained-glass-pane',    cat: 'Decoración' },
  { id: 'YELLOW_STAINED_GLASS_PANE',  name: 'Cristal amarillo',      icon: 'yellow-stained-glass-pane',  cat: 'Decoración' },
  { id: 'ORANGE_STAINED_GLASS_PANE',  name: 'Cristal naranja',       icon: 'orange-stained-glass-pane',  cat: 'Decoración' },
  { id: 'PURPLE_STAINED_GLASS_PANE',  name: 'Cristal morado',        icon: 'purple-stained-glass-pane',  cat: 'Decoración' },
  { id: 'CYAN_STAINED_GLASS_PANE',    name: 'Cristal cian',          icon: 'cyan-stained-glass-pane',    cat: 'Decoración' },
  { id: 'LIME_STAINED_GLASS_PANE',    name: 'Cristal lima',          icon: 'lime-stained-glass-pane',    cat: 'Decoración' },
  { id: 'PINK_STAINED_GLASS_PANE',    name: 'Cristal rosa',          icon: 'pink-stained-glass-pane',    cat: 'Decoración' },
  { id: 'MAGENTA_STAINED_GLASS_PANE', name: 'Cristal magenta',       icon: 'magenta-stained-glass-pane', cat: 'Decoración' },
  { id: 'LIGHT_BLUE_STAINED_GLASS_PANE', name: 'Cristal azul claro', icon: 'light-blue-stained-glass-pane', cat: 'Decoración' },
  { id: 'BROWN_STAINED_GLASS_PANE',   name: 'Cristal marrón',        icon: 'brown-stained-glass-pane',   cat: 'Decoración' },
  { id: 'LIGHT_GRAY_STAINED_GLASS_PANE', name: 'Cristal gris claro', icon: 'light-gray-stained-glass-pane', cat: 'Decoración' },
  { id: 'BARRIER',                    name: 'Barrera',               icon: 'barrier',                    cat: 'Decoración' },
  { id: 'PAPER',                      name: 'Papel',                 icon: 'paper',                      cat: 'Decoración' },
  { id: 'MAP',                        name: 'Mapa vacío',            icon: 'empty-map',                  cat: 'Decoración' },
  { id: 'FILLED_MAP',                 name: 'Mapa',                  icon: 'map',                        cat: 'Decoración' },
  { id: 'BOOK',                       name: 'Libro',                 icon: 'book',                       cat: 'Decoración' },
  { id: 'WRITTEN_BOOK',               name: 'Libro escrito',         icon: 'written-book',               cat: 'Decoración' },
  { id: 'ENCHANTED_BOOK',             name: 'Libro encantado',       icon: 'enchanted-book',             cat: 'Decoración' },
  { id: 'NETHER_STAR',                name: 'Estrella del Nether',   icon: 'nether-star',                cat: 'Decoración' },
  { id: 'END_CRYSTAL',                name: 'Cristal del End',       icon: 'end-crystal',                cat: 'Decoración' },
  { id: 'TOTEM_OF_UNDYING',           name: 'Tótem de inmortalidad', icon: 'totem-of-undying',           cat: 'Decoración' },
  { id: 'COMPASS',                    name: 'Brújula',               icon: 'compass',                    cat: 'Decoración' },
  { id: 'CLOCK',                      name: 'Reloj',                 icon: 'clock',                      cat: 'Decoración' },
  { id: 'SPYGLASS',                   name: 'Catalejo',              icon: 'spyglass',                   cat: 'Decoración' },
  { id: 'PAINTING',                   name: 'Cuadro',                icon: 'painting',                   cat: 'Decoración' },

  // ─── Bloques comunes
  { id: 'STONE',          name: 'Piedra',           icon: 'stone',            cat: 'Bloques' },
  { id: 'GRASS_BLOCK',    name: 'Bloque de hierba', icon: 'grass-block',      cat: 'Bloques' },
  { id: 'DIRT',           name: 'Tierra',           icon: 'dirt',             cat: 'Bloques' },
  { id: 'OAK_PLANKS',    name: 'Tablones de roble', icon: 'oak-planks',      cat: 'Bloques' },
  { id: 'GLASS',          name: 'Vidrio',           icon: 'glass',            cat: 'Bloques' },
  { id: 'CHEST',          name: 'Cofre',            icon: 'chest',            cat: 'Bloques' },
  { id: 'CRAFTING_TABLE', name: 'Mesa de trabajo',  icon: 'crafting-table',  cat: 'Bloques' },
  { id: 'FURNACE',        name: 'Horno',            icon: 'furnace',          cat: 'Bloques' },
  { id: 'BEDROCK',        name: 'Roca madre',       icon: 'bedrock',          cat: 'Bloques' },
  { id: 'COMMAND_BLOCK',  name: 'Bloque de comando',icon: 'command-block',    cat: 'Bloques' },
  { id: 'PLAYER_HEAD',    name: 'Cabeza de jugador',icon: 'player-head-steve',cat: 'Bloques' },
  { id: 'SKELETON_SKULL', name: 'Cráneo de esqueleto',icon:'skeleton-skull',  cat: 'Bloques' },
  { id: 'WITHER_SKELETON_SKULL',name:'Cráneo de wither',icon:'wither-skeleton-skull', cat:'Bloques'},

  // ─── Recursos
  { id: 'DIAMOND',        name: 'Diamante',         icon: 'diamond',          cat: 'Recursos' },
  { id: 'EMERALD',        name: 'Esmeralda',        icon: 'emerald',          cat: 'Recursos' },
  { id: 'GOLD_INGOT',     name: 'Lingote de oro',   icon: 'gold-ingot',       cat: 'Recursos' },
  { id: 'IRON_INGOT',     name: 'Lingote de hierro',icon: 'iron-ingot',       cat: 'Recursos' },
  { id: 'NETHERITE_INGOT',name: 'Lingote de netherita',icon:'netherite-ingot',cat: 'Recursos' },
  { id: 'COPPER_INGOT',   name: 'Lingote de cobre', icon: 'copper-ingot',     cat: 'Recursos' },
  { id: 'COAL',           name: 'Carbón',           icon: 'coal',             cat: 'Recursos' },
  { id: 'LAPIS_LAZULI',   name: 'Lapislázuli',      icon: 'lapis-lazuli',     cat: 'Recursos' },
  { id: 'REDSTONE',       name: 'Redstone',         icon: 'redstone-dust',    cat: 'Recursos' },
  { id: 'QUARTZ',         name: 'Cuarzo del Nether',icon: 'nether-quartz',    cat: 'Recursos' },
  { id: 'AMETHYST_SHARD', name: 'Fragmento de amatista',icon:'amethyst-shard',cat:'Recursos' },
  { id: 'ECHO_SHARD',     name: 'Fragmento de eco', icon: 'echo-shard',       cat: 'Recursos' },
  { id: 'NETHER_STAR',    name: 'Estrella del Nether',icon:'nether-star',     cat: 'Recursos' },
  { id: 'BLAZE_ROD',      name: 'Vara de blaze',    icon: 'blaze-rod',        cat: 'Recursos' },
  { id: 'ENDER_PEARL',    name: 'Perla de Ender',   icon: 'ender-pearl',      cat: 'Recursos' },
  { id: 'ENDER_EYE',      name: 'Ojo de Ender',     icon: 'eye-of-ender',     cat: 'Recursos' },
  { id: 'GHAST_TEAR',     name: 'Lágrima de ghast', icon: 'ghast-tear',       cat: 'Recursos' },
  { id: 'SLIME_BALL',     name: 'Bola de slime',    icon: 'slimeball',        cat: 'Recursos' },
  { id: 'FEATHER',        name: 'Pluma',            icon: 'feather',          cat: 'Recursos' },
  { id: 'BONE',           name: 'Hueso',            icon: 'bone',             cat: 'Recursos' },
  { id: 'STRING',         name: 'Hilo',             icon: 'string',           cat: 'Recursos' },
  { id: 'LEATHER',        name: 'Cuero',            icon: 'leather',          cat: 'Recursos' },
  { id: 'RAW_IRON',       name: 'Hierro crudo',     icon: 'raw-iron',         cat: 'Recursos' },
  { id: 'RAW_GOLD',       name: 'Oro crudo',        icon: 'raw-gold',         cat: 'Recursos' },
  { id: 'RAW_COPPER',     name: 'Cobre crudo',      icon: 'raw-copper',       cat: 'Recursos' },
  { id: 'FLINT',          name: 'Pedernal',         icon: 'flint',            cat: 'Recursos' },
  { id: 'STICK',          name: 'Palo',             icon: 'stick',            cat: 'Recursos' },

  // ─── Herramientas & armas
  { id: 'DIAMOND_SWORD',      name: 'Espada de diamante',   icon: 'diamond-sword',       cat: 'Herramientas' },
  { id: 'NETHERITE_SWORD',    name: 'Espada de netherita',  icon: 'netherite-sword',     cat: 'Herramientas' },
  { id: 'IRON_SWORD',         name: 'Espada de hierro',     icon: 'iron-sword',          cat: 'Herramientas' },
  { id: 'GOLDEN_SWORD',       name: 'Espada de oro',        icon: 'golden-sword',        cat: 'Herramientas' },
  { id: 'STONE_SWORD',        name: 'Espada de piedra',     icon: 'stone-sword',         cat: 'Herramientas' },
  { id: 'WOODEN_SWORD',       name: 'Espada de madera',     icon: 'wooden-sword',        cat: 'Herramientas' },
  { id: 'BOW',                name: 'Arco',                 icon: 'bow',                 cat: 'Herramientas' },
  { id: 'CROSSBOW',           name: 'Ballesta',             icon: 'crossbow',            cat: 'Herramientas' },
  { id: 'TRIDENT',            name: 'Tridente',             icon: 'trident',             cat: 'Herramientas' },
  { id: 'MACE',               name: 'Maza',                 icon: 'mace',                cat: 'Herramientas' },
  { id: 'DIAMOND_PICKAXE',    name: 'Pico de diamante',     icon: 'diamond-pickaxe',     cat: 'Herramientas' },
  { id: 'IRON_PICKAXE',       name: 'Pico de hierro',       icon: 'iron-pickaxe',        cat: 'Herramientas' },
  { id: 'DIAMOND_AXE',        name: 'Hacha de diamante',    icon: 'diamond-axe',         cat: 'Herramientas' },
  { id: 'SHEARS',             name: 'Tijeras',              icon: 'shears',              cat: 'Herramientas' },
  { id: 'FISHING_ROD',        name: 'Caña de pescar',       icon: 'fishing-rod',         cat: 'Herramientas' },
  { id: 'FLINT_AND_STEEL',    name: 'Eslabón',             icon: 'flint-and-steel',     cat: 'Herramientas' },
  { id: 'ELYTRA',             name: 'Élitros',              icon: 'elytra',              cat: 'Herramientas' },
  { id: 'SHIELD',             name: 'Escudo',               icon: 'shield',              cat: 'Herramientas' },

  // ─── Armadura
  { id: 'DIAMOND_HELMET',     name: 'Casco de diamante',    icon: 'diamond-helmet',      cat: 'Armadura' },
  { id: 'DIAMOND_CHESTPLATE', name: 'Peto de diamante',     icon: 'diamond-chestplate',  cat: 'Armadura' },
  { id: 'DIAMOND_LEGGINGS',   name: 'Pantalones de diamante',icon:'diamond-leggings',    cat: 'Armadura' },
  { id: 'DIAMOND_BOOTS',      name: 'Botas de diamante',    icon: 'diamond-boots',       cat: 'Armadura' },
  { id: 'NETHERITE_HELMET',   name: 'Casco de netherita',   icon: 'netherite-helmet',    cat: 'Armadura' },
  { id: 'NETHERITE_CHESTPLATE',name:'Peto de netherita',    icon: 'netherite-chestplate',cat: 'Armadura' },
  { id: 'IRON_HELMET',        name: 'Casco de hierro',      icon: 'iron-helmet',         cat: 'Armadura' },
  { id: 'IRON_CHESTPLATE',    name: 'Peto de hierro',       icon: 'iron-chestplate',     cat: 'Armadura' },
  { id: 'GOLDEN_HELMET',      name: 'Casco de oro',         icon: 'golden-helmet',       cat: 'Armadura' },
  { id: 'GOLDEN_CHESTPLATE',  name: 'Peto de oro',          icon: 'golden-chestplate',   cat: 'Armadura' },
  { id: 'LEATHER_HELMET',     name: 'Casco de cuero',       icon: 'leather-cap',         cat: 'Armadura' },
  { id: 'LEATHER_CHESTPLATE', name: 'Peto de cuero',        icon: 'leather-tunic',       cat: 'Armadura' },
  { id: 'TURTLE_HELMET',      name: 'Casco de tortuga',     icon: 'turtle-shell',        cat: 'Armadura' },

  // ─── Comida
  { id: 'APPLE',                  name: 'Manzana',               icon: 'apple',                  cat: 'Comida' },
  { id: 'GOLDEN_APPLE',           name: 'Manzana dorada',        icon: 'golden-apple',           cat: 'Comida' },
  { id: 'ENCHANTED_GOLDEN_APPLE', name: 'Manzana encantada',     icon: 'enchanted-golden-apple', cat: 'Comida' },
  { id: 'BREAD',                  name: 'Pan',                   icon: 'bread',                  cat: 'Comida' },
  { id: 'COOKED_BEEF',            name: 'Bistec',                icon: 'steak',                  cat: 'Comida' },
  { id: 'COOKED_CHICKEN',         name: 'Pollo cocido',          icon: 'cooked-chicken',         cat: 'Comida' },
  { id: 'POTION',                 name: 'Poción',                icon: 'potion',                 cat: 'Comida' },
  { id: 'EXPERIENCE_BOTTLE',      name: 'Botella de XP',         icon: 'bottle-o\'-enchanting',  cat: 'Comida' },
  { id: 'HONEY_BOTTLE',           name: 'Frasco de miel',        icon: 'honey-bottle',           cat: 'Comida' },
  { id: 'GOLDEN_CARROT',          name: 'Zanahoria dorada',      icon: 'golden-carrot',          cat: 'Comida' },

  // ─── Especiales
  { id: 'SPAWNER',         name: 'Generador de mobs',icon: 'spawner',           cat: 'Especiales' },
  { id: 'SADDLE',          name: 'Silla de montar',  icon: 'saddle',            cat: 'Especiales' },
  { id: 'NAME_TAG',        name: 'Etiqueta de nombre',icon:'name-tag',          cat: 'Especiales' },
  { id: 'TRIAL_KEY',       name: 'Llave de prueba',  icon: 'trial-key',         cat: 'Especiales' },
  { id: 'HEART_OF_THE_SEA',name:'Corazón del mar',   icon:'heart-of-the-sea',   cat: 'Especiales' },
]

/** Get sprite URL for a material ID */
export function itemIcon(id) {
  const item = MC_ITEMS.find(i => i.id === id)
  if (!item) return null
  return `https://minecraft.wiki/images/ItemSprite_${item.icon}.png?format=original`
}

/** Get display name */
export function itemName(id) {
  return MC_ITEMS.find(i => i.id === id)?.name ?? id
}

/** Categories */
export const ITEM_CATEGORIES = [...new Set(MC_ITEMS.map(i => i.cat))]
