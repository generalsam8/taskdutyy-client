import { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import {
  TaskContext,
  type UpdateTaskData,
} from "../Context/TaskContext";

export default function EditTask() {
  const [formData, setFormData] = useState<UpdateTaskData>({
    title: "",
    description: "",
    tag: "",
    note: "",
  });

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("EditTask must be used inside a TaskProvider");
  }

  const { updateTask, allTask } = context;

  useEffect(() => {
    if (!id) return;

    const task = allTask.find((task) => task._id === id);

    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        tag: task.tag,
        note: task.note,
      });
    }
  }, [id, allTask]);

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

    if (!id) {
      setError("Invalid task ID");
      return;
    }

    try {
      await updateTask(id, formData);
      navigate("/all");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <Layout>
      <form
        className="flex flex-col justify-center items-center gap-12 container mx-auto"
        onSubmit={handleSubmit}
      >
        <Link to="/all">
          <div className="w-80 md:w-160 lg:w-240 xl:w-275 text-left">
            <p className="font-semibold text-4xl flex items-center">
              <MdArrowBackIos size={45} />
              Edit Task
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
            className="border border-gray-400 w-full h-14 rounded-sm px-8"
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
            className="border border-gray-400 w-full h-40 rounded-sm px-8 py-4 resize-none"
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
            className="border border-gray-400 w-full py-4 rounded-sm px-8"
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
            className="border border-gray-400 w-full h-14 rounded-sm px-8 py-4 resize-none"
            placeholder="Optional"
          />
        </div>

        {error && (
          <p className="text-red-500 font-semibold">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-80 md:w-160 lg:w-240 xl:w-275 bg-purple-600 rounded-md py-4 px-4 text-white cursor-pointer"
        >
          Update
        </button>
      </form>
    </Layout>
  );
}