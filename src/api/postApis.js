import axiosInstance from "./axiosInstance";

/**
 * Create new post API
 */
export const createPost = async (title, content, category) => {
  try {
    const response = await axiosInstance.post("/blogs", {
      title,
      content,
      category,
    });
    return response.data;
  } catch (error) {
    // Optional: normalize error
    throw error.response?.data || { message: "create post failed" };
  }
};

/**
 * Get all post API
 */
export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get("/blogs");
    return response.data;
  } catch (error) {
    // Optional: normalize error
    throw error.response?.data || { message: "get posts failed" };
  }
};
