'use client'

import { Button } from '@/components/ui/button'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="bg-background shadow-login rounded-md flex items-center justify-center">
      <div className="min-h-[500px] flex items-center flex-col justify-center gap-y-4">
        {error.message}
        <Button
          variant={'outline'}
          onClick={reset}
        >
          Tải lại
        </Button>
      </div>
    </div>
  )
}

export default Error
