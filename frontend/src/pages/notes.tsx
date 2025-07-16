import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/notes/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

type Note = {
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
    <div className="px-5 pt-8 md:px-13 md:py-15 lg:w-[90vw] 2xl:w-[75vw] m-auto">
      <Header />

      <main className="lg:grid lg:grid-cols-3">
        {notes.map((item) => (
          <section
            key={item._id}
            className="flex flex-col justify-between shadow-md rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-300 h-full w-full min-h-50 lg:min-h-75"
          >
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </div>

            <div className="self-end space-x-4">
              <Link to="">
                <FontAwesomeIcon icon={faPencil} /> Edit
              </Link>
              <button>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </section>
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
