import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.name) {
      navigate("/home");
    }
  }, []);

  return (
    <div className=" flex justify-center font-manrope  min-h-screen  ">
      <div className=" flex flex-col justify-center">
        <div className="  text-6xl font-medium text-gray-900 dark:text-gray-50   ">
          hi there ,<br />
          welcome to{" "}
          <span className="bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400 ">
            synclistener
          </span>
        </div>
        <div className=" p-5 text-lg ">
          {/* a simple voice room where you can listen to music together with sync. */}
          Enjoy music and watch videos in sync with your loved ones
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/waitlist");
            }}
            className=" m-2 hover:hover:shadow-[3px_3px_rgba(0,_98,_90,_0.4),_6px_6px_rgba(0,_98,_90,_0.3)] outline-none  focus:shadow-purple-700  px-4 text-black dark:text-white rounded-sm hover: border dark:border-neutral-200 text-xl font-manrope font-semibold py-2"
          >
            Join waitlist
          </button>

          <button
            onClick={() => {
              navigate("/signup");
            }}
            className=" m-2 hover:hover:shadow-[3px_3px_rgba(0,_98,_90,_0.4),_6px_6px_rgba(0,_98,_90,_0.3)] outline-none  focus:shadow-purple-700  px-4 text-white dark:text-black rounded-sm hover: bg-black dark:bg-white text-xl font-manrope font-semibold py-2"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
