import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import desktop from "../assets/personal-tasks.svg";
import { UserContext } from "../Context/UserContext";

export default function Home() {
  const navigate = useNavigate();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Home must be used inside a UserProvider");
  }

  const { user } = context;

  const handleOnClick = () => {
    navigate(user ? "/all" : "/login");
  };

  return (
    <Layout>
      <section className="min-h-[82vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

            {/* Left Side */}
            <div className="max-w-md">
              <h1 className="text-[52px] leading-tight font-semibold text-gray-900">
                Manage your Tasks on
                <br />
                <span className="text-purple-400">
                  TaskDuty
                </span>
              </h1>

              <p className="mt-8 text-gray-600 text-lg leading-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Non tellus, sapien, morbi ante nunc euismod ac felis ac.
                Massa et, at platea tempus duis non eget. Hendrerit tortor
                fermentum bibendum mi nisl semper porttitor. Nec accumsan.
              </p>

              <button
                onClick={handleOnClick}
                className="mt-8 bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-md font-medium transition duration-300"
              >
                Go to My Task
              </button>
            </div>

            {/* Right Side */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={desktop}
                alt="TaskDuty"
                className="w-[460px] xl:w-[500px] h-auto"
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}