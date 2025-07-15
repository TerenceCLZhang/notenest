import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
};

interface Props {
  mode: "register" | "log in";
}

const UserForm = ({ mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: data.username,
        password: data.password,
      });

      navigate("/notes");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.error || "Login failed.";
        alert(errorMsg);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <form className="w-full form" onSubmit={handleSubmit(onSubmit)}>
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
        className="black-btn btn-hover transition-animation form-submit-btn"
      />
    </form>
  );
};

export default UserForm;
