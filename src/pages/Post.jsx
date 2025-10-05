import { useParams } from "react-router-dom";
import useGeneralStore from "../store/generalStore";
import { getPostDetails } from "../api/postApis";
import InfinityLoader from "../components/InfinityLoader";
import { useEffect } from "react";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";

const Post = () => {
  const { post_id } = useParams();
  const { isLoading, setIsLoading } = useGeneralStore();
  const [postData, setPostData] = useState(null);

  const fetchPostDetails = async (postId) => {
    setIsLoading(true);
    try {
      const response = await getPostDetails(postId);
      const data = response;
      console.log("Post details data:", response);
      setPostData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails(post_id);
  }, [post_id]);

  return (
    <div className="bg-gradient-to-b from-[#E3F4FF] to-white text-black">
      {isLoading ? (
        <InfinityLoader />
      ) : (
        <div className="max-w-[1280px] w-full mx-auto pt-[100px]">
          <div className="bg-[#FAF6D4] py-2.5 px-6 rounded-full border border-yellow-600 min-w-max w-fit mx-auto text-sm font-medium">
            {postData?.category}
          </div>
          <h1 className="text-5xl font-bold max-w-[1000px] mx-auto text-center pt-3">
            {postData?.title}
          </h1>
          <h3 className="text-lg mx-auto text-center pt-5 pb-12">
            Last Update:{" "}
            {postData?.updatedAt ? formatDate(postData?.updatedAt) : ""}
          </h3>
          {postData?.coverImage && (
            <img
              src={postData?.coverImage}
              alt={postData?.title + "-cover-image"}
              className="w-full max-h-[400px] object-contain bg-transparent rounded-xl"
            />
          )}
          <div className="pt-[100px]">
            <div>
              <div className="flex items-center gap-4 pb-12">
                <img
                  src={
                    postData?.author?.imageUrl ?? "https://placehold.co/300x200"
                  }
                  alt={postData?.author?.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-400"
                />
                <div>
                  <p className="text-base font-semibold">
                    {postData?.author?.name}
                  </p>
                  <p className="text-sm">
                    Posted on:{" "}
                    {postData?.postDate ? formatDate(postData?.postDate) : ""}
                  </p>
                </div>
              </div>
            </div>
            <p className="pb-20">{postData?.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
