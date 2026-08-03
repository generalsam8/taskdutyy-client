import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";

import Layout from "../Layout/Layout";
import Loader from "../Components/Loader";
import { UserContext } from "../Context/UserContext";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}
type RegisterPayload = Omit<RegisterFormData, "confirmPassword">;

export default function Register() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Register must be used inside a UserProvider");
  }

  const { register } = context;

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formValidation = (): boolean => {
    const {
      email,
      username,
      password,
      confirmPassword,
    } = formData;

    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill all fields");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formValidation()) return;

    try {
      setLoading(true);

      // Adjust the payload if your API expects "name" instead of "username"
       const registerPayload: RegisterPayload = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      };
      await register(registerPayload);

      toast.success("Registration Successful");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Loader loading={loading} />

      <form
        className="container mx-auto flex flex-col items-center justify-center gap-12"
        onSubmit={handleSubmit}
      >
        <Link to="/">
          <div className="w-80 md:w-160 lg:w-240 xl:w-275 text-left">
            <p className="flex items-center text-4xl font-semibold">
              <MdArrowBackIos size={45} />
              Register
            </p>
          </div>
        </Link>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Email
          </span>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            className="h-14 w-full rounded-sm border border-gray-400 px-8"
            placeholder="E.g. Generalsam@gmail.com"
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Username
          </span>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleOnChange}
            className="h-14 w-full rounded-sm border border-gray-400 px-8"
            placeholder="E.g. Generalsam123333"
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Password
          </span>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            className="h-14 w-full rounded-sm border border-gray-400 px-8"
            placeholder="Not less than 8 characters"
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Confirm Password
          </span>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleOnChange}
            className="h-14 w-full rounded-sm border border-gray-400 px-8"
            placeholder="Make sure it matches the password you entered above"
          />
        </div>

        {error && (
          <p className="font-semibold text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-80 rounded-md bg-purple-600 px-4 py-4 text-white cursor-pointer md:w-160 lg:w-240 xl:w-275"
        >
          Done
        </button>
      </form>
    </Layout>
  );
}