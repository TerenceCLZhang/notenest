import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Auth from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
