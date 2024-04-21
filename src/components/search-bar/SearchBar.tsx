'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { SetStateAction, useEffect, useState } from 'react'
import useDebounce from '@/helpers/useDebounce'
import { handleSearchProduct } from '@/utils/action'
import { ProductSearch } from '@/lib/interface'
import SearchResult from './SearchResult'
import { Button } from '../ui/button'
import productApiRequest from '@/apiRequests/product'
import { toast } from 'sonner'

const Page = () => {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const [searchs, setSearchs] = useState(searchParams.get('search') || '')
  const [resultSearch, setResultSearch] = useState<ProductSearch[]>([])
  const router = useRouter()

  const handleOnChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchs(e.target.value)
  }

  const handleNavigate = () => {
    if (searchs) router.replace(`/search?search=${searchs}`)
  }

  const debouncedSearchValue = useDebounce(searchs, 500)

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNavigate()
    }
  }

  useEffect(() => {
    async function getProductSearch() {
      try {
        const res = await productApiRequest.handleSearchProduct({
          limit: 10,
          page: 1,
          search: debouncedSearchValue,
        })
        setResultSearch(res.payload.data)
      } catch (error: any) {
        toast.error(error.payload.message)
      }
    }
    if (debouncedSearchValue) {
      getProductSearch()
      if (pathName === '/search') {
        router.replace(`/search?search=${debouncedSearchValue}`)
      }
    }
  }, [debouncedSearchValue, pathName, router])

  return (
    <div className="w-full bg-white rounded-md group flex items-center gap-2 p-1 relative z-10 ">
      <input
        type="text"
        placeholder="Shopee bao ship 0Đ - Đăng ký ngay!"
        className="w-full bg-white p-2 rounded-md text-sm search"
        value={searchs}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        onClick={handleNavigate}
      >
        <Search />
      </Button>
      {debouncedSearchValue && <SearchResult resultSearch={resultSearch} />}
    </div>
  )
}

export default Page
