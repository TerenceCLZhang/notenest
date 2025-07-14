import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Auth from "./pages/auth";
import Notes from "./pages/notes";
import CreateNote from "./pages/create_note";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/create" element={<CreateNote />} />
    </Routes>
  );
}

export default App;
