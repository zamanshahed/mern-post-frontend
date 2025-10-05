import { useState } from "react";
import PostCard from "../components/PostCard";
import useGeneralStore from "../store/generalStore";
import { getAllPosts } from "../api/postApis";
import { useEffect } from "react";
import InfinityLoader from "../components/InfinityLoader";
import { formatDate } from "../utils/formatDate";

const PostGrid = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, setIsLoading } = useGeneralStore();

  const fetchPosts = async () => {
    setIsLoading(true);
    const data = await getAllPosts();
    console.log("all posts : ", data);
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-12">
      {isLoading ? (
        <div>
          <InfinityLoader />
        </div>
      ) : (
        posts.length > 0 &&
        posts.map((post, index) => (
          <PostCard
            key={index}
            post_id={post._id}
            title={post.title}
            //pass 120 characters of the contents
            content={post.content.slice(0, 120) + "..."}
            category={post.category}
            authorName={post.author.name}
            authorAvatar={post.author.avatar}
            date={post.postDate ? formatDate(post.postDate) : ""}
            postCover={post?.coverImage}
          />
        ))
      )}
    </div>
  );
};

export default PostGrid;
