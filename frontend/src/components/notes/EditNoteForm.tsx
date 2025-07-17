import { useForm, type SubmitHandler } from "react-hook-form";
import type { Inputs } from "./CreateNewNoteForm";
import type { Note } from "../../pages/Notes/Notes";
import api from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface Props {
  note: Note;
}

const EditNoteForm = ({ note }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await api.put(`/notes/${note._id}`, data);
      navigate("/notes");
    } catch (error) {
      alert("An unexpected error occured. Please try again.");
      console.log(error);
    }
  };

  return (
    <form className="form w-full lg:w-[75%]" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input">
        <label htmlFor="title">Title:</label>
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
        value="Save"
        className="black-btn btn-hover transition-animation form-submit-btn"
      />
    </form>
  );
};

export default EditNoteForm;
