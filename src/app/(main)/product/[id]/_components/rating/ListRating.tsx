import UserRating from "./UserRating";
import CreateRating from "./CreateRating";

const ListRating = ({
  handleAddComment,
  listRating,
}: {
  handleAddComment: (comment: any) => void;
  listRating: any[];
}) => {
  return (
    <div className="flex flex-col">
      <CreateRating handleAddComment={handleAddComment} />
      {listRating?.map((item) => (
        <UserRating key={item.id} review={item} />
      ))}
    </div>
  );
};

export default ListRating;
