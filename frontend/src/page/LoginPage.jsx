import axios from "axios";
import React, { useState } from "react";
import validator from "validator";

const PatientLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validations, setValidations] = useState({
    email: null,
    password: null,
  });

  const [responseData, setResponseData] = useState(null);

  const [focusedField, setFocusedField] = useState(null);

  const [login, setLogin] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validateField = (field, value) => {
    let isValid = false;

    switch (field) {
      case "email":
        isValid = validator.isEmail(value) || value.length >= 3;
        break;
      case "password":
        isValid = value.length >= 8;
        break;
      default:
        break;
    }

    setValidations({ ...validations, [field]: isValid });
  };

  const getValidationClass = (isValid) => {
    return isValid === null
      ? ""
      : isValid
      ? "border-green-500"
      : "border-red-500";
  };

  const getIcon = (isValid) => {
    return isValid === null
      ? null
      : isValid
      ? (
          <span className="text-green-500 ml-2">&#x2714;</span>
        )
      : (
          <span className="text-red-500 ml-2">&#x2716;</span>
        );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(validations).every((isValid) => isValid);

    if (isFormValid) {
      try {
        const response = await axios.post("http://localhost:5000/api/login", formData);
        console.log(response);
        
        if (response.data.success) {
          console.log("Login successful!", response.data.msg);
          setLogin(true); 
          setResponseData(response.data.user);
          setErrorMessage(""); 
        } else {
          console.log("Invalid credentials", response.data.msg);
          setErrorMessage(response.data.msg); 
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <>
      {login ? (
        <div className="max-w-md mx-auto p-6 mt-10 rounded-lg shadow-lg bg-green-100">
          <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
            Logged in successfully!
          </h1>
          <p className="text-center">Hello {responseData.name}</p>
          <p className="text-center">Email: {responseData.email}</p>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="relative flex flex-col bg-white shadow-lg border border-slate-200 w-96 rounded-lg my-6">
            <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800 shadow">
              <h3 className="text-2xl">Sign In</h3>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div className="w-full max-w-sm min-w-[200px]">
                <label htmlFor="email" className="block mb-2 text-sm text-slate-600">
                    Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  aria-describedby="email-desc"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${getValidationClass(validations.usernameOrEmail)}`}
                  placeholder="Your Email"
                />
                {focusedField === "email" || validations.email === false ? (
                  <p id="email-desc" className="text-sm text-gray-500">
                    Enter a valid email.
                  </p>
                ) : null}
              </div>

              <div className="w-full max-w-sm min-w-[200px]">
                <label htmlFor="password" className="block mb-2 text-sm text-slate-600">
                  Password {getIcon(validations.password)}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  aria-describedby="password-desc"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${getValidationClass(validations.password)}`}
                  placeholder="Your Password"
                />
                {focusedField === "password" || validations.password === false ? (
                  <p id="password-desc" className="text-sm text-gray-500">
                    Password must be at least 8 characters.
                  </p>
                ) : null}
              </div>

              <div className="inline-flex items-center mt-2">
                <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                    id="check-2"
                  />
                  <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
                {/* <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
                  Remember Me
                </label> */}
              </div>
            </div>

            <div className="p-6 pt-0">
              <button onClick={handleSubmit} className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Sign In
              </button>
              {errorMessage && (
                <p className="mt-4 text-center text-sm text-red-500">
                  {errorMessage}
                </p>
              )}
              <p className="flex justify-center mt-6 text-sm text-slate-600">
                Don&apos;t have an account?
                <a href="#signup" className="ml-1 text-sm font-semibold text-slate-700 underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientLogin;
