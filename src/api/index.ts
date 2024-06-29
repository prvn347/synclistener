import axios from "axios";

// const BASE_URL = process.env.BASE_URL
// console.log(process.env.BASE_URL)
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const searchVideos = async(query:string)=>{
  try {
    console.log(query + "hello")
    const resp = await axiosInstance.get(`/track/search?q=${query}`)
    
   
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while searching in");
    
  }
}