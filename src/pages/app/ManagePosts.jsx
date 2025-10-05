import { useState } from "react";
import { getAllPosts } from "../../api/postApis";
import { useEffect } from "react";
import RecentPosts from "./RecentPosts";
import InfinityLoader from "../../components/InfinityLoader";
import useGeneralStore from "../../store/generalStore";

const ManagePosts = () => {
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
    <div>
      {isLoading ? (
        <InfinityLoader size={48} />
      ) : (
        <RecentPosts
          sectionTitle="Manage Posts"
          posts={posts}
          onDeleteSuccess={() => {
            fetchPosts();
          }}
        />
      )}
    </div>
  );
};

export default ManagePosts;
