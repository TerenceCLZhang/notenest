import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

export type Inputs = {
  title: string;
  content: string;
};

const CreateNewNoteForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await api.post("/notes", data);
      navigate("/notes");
    } catch (error) {
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
          {...register("title", { required: "Title is required" })}
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
        className="black-btn btn-hover transition-animation form-submit-btn"
      />
    </form>
  );
};

export default CreateNewNoteForm;
