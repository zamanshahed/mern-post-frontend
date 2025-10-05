import axiosInstance from "./axiosInstance";

/**
 * Create new post API
 */
export const createPost = async (title, content, category, coverImage = "") => {
  try {
    const response = await axiosInstance.post("/blogs", {
      title,
      content,
      category,
      coverImage,
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

/**
 * Get post Details
 */
export const getPostDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    // Optional: normalize error
    throw error.response?.data || { message: "get post details failed" };
  }
};

/**
 * Update post API
 */
export const updatePost = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/blogs/${id}`, data);
    return response.data;
  } catch (error) {
    // Optional: normalize error
    throw error.response?.data || { message: "update post failed" };
  }
};

/**
 * Update post API
 */
export const deletePost = async (id) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    return response;
  } catch (error) {
    // Optional: normalize error
    throw error.response?.data || { message: "update post failed" };
  }
};
