import { useForm, type SubmitHandler } from "react-hook-form";
import Header from "../components/notes/Header";

type Inputs = {
  title: string;
  content: string;
};

const CreateNote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <div className="reg-page-layout">
      <Header />
      <main>
        <h2 className="font-bold text-3xl xl:text-5xl">Create New Note</h2>
        <form
          className="form w-full lg:w-[75%]"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            {errors.content && (
              <p className="error">{errors.content.message}</p>
            )}
          </div>
          <input
            type="submit"
            value="Create"
            className="black-btn btn-hover transition-animation form-submit-btn"
          />
        </form>
      </main>
    </div>
  );
};

export default CreateNote;
