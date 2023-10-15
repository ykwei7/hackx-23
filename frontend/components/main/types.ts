export interface Report {
  id: string;
  user_id: string;
  bike_id: string;
  reported_time: string;
  description: string;
  lat: number;
  long: number;
  address: string;
  status: string;
  bike_brand: string;
  bike_model: string;
  username: string;
  image_url: string;
}
