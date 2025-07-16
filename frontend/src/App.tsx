import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Notes from "./pages/Notes/Notes";
import CreateNote from "./pages/Notes/CreateNote";
import EditNote from "./pages/Notes/EditNote";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/create" element={<CreateNote />} />
        <Route path="/notes/edit/:id" element={<EditNote />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
