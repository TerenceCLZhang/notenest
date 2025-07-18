import EditNoteForm from "../../components/notes/EditNoteForm";
import Header from "../../components/notes/Header";
import { Link, useParams } from "react-router-dom";
import type { Note } from "./Notes";
import BackBtn from "../../components/notes/BackBtn";
import { useEffect, useState } from "react";
import api from "../../utils/AxiosInstance";

const EditNote = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await api.get(`/notes/${id}`);
        console.log(fetchedNote);
        setNote(fetchedNote.data);
      } catch (error) {
        setErrorLoading(true);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <div className="reg-page-layout">
      <Header />
      <main className="gap-7">
        {!errorLoading && <BackBtn />}
        <h2 className="font-bold text-3xl xl:text-5xl">
          {!errorLoading ? "Edit Note" : "Note Does Not Exist"}
        </h2>
        {note ? (
          <EditNoteForm note={note} />
        ) : errorLoading ? (
          <Link to={"/"} className="black-btn btn-hover transition-animation">
            Go Home
          </Link>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default EditNote;
