import Category from '@/components/home/Category'
import ProductSuggest from '@/components/product/ProductSuggest'

export default function Home() {
  return (
    <div className="flex items-center max-w-7xl w-full mx-auto h-full flex-col p-4 md:p-8 gap-8">
      <Category />
      <ProductSuggest />
    </div>
  )
}
