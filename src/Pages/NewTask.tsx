import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

import Layout from "../Layout/Layout";
import {
  TaskContext,
  type CreateTaskData,
} from "../Context/TaskContext";

export default function NewTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("NewTask must be used inside a TaskProvider");
  }

  const { createTask } = context;

  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    tag: "",
    note: "",
  });

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formValidation = (): boolean => {
    const { title, description, tag } = formData;

    if (!title || !description || !tag) {
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
      await createTask(formData);
      navigate("/all");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <Layout>
      <form
        className="container mx-auto flex flex-col items-center justify-center gap-12"
        onSubmit={handleSubmit}
      >
        <Link to="/">
          <div className="w-80 md:w-160 lg:w-240 xl:w-275 text-left">
            <p className="flex items-center text-4xl font-semibold">
              <MdArrowBackIos size={45} />
              New Task
            </p>
          </div>
        </Link>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-400">
            Task
          </span>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleOnChange}
            className="h-14 w-full rounded-sm border border-gray-400 px-8"
            placeholder="E.g. Project Defence, Assignment..."
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-400">
            Description
          </span>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            className="h-40 w-full resize-none rounded-sm border border-gray-400 px-8 py-4"
            placeholder="Briefly describe your task..."
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-400">
            Tags
          </span>

          <select
            name="tag"
            value={formData.tag}
            onChange={handleOnChange}
            className="w-full rounded-sm border border-gray-400 px-8 py-4"
          >
            <option value="">Select a tag</option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
          </select>
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-400">
            Notes (Optional)
          </span>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleOnChange}
            className="h-14 w-full resize-none rounded-sm border border-gray-400 px-8 py-4"
            placeholder="Optional"
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

        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="cursor-pointer"
        >
          <span className="font-semibold text-purple-400 underline">
            Back to Top
          </span>
        </button>
      </form>
    </Layout>
  );
}