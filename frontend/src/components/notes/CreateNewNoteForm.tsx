import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import useErrorPopup from "../../hooks/useErrorPopup";
import ErrorPopup from "../ErrorPopup";
import type { AxiosError } from "axios";

export type Inputs = {
  title: string;
  content: string;
};

const CreateNewNoteForm = () => {
  const navigate = useNavigate();

  const {
    errorText: errorPopUpText,
    setErrorText: setErrorPopUpText,
    clearError,
  } = useErrorPopup();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await api.post("/notes", data);
      navigate("/notes");
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

      <form
        className="form w-full lg:w-[75%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-input">
          <label htmlFor="title">
            <span>Title:</span>{" "}
            <span className="text-sm text-gray-500 dark:text-gray-300">
              (Max: 100 characters)
            </span>
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title must be 100 characters or less.",
              },
            })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div className="form-input">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            rows={5}
            {...register("content", { required: "Content is required" })}
          ></textarea>
          {errors.content && <p className="error">{errors.content.message}</p>}
        </div>
        <input
          type="submit"
          value="Create"
          disabled={isSubmitting}
          className="black-btn btn-hover transition-animation form-submit-btn"
        />
      </form>
    </>
  );
};

export default CreateNewNoteForm;
