import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({ title, onCancel, onConfirm }: Props) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 z-20 bg-white px-8 py-10 rounded-lg shadow-2xl space-y-5 w-[85%] md:w-[75%] lg:w-[50%] xl:w-[30%] dark:bg-gray-950">
      <div className="text-2xl flex gap-3 items-center">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-red-800 dark:text-red-500"
        />
        <h2 className="font-bold">Delete Note</h2>
      </div>
      <p>
        Are you sure you want to delete this note entitled: <i>{title}</i>? This
        action cannot be undone.
      </p>
      <div className="space-x-10 flex justify-between mt-10">
        <button
          type="button"
          onClick={onCancel}
          className="btn-hover transition-animation"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="hover:text-red-800 transition-animation dark:hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
