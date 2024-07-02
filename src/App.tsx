import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { Room } from "./pages/Room";
import { RecoilRoot } from "recoil";
import { Home } from "./pages/Home";
import usePreferredTheme from "./hooks/usePrefferedTheme";

function App() {
  const isDark = usePreferredTheme();
  return (
    <>
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
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/room/:id" element={<Room />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
