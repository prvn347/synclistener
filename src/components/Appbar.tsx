import { BrowserRouter, Link } from "react-router-dom";

export function AppBar() {
  return (
    <BrowserRouter>
      <div className="  p-4 ">
        <div className=" flex justify-between ">
          <div className=" font-bold text-2xl font-manrope  bg-gradient-to-r from-violet-100 to-green-500 inline-block text-transparent bg-clip-text">
            SyncListener
          </div>
          <div>
            <Link
              className=" py-2 px-4  dark:bg-white dark:text-black rounded-md shadow-lg font-manrope  "
              to={"/signin"}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
