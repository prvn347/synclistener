import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AppBar } from "./components/Appbar";
import { Toaster } from "sonner";
import usePreferredTheme from "./hooks/usePrefferedTheme";
import { AnimatePresence } from "framer-motion";
import { LocationProvider } from "./utils/LocationProvider";
import { RoutesWithAnimation } from "./utils/RoutesWithAnimation";
import { HeartIcon } from "lucide-react";
function App() {
  const isDark = usePreferredTheme();

  return (
    <>
      <AnimatePresence>
        <SpeedInsights />
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          {isDark ? (
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          ) : (
            <div className="relative h-full w-full bg-white">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>
          )}
        </div>
        <div className="relative mx-auto h-screen w-full max-w-7xl px-6 md:px-8 lg:px-12">
          <RecoilRoot>
            <BrowserRouter>
              <AppBar />
              <LocationProvider>
                <RoutesWithAnimation />
              </LocationProvider>
            </BrowserRouter>
          </RecoilRoot>
          <Toaster />
          <div className="  py-3 flex justify-center font-manrope text-sm font-medium">
            Made with &nbsp; <HeartIcon fill="red" size={18} /> &nbsp; by &nbsp;
            <a
              href="https://x.com/prvn347"
              className=" font-semibold text-teal-500"
            >
              Pravin
            </a>
          </div>
        </div>
        {/* <div className=" text-end">
          <button
            onClick={async () => {
              await logout();
            }}
            className=" font-manrope text-sm"
          >
            {" "}
            Log out
          </button>
        </div> */}
      </AnimatePresence>
    </>
  );
}

export default App;
