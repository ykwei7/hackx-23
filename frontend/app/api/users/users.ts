import axios from "axios";

const baseAPI = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:1234/";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function signup(user: any): Promise<any> {
  try {
    const response = await axios.post(`${baseAPI}users/signup`, user);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function login(user: any): Promise<any> {
  try {
    const response = await axios.post(`${baseAPI}users/login`, user);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function get_user_info(user_id: string): Promise<any> {
  try {
    const response = await axios.get(`${baseAPI}users/${user_id}`);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error logging in:", error);
    throw error;
  }
}
