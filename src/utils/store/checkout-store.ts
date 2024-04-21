import { CheckOut, CheckOutStore } from '@/lib/interface'
import { create } from 'zustand'

export const checkoutStore = create<CheckOutStore>()((set) => ({
  checkout: undefined,
  setCheckout: (checkout: CheckOut) => set((state) => ({ checkout: checkout })),
  resetCheckout: () => set((state) => ({ checkout: undefined })),
}))
