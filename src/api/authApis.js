import axiosInstance from "./axiosInstance";

/**
 * Login API
 * @param {Object} credentials - { email, password }
 * @returns Axios response data
 */
export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Optional: normalize error
    throw error.response?.data || { message: "Login failed" };
  }
};

/**
 * Register API
 * @param {Object} userData - { name, email, password }
 * @returns Axios response data
 */
export const register = async ({ name, email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};
