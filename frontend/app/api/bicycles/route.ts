import axios from "axios";

const baseAPI = "http://localhost:1234/";

export async function getUserBicycles(userid: string): Promise<any> {
  try {
    const response = await axios.get(`${baseAPI}bicycles?user_id=${userid}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving user bicycles:", error);
    throw error;
  }
}

export async function addUserBicycle(user: any): Promise<any> {
  try {
    const response = await axios.post(`${baseAPI}users/login`, user);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function addUserBicycleWithImage(form_data: any): Promise<any> {
  try {
    const response = await axios.post(`${baseAPI}bicycles/`, form_data);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error logging in:", error);
    throw error;
  }
}
