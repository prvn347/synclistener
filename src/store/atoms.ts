import { atom } from "recoil";
import { SearchResult } from "../types/searchResultTypes";



export const searchResultState  = atom<SearchResult[]>({
    key: 'searchResultState', // unique ID (with respect to other atoms/selectors)
  default: [], 
})