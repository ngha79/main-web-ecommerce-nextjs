import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectPrice {
  sortBy: string
  orderBy: string
  handleSetSort: (sort: string, orderBy?: string) => void
}

export function SelectPrice({ sortBy, handleSetSort, orderBy }: SelectPrice) {
  const [order, setOrder] = React.useState<string>('')

  React.useEffect(() => {
    setOrder(orderBy ? orderBy : 'all')
  }, [orderBy])

  const handleUpdate = (sort: string, orderBy: string) => {
    handleSetSort(sort, orderBy)
    setOrder(orderBy)
  }
  return (
    <Select
      onValueChange={(value) => handleUpdate('price', value)}
      value={order}
    >
      <SelectTrigger className="md:w-full w-24 md:max-w-[120px]">
        <SelectValue
          placeholder="Giá"
          color={'text-destructive'}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Giá</SelectItem>
          <SelectItem value="desc">Cao đến thấp</SelectItem>
          <SelectItem value="asc">Thấp đến cao</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
