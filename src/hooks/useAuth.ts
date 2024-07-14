import { useRecoilState } from "recoil";
import { userState } from "../store/atoms";
import { useEffect, useState } from "react";
import { userDetails } from "../api";

export function useAuth() {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await userDetails();
        setUser((prevState) => ({
          ...prevState,
          ...users.data.user,
        }));
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading, error };
}
