import Header from "./components/header/Header";

import { Route, Routes } from "react-router-dom";
import VirtualBgHome from "./components/pages/VirutalBgHome/VirutalBgHome";
import CustomProps from "./components/pages/customProps/CustomProps";
import Assets from "./components/pages/assets/Assets";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<VirtualBgHome />} />
        <Route path="/assets/props" element={<CustomProps />} />
        <Route path="/assets/background" element={<VirtualBgHome />} />
        <Route path="/assets/filters" element={<Assets />} />
      </Routes>
    </div>
  );
}

export default App;
