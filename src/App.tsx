import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/PetsLandingPage";
import AuthLogin from "./auth/login/AuthLogin";
import AuthRegister from "./auth/register/AuthRegister";
import PetAdoptionAdmin from "./pages/admin/AdminLandingPage";
import UserDashboard from "./pages/user/UserLandingPage";
import ModeratorDashboard from "./pages/moderator/ModeratorLandingPage";
import AdminLoginPage from "./auth/admin/AdminLogin";
import AdminRegisterPage from "./auth/admin/AdminRegister";
import ModeratorLoginPage from "./auth/moderator/ModeratorLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="/about" element={<About />} /> */}

      <Route path="/auth/admin-login" element={<AdminLoginPage/>} />
      <Route path="/auth/admin-register" element={<AdminRegisterPage/>} />
      <Route path="/auth/moderator-login" element={<ModeratorLoginPage/>} />
      <Route path="/auth/user-login" element={<AuthLogin />} />
      <Route path="/auth/user-register" element={<AuthRegister />} />
      <Route path="/admin-page" element={<PetAdoptionAdmin />} />
      <Route path="/user-page" element={<UserDashboard />} />
      <Route path="/moderator-page" element={<ModeratorDashboard />} />
    </Routes>
  );
}

export default App;
