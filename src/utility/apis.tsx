import axiosInstance from "./axiosInstance";

/**
 * API to calculate premium.
 * @param {object} data - Data object containing information for premium calculation.
 * @returns {Promise<any>} - A promise resolving to the response data from the API.
 * @throws {Error} - If an error occurs during the API request.
 * @vicky code
 */
export const calculatePremiumApi = async (data: any) => {
  try {
    const API_URL = "/api/register";
    return await axiosInstance.post(API_URL, data);
  } catch (error: any) {
    throw error;
  }
};

/**
 * Login API.
 * @param {object} data - Data object containing email and password for login.
 * @returns {Promise<any>} - A promise resolving to the response data from the API.
 * @throws {Error} - If an error occurs during the API request.
 */
export const loginApi = async (data: { email: string; password: string }) => {
  try {
    const API_URL = "/api/login";
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * API to request password reset.
 * @param {object} data - Data object containing email for password reset request.
 * @returns {Promise<any>} - A promise resolving to the response data from the API.
 * @throws {Error} - If an error occurs during the API request.
 */
export const forgetPassword = async (data: { email: string }) => {
  try {
    const API_URL = "/api/forget";
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
