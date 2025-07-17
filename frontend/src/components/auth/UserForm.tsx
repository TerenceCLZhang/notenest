import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAccessToken, setAccessToken } from "../../state/accessTokenSlice";
import { clearUsername, setUsername } from "../../state/userSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type Inputs = {
  username: string;
  password: string;
  email?: string;
};

interface Props {
  mode: "register" | "login";
}

const UserForm = ({ mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const payload = {
        username: data.username,
        password: data.password,
        ...(mode === "register" && { email: data.email }),
      };

      const response = await axios.post(
        `http://localhost:8080/auth/${mode}`,
        payload,
        { withCredentials: true }
      );

      dispatch(setUsername(data.username));
      dispatch(setAccessToken(response.data.accessToken));

      navigate("/notes");
    } catch (error) {
      let errorMsg;

      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.error || "Login failed.";
      } else {
        errorMsg = "Something went wrong. Please try again.";
      }

      setFormError(errorMsg);
      console.error(error);

      dispatch(clearUsername());
      dispatch(clearAccessToken());
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
            validate: (value) =>
              !/\s/.test(value) || "Username must not contain spaces.",
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>
      {mode === "register" && (
        <div className="form-input">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            inputMode="email"
            id="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
      )}
      <div className="form-input">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required." })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <div>
        {formError && (
          <p className="text-red-700 text-center">
            <FontAwesomeIcon icon={faCircleExclamation} /> {formError}
          </p>
        )}
        <input
          type="submit"
          value={mode
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")}
          className="black-btn btn-hover transition-animation form-submit-btn"
        />
      </div>
    </form>
  );
};

export default UserForm;
