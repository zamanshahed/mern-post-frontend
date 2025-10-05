import PostCard from "../components/PostCard";

const PostGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-12">
      {Array.from({ length: 10 }, (_, index) => (
        <PostCard key={index} />
      ))}
    </div>
  );
};

export default PostGrid;
