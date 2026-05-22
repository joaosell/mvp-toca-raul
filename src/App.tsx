import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ArtistPage from "./pages/ArtistsPage";
import VenuesPage from "./pages/VenuesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="*" element={<>404 Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
