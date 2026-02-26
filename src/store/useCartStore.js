import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  isCartOpen: false,
  lastOrder: null,
  paymentMethod: null,   // 'nequi' | 'bancolombia' | 'efectivo'
  extras: { servilletas: false, salsas: false, tartara: 0, pina: 0 },
  sede: null,            // 'Aurora' | 'Lagos' | 'Mutis' | 'Piedecuesta'

  setSede: (sede) => set({ sede }),

  addItem: (producto, qty = 1, nota = '') => {
    const { items } = get()
    const key = `${producto.id}::${nota}`
    const existing = items.find(i => i.key === key)
    if (existing) {
      set({
        items: items.map(i =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        )
      })
    } else {
      set({
        items: [
          ...items,
          { ...producto, qty, nota, key }
        ]
      })
    }
  },

  removeItem: (key) => {
    set({ items: get().items.filter(i => i.key !== key) })
  },

  updateQty: (key, delta) => {
    const { items } = get()
    const updated = items
      .map(i => i.key === key ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    set({ items: updated })
  },

  // Actualiza la nota de un item ya en el carrito
  updateNota: (key, nota) => {
    const { items } = get()
    set({ items: items.map(i => i.key === key ? { ...i, nota } : i) })
  },

  clearCart: () => set({ items: [], paymentMethod: null, extras: { servilletas: false, salsas: false, tartara: 0, pina: 0 } }),

  setLastOrder: (pedido) => set({ lastOrder: pedido }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  setExtras: (extras) => set({ extras }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

  get totalItems() {
    return get().items.reduce((acc, i) => acc + i.qty, 0)
  },

  get totalPrice() {
    return get().items.reduce((acc, i) => acc + i.precio * i.qty, 0)
  },
}))

export default useCartStore
