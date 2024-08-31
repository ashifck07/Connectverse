import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar "; // Import Navbar component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const LoginSignup = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showForm, setShowForm] = useState(false); // Default to hide the form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is '/login'
  useEffect(() => {
    if (location.pathname === "/login") {
      setShowForm(true); // Show form when on the login page
    }
  }, [location]);

  // Toggle between Login and Register form
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError(null);
    setSuccess(null);
    setValidationErrors({});
  };

  // Show the form
  const showLoginForm = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let errors = {};

    if (isRegister && !formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const url = isRegister
        ? "http://localhost:3000/register"
        : "http://localhost:3000/login";
      const response = await axios.post(url, formData);
      setSuccess("Success!");

      setError(null);

      if (formData.rememberMe) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("password", formData.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      if (isRegister) {
        setTimeout(() => {
          setIsRegister(false);
          setShowForm(false); // Hide form after registration
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSuccess(null);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setFormData({
        ...formData,
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }, []);

  return (
    <div>
      {/* Include Navbar at the top */}
      <Navbar />

      {/* Main content area with a solid black background */}
      <div className="bg-black min-h-screen flex items-center justify-center">
        {!showForm ? ( // Show button to reveal the form
          <button
            onClick={showLoginForm}
            className="bg-white text-black px-8 py-4 rounded-lg"
          >
            {isRegister ? "CREATE ACCOUNT" : "LOGIN"}
          </button>
        ) : (
          <div className="flex flex-col gap-6 bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
            <h3 className="text-3xl text-center">
              {isRegister ? "Create Account" : "Login"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isRegister && (
                <div className="flex items-center border-b border-gray-300 py-2">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-500 mr-2"
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`text-lg px-4 py-2 border-b ${
                      validationErrors.username
                        ? "border-red-500"
                        : "border-gray-700"
                    } bg-transparent focus:outline-none flex-1`}
                  />
                  {validationErrors.username && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.username}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center border-b border-gray-300 py-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-500 mr-2"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`text-lg px-4 py-2 border-b ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-gray-700"
                  } bg-transparent focus:outline-none flex-1`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className="relative flex items-center border-b border-gray-300 py-2">
                <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`text-lg px-4 py-2 border-b ${
                    validationErrors.password
                      ? "border-red-500"
                      : "border-gray-700"
                  } bg-transparent focus:outline-none flex-1`}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-0 top-0 mt-2 mr-4 text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                  />
                </button>
                {validationErrors.password && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.password}
                  </p>
                )}
              </div>
              {!isRegister && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && (
                <p className="text-green-500 text-center">{success}</p>
              )}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full h-12 bg-black text-white rounded-lg"
                >
                  {isRegister ? "CREATE ACCOUNT" : "LOGIN"}
                </button>
                {!isRegister && (
                  <Link
                    to="/forgot-password"
                    className="w-full h-12 bg-transparent text-black border border-gray-700 rounded-lg flex items-center justify-center mt-4"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="text-center mt-6">
                <p>
                  {isRegister ? (
                    <>
                      Already Have an Account?{" "}
                      <a
                        href="#"
                        onClick={toggleForm}
                        className="text-blue-500"
                      >
                        Sign in
                      </a>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <a
                        href="#"
                        onClick={toggleForm}
                        className="text-blue-500"
                      >
                        Create one
                      </a>
                    </>
                  )}
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
