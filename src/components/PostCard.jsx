const PostCard = ({
  title = "Top 20 fintect software development companies (2025)",
  category = "Software Development",
  postCover = "https://picsum.photos/400/600",
  content = "Fintech software development is all about building specific systems that are designed to meet the needs of the Fintech industry.",
  authorName = "John Doe",
  authorAvatar = "https://picsum.photos/200/300",
  date = "5th October, 2025",
}) => {
  return (
    <div className="bg-[#0C0A25] rounded-lg shadow-md space-grotesk hover:scale-[1.02] transition-all ease-in-out duration-150">
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
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="text-gray-300 text-sm">{authorName}</p>
          <p className="text-gray-300 text-sm">{date}</p>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
