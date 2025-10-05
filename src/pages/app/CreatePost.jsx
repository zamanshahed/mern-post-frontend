import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import SectionTitle from "../../components/SectionTitle";
import { createPost } from "../../api/postApis";
import ImageUploader from "../../components/ImageUploader";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postCoverImage, setPostCoverImage] = useState("");

  const resetForm = () => {
    setPostTitle("");
    setPostContent("");
    setPostCategory("");
    setPostCoverImage("");
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    console.log("Post Title:", postTitle);
    console.log("Post Content:", postContent);
    console.log("Post Category:", postCategory);
    console.log("Post Cover Image:", postCoverImage);
    const res = await createPost(
      postTitle,
      postContent,
      postCategory,
      postCoverImage,
    );
    console.log(res);
    if (res._id) resetForm();
  };

  return (
    <div className="">
      <form className="space-y-5" onSubmit={handleCreatePost}>
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Create Post" />
          <button
            type="submit"
            className="bg-blue-500 text-white text-lg font-semibold px-4 py-2 min-w-[120px] rounded-xl cursor-pointer"
          >
            Create Post
          </button>
        </div>

        <ImageUploader
          onComplete={(response) => {
            console.log("Image BB response:", response);
            setPostCoverImage(response.data.display_url);
          }}
          onRemove={() => {
            setPostCoverImage("");
          }}
        />

        <div className="flex flex-col space-y-2 text-base font-normal">
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

export default CreatePost;
