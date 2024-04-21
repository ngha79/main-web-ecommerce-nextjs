import React from 'react'

export default function SearchLayout({
  product,
  shop,
}: {
  product: React.ReactNode
  shop: React.ReactNode
}) {
  return (
    <section className="flex gap-4 container px-2 md:px-8 lg:px-4 py-4 flex-col">
      {shop}
      <div className="relative">{product}</div>
    </section>
  )
}
