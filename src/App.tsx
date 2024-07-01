import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { Room } from "./pages/Room";
import { RecoilRoot } from "recoil";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
