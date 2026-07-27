import { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { TaskContext } from "../Context/TaskContext";
import Loader from "../Components/Loader";

export default function AllTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("AllTask must be used inside a TaskProvider");
  }

  const { allTask, getTasks } = context;

  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      try {
        await getTasks();
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [getTasks]);

  const filteredTasks = allTask.filter(
    (task) =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase()) ||
      task.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <Loader loading={loading} />

      <div className="flex flex-row justify-between items-center gap-4 md:gap-0 py-4 px-6 md:px-58 mb-8">
        <p className="text-2xl md:text-4xl font-semibold">
          My Task
        </p>

        <Link to="/new">
          <button className="text-purple-400 bg-white font-semibold text-lg md:text-xl cursor-pointer">
            + Add New Task
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto mb-6 px-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-md md:text-2xl font-semibold"
        />
      </div>

      <div className="flex flex-col gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              _id={task._id}
              title={task.title}
              description={task.description}
              tag={task.tag}
              note={task.note}
            />
          ))
        ) : (
          <p className="text-purple-600 text-center">
            {query
              ? "No tasks match your search."
              : "No tasks yet. Add one above!"}
          </p>
        )}
      </div>
    </Layout>
  );
}