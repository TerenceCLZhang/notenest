import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  text: string;
  onClose: () => void;
}

const ErrorPopUp = ({ text, onClose }: Props) => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-10 flex items-center gap-5 bg-red-800 text-white p-5 rounded-lg shadow-lg">
      {text}
      <button type="button" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default ErrorPopUp;
