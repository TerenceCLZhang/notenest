import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import type { Note } from "../../pages/Notes/Notes";
import api from "../../utils/AxiosInstance";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import useErrorPopup from "../../hooks/useErrorPopup";
import type { AxiosError } from "axios";
import ErrorPopup from "../ErrorPopup";

interface Props {
  item: Note;
  noteToDelete: Note | null;
  setNoteToDelete: React.Dispatch<React.SetStateAction<Note | null>>;
}

const NoteComponent = ({ item, noteToDelete, setNoteToDelete }: Props) => {
  const navigate = useNavigate();

  const {
    errorText: errorPopUpText,
    setErrorText: setErrorPopUpText,
    clearError,
  } = useErrorPopup();

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${item._id}`);
      navigate(0);
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      const errorMsg =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";

      setErrorPopUpText(errorMsg);
      console.error(error);
    }
  };

  return (
    <>
      {errorPopUpText && (
        <ErrorPopup text={errorPopUpText} onClose={clearError} />
      )}

      {noteToDelete === item && (
        <DeleteConfirmationModal
          title={item.title}
          onCancel={() => setNoteToDelete(null)}
          onConfirm={handleDelete}
        />
      )}

      <section className="flex flex-col gap-5 justify-between shadow-md rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-300 h-full w-full min-h-50 lg:min-h-75 dark:bg-gray-900 dark:border-gray-700">
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 break-words whitespace-pre-wrap dark:text-white">
            {item.title}
          </h2>
          <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap dark:text-white">
            {item.content}
          </p>
        </div>

        <div className="self-end space-x-4">
          <Link
            to={`/notes/edit/${item._id}`}
            className="btn-hover transition-animation"
          >
            <FontAwesomeIcon icon={faPenToSquare} /> Edit
          </Link>
          <button
            type="button"
            onClick={() => setNoteToDelete(item)}
            className="hover:text-red-800 hover:opacity-95 transition-animation dark:hover:text-red-500"
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
      </section>
    </>
  );
};

export default NoteComponent;
