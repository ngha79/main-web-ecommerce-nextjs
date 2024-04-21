'use client'

import { clientSessionUser } from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'
import { createContext, useContext, useState } from 'react'

type User = AccountResType

const AppContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {},
})
export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}
export default function AppProvider({
  children,
  inititalAccessToken = '',
  inititalRefreshToken = '',
  user: userProp,
}: {
  children: React.ReactNode
  inititalAccessToken?: string
  inititalRefreshToken?: string
  user: User | null
}) {
  const [user, setUser] = useState<User | null>(userProp)
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionUser.accessToken = inititalAccessToken
      clientSessionUser.refreshToken = inititalRefreshToken
    }
  })

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
