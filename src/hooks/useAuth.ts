import { useRecoilState } from "recoil";
import { userState } from "../store/atoms";
import { useEffect } from "react";
import { userDetails } from "../api";

export function useAuth() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    async function fetchUser() {
      const user = await userDetails();
      setUser(user.data.user);
    }
    fetchUser();
  }, []);

  return user;
}
