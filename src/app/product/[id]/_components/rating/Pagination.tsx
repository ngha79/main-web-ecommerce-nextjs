import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

const Pagination = ({
  listPage,
  handleSetPage,
}: {
  listPage: any
  handleSetPage: (page: number) => void
}) => {
  const { page, lastPage, nextPage, prevPage } = listPage
  const handleGetListReviewPage = (page: number | null) => {
    if (page == null) return
    handleSetPage(page + 1)
  }
  return (
    <div
      className={cn([
        'flex-1 items-center justify-center gap-2',
        lastPage ? 'flex' : 'hidden',
      ])}
    >
      <Button
        variant={'primary'}
        className="md:hidden"
        disabled={prevPage !== null ? false : true}
        onClick={() => handleGetListReviewPage(prevPage)}
      >
        Trước
      </Button>
      {page > 4 ? (
        <>
          <Button variant={'ghost'}>...</Button>
          <Button
            variant={'primaryHover'}
            onClick={() => handleGetListReviewPage(0)}
            className="hidden md:block text-foreground"
          >
            1
          </Button>
        </>
      ) : null}
      {prevPage !== null ? (
        <Button
          variant={'outline'}
          className="hidden md:block"
          onClick={() => handleGetListReviewPage(prevPage)}
        >
          {prevPage + 1}
        </Button>
      ) : null}
      <Button
        variant={'primary'}
        className="hidden md:block"
      >
        {page}
      </Button>
      {nextPage ? (
        <Button
          variant={'primaryHover'}
          onClick={() => handleGetListReviewPage(nextPage)}
          className="hidden md:block text-foreground"
        >
          {nextPage + 1}
        </Button>
      ) : null}
      {lastPage && lastPage > page + 4 ? (
        <>
          <Button variant={'ghost'}>...</Button>
          <Button
            variant={'primaryHover'}
            onClick={() => handleGetListReviewPage(lastPage)}
            className="hidden md:block text-foreground"
          >
            {lastPage + 1}
          </Button>
        </>
      ) : null}
      <Button
        variant={'primary'}
        className="md:hidden"
        onClick={() => handleGetListReviewPage(nextPage)}
        disabled={nextPage ? false : true}
      >
        Sau
      </Button>
    </div>
  )
}

export default Pagination
