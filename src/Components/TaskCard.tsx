import { useContext, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TaskContext } from "../Context/TaskContext";

interface TaskCardProps {
  _id: string;
  title: string;
  description: string;
  tag: "urgent" | "important" | string;
  note: string;
}

export default function TaskCard({
  _id,
  title,
  description,
  tag,
  note: initialNote,
}: TaskCardProps) {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("TaskCard must be used within a TaskProvider");
  }

  const { deleteTask, updateTask } = context;

  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState(initialNote);

  const handleOnClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      await deleteTask(_id);
      console.log("Task deleted:", _id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await updateTask(_id, { note: "" });
      setNote("");
      setShowNote(false);
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className="mx-auto py-4 border border-gray-300 w-80 md:w-160 lg:w-240 xl:w-340 rounded-lg shadow-sm bg-white">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between text-right md:items-center mb-4 w-full px-6">
          <p
            className={`font-semibold px-3 py-1 rounded-md inline-block
              ${tag === "urgent" ? "text-red-600" : ""}
              ${tag === "important" ? "text-green-600" : ""}`}
          >
            {tag}
          </p>

          <div className="flex flex-row gap-3">
            <Link to={`/edit/${_id}`}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-sm transition duration-150 cursor-pointer">
                <FaRegEdit size={18} />
                Edit
              </button>
            </Link>

            <button
              onClick={handleOnClick}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-medium shadow-sm transition duration-150 cursor-pointer"
            >
              <IoTrashOutline size={18} />
              Delete
            </button>
          </div>
        </div>

        <hr className="w-full border-gray-300 mb-4" />

        <div className="px-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-3xl md:text-4xl font-semibold break-words">
              {title}
            </p>

            <p className="text-gray-600 text-lg md:text-xl break-words">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowNote((prev) => !prev)}
                disabled={!note}
                className={`py-2 px-4 rounded-md font-medium transition duration-150 cursor-pointer ${
                  note
                    ? "border border-purple-400 text-purple-700 bg-purple-50 hover:bg-purple-100"
                    : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                {note ? (showNote ? "Hide Note" : "View Note") : "No Notes"}
              </button>

              {note && (
                <button
                  onClick={handleDeleteNote}
                  className="p-2 rounded-md text-purple-500 hover:text-white hover:bg-purple-500 transition duration-150 shadow-sm cursor-pointer"
                  title="Delete Note"
                >
                  <IoTrashOutline size={20} />
                </button>
              )}
            </div>

            {note && showNote && (
              <div className="border p-3 rounded-md bg-purple-50 mt-2 max-w-xs shadow-sm">
                <p className="text-sm text-gray-700">{note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}