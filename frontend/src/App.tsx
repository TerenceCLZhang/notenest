import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Auth from "./pages/auth";
import Notes from "./pages/notes";
import CreateNote from "./pages/create_note";
import EditNote from "./pages/edit_note";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/create" element={<CreateNote />} />
      <Route path="/notes/edit/:id" element={<EditNote />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
