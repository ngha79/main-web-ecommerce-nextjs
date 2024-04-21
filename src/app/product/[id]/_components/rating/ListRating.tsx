import React from 'react'
import UserRating from './UserRating'
import CreateRating from './CreateRating'
import { useAppContext } from '@/app/app-provider'

const ListRating = ({
  handleAddComment,
  listRating,
}: {
  handleAddComment: (comment: any) => void
  listRating: any[]
}) => {
  const { user } = useAppContext()
  return (
    <div className="flex flex-col">
      {user ? (
        <CreateRating
          user={user}
          handleAddComment={handleAddComment}
        />
      ) : null}
      {listRating?.map((item) => (
        <UserRating
          key={item.id}
          review={item}
        />
      ))}
    </div>
  )
}

export default ListRating
