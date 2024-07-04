import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms";

export function AppBar() {
  const user = useRecoilValue(userState);

  return (
    <div className="  p-4 ">
      <div className=" flex justify-between ">
        <Link
          className=" font-bold text-2xl font-manrope  bg-gradient-to-r from-violet-100 to-green-500 inline-block text-transparent bg-clip-text"
          to={"/"}
        >
          SyncListener
        </Link>
        <div>
          {user ? (
            <div className=" font-manrope text-lg animate-pulse">
              {" "}
              Hello,{user.name}
            </div>
          ) : (
            <Link
              className=" py-2 px-4  dark:bg-white dark:text-black rounded-md shadow-lg font-manrope  "
              to={"/signin"}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
