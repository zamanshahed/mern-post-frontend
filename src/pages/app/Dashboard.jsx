import { useEffect, useState } from "react";
import { BsCalendarWeek } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { MdOutlineFiberNew } from "react-icons/md";
import { getAllPosts } from "../../api/postApis";
import { timeAgo } from "../../utils/formatTimeAgo";
import { countTodayPosts } from "../../utils/todaysPostCount";
import DashCard from "./components/DashCard";
import RecentPosts from "./RecentPosts";

const AppDashboard = () => {
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
    <div className="">
      <div className="grid grid-cols-3 gap-6">
        <DashCard
          label="Total Posts"
          value={posts.length}
          icon={
            <div className="p-2 bg-orange-100 rounded-xl border border-orange-200">
              <FiFileText className="w-5 h-5 text-orange-600 bg-orange-100" />
            </div>
          }
        />
        <DashCard
          label="Latest Post"
          value={posts.length > 0 ? timeAgo(posts[0].createdAt) : "-"}
          icon={
            <div className="p-1 bg-blue-100 rounded-xl border border-blue-200">
              <MdOutlineFiberNew className="w-7 h-7 text-blue-600 bg-blue-100" />
            </div>
          }
        />
        <DashCard
          label="Today's Posts"
          value={posts.length > 0 ? countTodayPosts(posts) : "-"}
          icon={
            <div className="p-2 bg-emerald-100 rounded-xl border border-emerald-200">
              <BsCalendarWeek className="w-5 h-5 text-emerald-600 bg-emerald-100" />
            </div>
          }
        />
      </div>
      <div className="mt-8" />
      {posts.length > 0 && (
        <RecentPosts posts={posts} sectionTitle="Recent Posts" showSeeAll />
      )}
    </div>
  );
};

export default AppDashboard;
