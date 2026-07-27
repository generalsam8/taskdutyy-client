import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import Loader from "../Components/Loader";
import { UserContext } from "../Context/UserContext";
import type { LoginRegisterData } from "../Context/UserContext";


export default function Login() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Login must be used inside a UserProvider");
  }

  const { login } = context;

  const [formData, setFormData] = useState<LoginRegisterData>({
  email: "",
  password: "",
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
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill all fields");
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

      await login(formData);

      toast.success("Login Successful");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message ?? "Login failed");
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
              Login
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
            Password
          </span>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            className="h-14 w-full rounded-sm border border-gray-400 px-8"
            placeholder="Enter your password"
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
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-500 underline"
          >
            Click here to register.
          </Link>
        </p>
      </form>
    </Layout>
  );
}