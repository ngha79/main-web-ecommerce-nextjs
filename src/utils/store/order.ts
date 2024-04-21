import { ListOrder, ListOrderStore } from '@/lib/interface'
import { create } from 'zustand'

export const listOrderStore = create<ListOrderStore>()((set) => ({
  listOrder: [],
  setListOrder: (listOrder: ListOrder[]) =>
    set((state) => ({ listOrder: [...state.listOrder, ...listOrder] })),
  resetListOrder: () => set((state) => ({ listOrder: undefined })),
}))
