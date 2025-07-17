import EditNoteForm from "../../components/notes/EditNoteForm";
import Header from "../../components/notes/Header";
import { useLocation } from "react-router-dom";
import type { Note } from "./Notes";
import BackBtn from "../../components/notes/BackBtn";

const EditNote = () => {
  const location = useLocation();
  const { note } = location.state as { note: Note };

  return (
    <div className="reg-page-layout">
      <Header />
      <main className="gap-7">
        <BackBtn />
        <h2 className="font-bold text-3xl xl:text-5xl">Edit Note</h2>
        <EditNoteForm note={note} />
      </main>
    </div>
  );
};

export default EditNote;
