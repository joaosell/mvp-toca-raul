import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ArtistPage from "./pages/ArtistsPage";
import VenuesPage from "./pages/VenuesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getAuthenticatedHomePath } from "./services/authService";

function HomeRedirect() {
  return <Navigate to={getAuthenticatedHomePath()} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="*" element={<>404 Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
