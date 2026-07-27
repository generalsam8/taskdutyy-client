import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/task-logo.svg";
import person from "../assets/person.svg";
import { MdMenu, MdClose } from "react-icons/md";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

export default function Header() {
  const context = useContext(UserContext);

if (!context) {
  return null;
}

const { user, logout } = context;

  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="border-b border-b-gray-400 py-4 px-4 md:px-16 xl:px-58 mb-28">
      <div className="flex justify-between items-center">
        <Link to="/" className="shrink-0">
          <div className="w-39.25 h-10.25">
            <img src={logo} alt="Logo" className="h-full w-auto" />
          </div>
        </Link>

        {user ? (
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/new">
              <p>New Task</p>
            </Link>

            <Link to="/all">
              <p>All Task</p>
            </Link>

            <button
              className="text-red-500 font-semibold cursor-pointer"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </button>

            <img src={person} alt="Profile" />
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <button className="bg-white border border-purple-600 text-purple-600 py-2 px-4 rounded-md text-base md:text-lg lg:text-xl hover:bg-purple-50">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-purple-600 text-white py-2 px-4 rounded-md text-base md:text-lg lg:text-xl hover:bg-purple-700">
                Register
              </button>
            </Link>
          </nav>
        )}

        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4 bg-white shadow-lg rounded-md p-4">
          {user ? (
            <>
              <Link to="/new" onClick={() => setIsOpen(false)}>
                New Task
              </Link>

              <Link to="/all" onClick={() => setIsOpen(false)}>
                All Task
              </Link>

              <img
                src={person}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />

              <button
                className="text-red-500"
                onClick={() => {
                  setShowLogoutModal(true);
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-white border border-purple-600 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-50">
                  Login
                </button>
              </Link>

              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="bg-purple-600 text-white py-2 px-2.5 rounded-md hover:bg-purple-700">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4 text-purple-500">
              Confirm Logout
            </h2>

            <p className="mb-6 text-purple-500">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                  setIsOpen(false);
                  navigate("/");
                  toast.success("You are now logged out");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}