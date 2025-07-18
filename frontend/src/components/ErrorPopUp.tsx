import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  text: string;
  onClose: () => void;
}

const ErrorPopup = ({ text, onClose }: Props) => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-10 flex items-center gap-5 bg-red-800 text-white p-5 rounded-lg shadow-lg w-[85%] md:w-fit z-5">
      {text}
      <button type="button" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default ErrorPopup;
