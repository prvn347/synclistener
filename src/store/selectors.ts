import { selector } from "recoil";
import { userState } from "./atoms";

export const userNameSelector = selector({
  key: "userNameSelector",
  get: ({ get }) => {
    const userName = get(userState);
    return userName?.name;
  },
});
