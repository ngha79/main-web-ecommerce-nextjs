'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function ProductOptions() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-none flex flex-col"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center text-xs text-gray-500">
            <span>Phân loại hàng:</span>
            <ChevronDown size={18} />
          </div>
          <span className="text-xs text-gray-500">500g</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-none space-y-4 shadow-login">
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Phân loại:</span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={'outline'}
              className="border-red-500 text-red-500"
            >
              500g
            </Button>
            <Button variant={'outline'}>500g</Button>
          </div>
        </div>
        <div className="space-x-4 w-full">
          <Button
            variant={'destructive'}
            onClick={() => setIsOpen(false)}
          >
            Hủy
          </Button>
          <Button
            variant={'destructive'}
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Xác Nhận
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
