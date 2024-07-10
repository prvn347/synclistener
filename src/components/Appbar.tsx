import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms";

export function AppBar() {
  const user = useRecoilValue(userState);

  return (
    <div className="  p-4 ">
      <div className=" flex justify-between ">
        <Link
          className=" font-bold text-md sm:text-2xl font-manrope dark:bg-gradient-to-r dark:from-white dark:to-teal-500  bg-gradient-to-r from-teal-700 to-black inline-block text-transparent bg-clip-text"
          to={"/"}
        >
          SyncListener
        </Link>
        <div>
          <div className=" flex gap-3 items-center">
            <Link
              to={"/join/unkwown"}
              className=" hover:shadow-[3px_3px_rgba(0,_98,_90,_0.4),_6px_6px_rgba(0,_98,_90,_0.3)] outline-none  focus:shadow-purple-700 px-2 text-sm sm:text-md py-1 sm:px-4    sm:text-md sm:py-2 font-manrope dark:text-black rounded-sm bg-black text-white dark:bg-white "
            >
              Join Room
            </Link>
            {user ? (
              <div className=" font-manrope text-sm sm:text-md  animate-pulse">
                {" "}
                Hi,{user.name}
              </div>
            ) : (
              <Link
                className=" px-2 py-1 sm:py-2 sm:px-4 text-sm sm:text-md  dark:bg-white bg-darkie text-white dark:text-black rounded-sm shadow-lg font-manrope  hover:shadow-[3px_3px_rgba(0,_98,_90,_0.4),_6px_6px_rgba(0,_98,_90,_0.3)] outline-none focus:shadow-purple-700 "
                to={"/signin"}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
