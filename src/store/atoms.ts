import { atom } from "recoil";
import { SearchResult } from "../types/searchResultTypes";
import { listenerName } from "../types/listenerType";

export const searchResultState = atom<SearchResult[]>({
  key: "searchResultState", // unique ID (with respect to other atoms/selectors)
  default: [],
});

export const videoIdState = atom({
  key: "videoIdState",
  default: "",
});

export const wsState = atom<WebSocket | undefined>({
  key: "wsState",
  default: undefined,
});

export const roomDetailState = atom<ApiResponse | null>({
  key: "roomDetailState",
  default: null,
});

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const roomKeyState = atom({
  key: "roomKeyState",
  default: "",
});

export const messageState = atom<string[]>({
  key: "messageState",
  default: [],
});

export const listenerState = atom<listenerName[]>({
  key: "listenerState",
  default: [],
});
