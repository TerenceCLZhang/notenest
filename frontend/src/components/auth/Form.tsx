import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

interface Props {
  mode: "register" | "log in";
}

const Form = ({ mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <form
      className="w-full flex flex-col gap-5 md:gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-input">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long.",
            },
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>
      <div className="form-input">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <input
        type="submit"
        value={mode
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
        className="black-btn btn-hover transition-animation rounded-xl py-2 mt-3 font- md:py-5 md:mt-5 md:w-full xl:text-base"
      />
    </form>
  );
};

export default Form;
