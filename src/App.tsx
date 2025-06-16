import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthLogin from "./auth/login/AuthLogin";
import AuthRegister from "./auth/register/AuthRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="/about" element={<About />} /> */}

      <Route path="/auth/login" element={<AuthLogin />} />
      <Route path="/auth/register" element={<AuthRegister />} />
    </Routes>
  );
}

export default App;
