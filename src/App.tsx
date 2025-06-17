import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/PetsLandingPage";
import AuthLogin from "./auth/login/AuthLogin";
import AuthRegister from "./auth/register/AuthRegister";
import PetAdoptionAdmin from "./pages/admin/AdminLandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="/about" element={<About />} /> */}

      <Route path="/auth/login" element={<AuthLogin />} />
      <Route path="/auth/register" element={<AuthRegister />} />
      <Route path="/admin-page" element={<PetAdoptionAdmin />} />
    </Routes>
  );
}

export default App;
