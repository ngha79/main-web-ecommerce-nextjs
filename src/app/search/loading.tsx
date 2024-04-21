import { Skeleton } from '@/components/ui/skeleton'

export default async function Loading() {
  return (
    <div className="container py-4 space-y-8">
      <div className="bg-background rounded-md shadow-login gap-y-4 p-4 gap-x-6 flex flex-col md:grid md:grid-cols-4">
        <div className="flex flex-col items-center justify-center gap-y-2 flex-1 md:border-r pr-4 col-span-1">
          <Skeleton className="border rounded-full w-20 h-20" />
          <Skeleton className="line-clamp-2 text-center h-4 w-40" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-20" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 col-span-3">
          <div className="max-w-52 min-w-32 space-y-2">
            <Skeleton className="w-full h-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="max-w-52 min-w-32 space-y-2">
            <Skeleton className="w-full h-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="max-w-52 min-w-32 space-y-2">
            <Skeleton className="w-full h-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="max-w-52 min-w-32 space-y-2">
            <Skeleton className="w-full h-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((item, i) => (
          <div
            className="bg-white p-4 space-y-2"
            key={i}
          >
            <Skeleton className="rounded-md h-[250px] w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
