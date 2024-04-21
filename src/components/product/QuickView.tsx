import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import Image from 'next/image'

export function QuickView() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Search className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 w-full md:max-w-3xl h-fmax">
        <div className="md:grid grid-cols-2 flex flex-col gap-y-2 p-4">
          <div className="relative w-full group cursor-pointer p-10 overflow-hidden">
            <Image
              src={'/login.png'}
              alt="product"
              width={450}
              height={450}
            />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 hover:text-gray-500 p-2 md:group-hover:opacity-100 md:opacity-0 md:group-hover:translate-x-0 md:-translate-x-4 transition-all duration-300">
              <ChevronLeft />
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 hover:text-gray-500 p-2 md:group-hover:opacity-100 md:opacity-0 md:group-hover:-translate-x-0 md:translate-x-4 transition-all duration-300">
              <ChevronRight />
            </div>
            <Button className="w-full md:translate-y-10 md:group-hover:translate-y-0 md:opacity-0 transition-all md:group-hover:opacity-100 absolute bottom-0 left-0">
              Xem Chi Tiết
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Acer ConceptD 7 Ezel</h1>
            <span>Brand</span>
            <span className="font-bold text-xl text-blue-500 flex items-center gap-1">
              <span className="text-sm">đ</span> 200.000
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
