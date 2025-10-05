import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails, updatePost } from "../../api/postApis";
import SectionTitle from "../../components/SectionTitle";
import CategoryDropdown from "./CategoryDropdown";
import useGeneralStore from "../../store/generalStore";
import InfinityLoader from "../../components/InfinityLoader";
import ImageUploader from "../../components/ImageUploader";

const EditPost = () => {
  const { post_id } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");

  const [postImageUpdateMode, setPostImageUpdateMode] = useState(false);

  const { isLoading, setIsLoading } = useGeneralStore();

  const fetchPostDetails = async (postId) => {
    setIsLoading(true);
    try {
      const response = await getPostDetails(postId);
      const data = response;
      console.log("Post details data:", response);
      setPostTitle(data.title);
      setPostCategory(data.category);
      setPostContent(data.content);
      setPostImage(data.coverImage);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await updatePost(post_id, {
        title: postTitle,
        category: postCategory,
        body: postContent,
      });
      console.log("Post updated:", response);
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
    <div className="">
      {isLoading ? <InfinityLoader size={45} /> : null}
      <form className="space-y-5" onSubmit={handleUpdatePost}>
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Edit Post" />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white text-lg font-semibold px-4 py-2 min-w-[120px] rounded-xl cursor-pointer"
          >
            Update Post
          </button>
        </div>

        <div className="flex flex-col space-y-2 text-base font-normal">
          {postImageUpdateMode ? (
            <ImageUploader
              onComplete={(response) => {
                setPostImage(response.data.display_url);
              }}
              onRemove={() => fetchPostDetails(post_id)}
            />
          ) : (
            <img
              src={postImage}
              className="w-full h-[300px] p-2 rounded-xl object-contain bg-black"
            />
          )}
          <button
            type="button"
            disabled={isLoading}
            onClick={async () => {
              if (!postImageUpdateMode) setPostImageUpdateMode(true);
              else {
                setIsLoading(true);
                const response = await updatePost(post_id, {
                  title: postTitle,
                  content: postContent,
                  category: postCategory,
                  coverImage: postImage,
                });
                setPostImage(response.coverImage);
                setIsLoading(false);
                setPostImageUpdateMode(false);
              }
            }}
            className="bg-blue-500 text-white text-lg font-semibold px-4 py-1.5 w-[220px] mx-auto rounded-xl cursor-pointer"
          >
            {!postImageUpdateMode ? "Change Post Image" : "Save Changes"}
          </button>

          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            id="title"
            placeholder="Title"
            className=" bg-[#E3E3E3] rounded-xl px-4 py-2 h-14"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>

        <CategoryDropdown
          required={true}
          value={postCategory}
          onChange={setPostCategory}
        />

        <div className="flex flex-col space-y-2 text-base font-normal">
          <label htmlFor="content">Content</label>
          <textarea
            required
            id="content"
            placeholder="Content"
            className=" bg-[#E3E3E3] rounded-xl px-4 py-2 resize-none"
            rows={"4"}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPost;
