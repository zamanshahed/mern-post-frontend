import { Link } from "react-router-dom";

const PostCard = ({
  title = "",
  category = "",
  postCover = "https://placehold.co/600x400",
  content = "",
  authorName = "",
  authorAvatar = "https://placehold.co/300x200",
  date = "",
  post_id = "",
}) => {
  return (
    <Link
      to={`/post/${post_id}`}
      className="bg-[#0C0A25] rounded-lg shadow-md space-grotesk hover:scale-[1.02] transition-all ease-in-out duration-150"
    >
      <img
        src={postCover}
        alt={title}
        className="w-full h-[230px] object-cover rounded-lg"
      />
      <p className="text-[#83C5E0] text-sm pt-6">{category}</p>
      <div className="pt-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-gray-300 pt-3 pb-4">{content}</p>
      </div>
      <div className="flex items-center gap-2">
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <p className="text-gray-300 text-sm">{authorName}</p>
          <p className="text-gray-300 text-sm">{date}</p>
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
