import { useState } from "react";
import { getAllPosts } from "../../api/postApis";
import { useEffect } from "react";
import RecentPosts from "./RecentPosts";
import InfinityLoader from "../../components/InfinityLoader";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const data = await getAllPosts();
    console.log("all posts : ", data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      {/* TODO: <InfinityLoader size={48} />*/}
      <RecentPosts sectionTitle="Manage Posts" posts={posts} />
    </div>
  );
};

export default ManagePosts;
