import axios from "axios";

const baseAPI = "http://localhost:1234/";

export async function get_all_reports(): Promise<any> {
  try {
    const response = await axios.get(`${baseAPI}reports`);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function get_all_bicycles(user_id: string): Promise<any> {
  try {
    const response = await axios.get(`${baseAPI}users/${user_id}/bicycles`, {
      user_id: user_id,
    });
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error signing up:", error);
    throw error;
  }
}
