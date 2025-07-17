import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import type { Note } from "../../pages/Notes/Notes";
import api from "../../utils/AxiosInstance";

interface Props {
  item: Note;
}

const NoteComponent = ({ item }: Props) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/notes/${item._id}`);
      navigate(0);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <section className="flex flex-col justify-between shadow-md rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-300 h-full w-full min-h-50 lg:min-h-75">
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {item.title}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {item.content}
        </p>
      </div>

      <div className="self-end space-x-4">
        <Link
          to={`/notes/edit/${item._id}`}
          state={{ note: item }}
          className="btn-hover transition-animation"
        >
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </Link>
        <button
          onClick={handleDelete}
          className="hover:text-red-500 hover:opacity-95 transition-animation"
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </section>
  );
};

export default NoteComponent;
