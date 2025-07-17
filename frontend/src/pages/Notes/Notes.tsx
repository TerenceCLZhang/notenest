import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/notes/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/AxiosInstance";
import NoteComponent from "../../components/notes/NoteComponent";

export type Note = {
  _id: string;
  username: string;
  title: string;
  content: string;
  createdAt: string;
  UpdatedAt: string;
  __v: number;
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="reg-page-layout">
      <Header />

      <main className="lg:grid lg:grid-cols-3">
        {notes.map((item) => (
          <NoteComponent key={item._id} item={item} />
        ))}

        <Link
          to="/notes/create"
          className="flex items-center justify-center border border-gray-500 min-h-50 lg:min-h-75 h-full w-full border-dotted rounded-2xl hover:border-black hover:border-2 hover:font-bold transition-animation"
        >
          <span className="">
            Create New Note <FontAwesomeIcon icon={faPlus} />
          </span>
        </Link>
      </main>
    </div>
  );
};

export default Notes;
