import axios from "axios";
import { roomMetaType } from "../types/roomTypes";
import { postType } from "../components/Auth/Authentication";

export const axiosInstance = axios.create({
  baseURL: "https://synclistener-backend.onrender.com",

  withCredentials: true,
});

export const searchVideos = async (query: string) => {
  try {
    console.log(query + "hello");
    const resp = await axiosInstance.get(`/track/search?q=${query}`);

    return resp;
  } catch (error) {
    throw new Error("Something went wrong while searching in");
  }
};
export const createRoom = async (roomMeta: roomMetaType) => {
  try {
    const resp = await axiosInstance.post("/room/create", roomMeta);
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while creating room");
  }
};

export const joinRoom = async (roomKey: string) => {
  try {
    const resp = await axiosInstance.post("/room/join", { roomKey });
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while joining room");
  }
};

export const createUser = async (postMeta: postType) => {
  try {
    const resp = await axiosInstance.post("/user/signup", postMeta);
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while creating user");
  }
};
export const findUser = async (postMeta: postType) => {
  try {
    const resp = await axiosInstance.post("/user/signin", postMeta);
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while finding user");
  }
};
export const RoomDetails = async (roomKey: string) => {
  try {
    const resp = await axiosInstance.get(`/room/details?q=${roomKey}`);
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while finding user");
  }
};
export const userDetails = async () => {
  try {
    const resp = await axiosInstance.get("/user/protected");
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while finding user");
  }
};

export const sendWaitlist = async (email: string) => {
  try {
    const resp = await axiosInstance.post("/user/waitlist", { email: email });
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while sending waitlist");
  }
};
export const pupulateRoom = async () => {
  try {
    const resp = await axiosInstance.get("/user/rooms");
    return resp;
  } catch (error) {
    throw new Error("Something went wrong while sending waitlist");
  }
};
