import axios from "axios";

const baseAPI = "http://localhost:1234/";

interface Report {
  user_id: string, 
  bike_id: string, 
  description: string, 
  lat: number, 
  long: number, 
};

export async function get_all_reports(): Promise<any> {
  try {
    const response = await axios.get(`${baseAPI}reports`);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error getting reports:", error);
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
    console.error("Error getting bicycles:", error);
    throw error;
  }
}

export async function addReport(report: Report): Promise<any> {
  try {
    const response = await axios.post(`${baseAPI}reports/`, report);
    return response.data;
  } catch (error) {
    // Handle error, e.g., log it or return an error message
    console.error("Error adding report:", error);
    throw error;
  }
}
