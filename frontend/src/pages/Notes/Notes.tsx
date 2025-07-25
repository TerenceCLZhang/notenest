import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/notes/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/AxiosInstance";
import NoteComponent from "../../components/notes/NoteComponent";
import ErrorPopup from "../../components/ErrorPopup";
import useErrorPopup from "../../hooks/useErrorPopup";
import type { AxiosError } from "axios";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    errorText: errorPopUpText,
    setErrorText: setErrorPopUpText,
    clearError,
  } = useErrorPopup();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/notes");
        setNotes(response.data);
      } catch (err) {
        const error = err as AxiosError<{ error?: string }>;
        const errorMsg =
          error?.response?.data?.error ||
          "Something went wrong. Please try again.";

        setErrorPopUpText(errorMsg);
        console.error(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.content}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {noteToDelete && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/50 z-10 dark:bg-gray-700/50"></div>
      )}

      {errorPopUpText && (
        <ErrorPopup text={errorPopUpText} onClose={clearError} />
      )}

      <div className="reg-page-layout">
        <Header />

        <main>
          <div className="w-[65%] lg:w-[50%] form-input flex-row relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-5 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              name="search"
              id="search"
              className="px-13"
              value={searchQuery}
              placeholder="Search notes..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                className="hover:text-red-800 transition-animation absolute right-5 top-1/2 -translate-1/2 dark:hover:text-red-500"
                onClick={() => setSearchQuery("")}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="w-full flex flex-col gap-5 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-15">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((item) => (
                  <NoteComponent
                    key={item._id}
                    item={item}
                    noteToDelete={noteToDelete}
                    setNoteToDelete={setNoteToDelete}
                  />
                ))
              ) : searchQuery ? (
                <div className="col-span-full text-center text-gray-600 text-lg italic dark:text-white">
                  No results found for "
                  <span className="font-semibold">{searchQuery}</span>"
                </div>
              ) : null}
              {!searchQuery && (
                <Link
                  to="/notes/create"
                  className="flex items-center justify-center border border-gray-500 min-h-50 lg:min-h-75 h-full w-full border-dotted rounded-2xl hover:border-black hover:border-2 hover:font-bold transition-animation dark:border-gray-300 dark:hover:border-white"
                >
                  <span className="">
                    Create New Note <FontAwesomeIcon icon={faPlus} />
                  </span>
                </Link>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Notes;
