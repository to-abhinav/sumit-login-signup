import axios from "axios";
import React, { useState } from "react";
import validator from "validator";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    email: "",
    password: "",
    name: "",
  });

  const [validations, setValidations] = useState({
    dateOfBirth: null,
    email: null,
    password: null,
    name: null,
  });

  const [focusedField, setFocusedField] = useState(null);
  const [backendErrors, setBackendErrors] = useState([]);

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
      case "dateOfBirth":
        isValid = validator.isDate(value);
        break;
      case "email":
        isValid = validator.isEmail(value);
        break;
      case "password":
        isValid = validator.isStrongPassword(value);
        break;
      case "name":
        isValid = value.length >= 3 && /^[A-Za-z\s]+$/.test(value);
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
      ? <span className="text-green-500">&#x2714;</span>
      : <span className="text-red-500">&#x2716;</span>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(validations).every((isValid) => isValid);
    if (isFormValid) {
      try {
        const response = await axios.post("http://localhost:5000/api/signup", formData);
        alert("Form submitted successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Backend validation errors", error.response.data.errors);
        setBackendErrors(error.response.data.errors || []);
      }
    } else {
      alert("Form has errors. Please check the fields.");
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col bg-white shadow-lg border border-slate-200 w-96 rounded-lg my-6">
        <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
          <h3 className="text-2xl">Register</h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          {/* Name */}
          <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="name" className="block mb-2 text-sm text-slate-600">
              Full Name {getIcon(validations.name)}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              aria-describedby="name-desc"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${getValidationClass(validations.name)}`}
              placeholder="Your Full Name"
            />
            {(focusedField === "name" || validations.name === false) && (
              <p id="name-desc" className="text-sm text-gray-500">
                Name must be at least 3 characters and contain only letters.
              </p>
            )}
          </div>

          {/* Username */}
          

          {/* Date of Birth */}
          <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="dateOfBirth" className="block mb-2 text-sm text-slate-600">
              Date of Birth {getIcon(validations.dateOfBirth)}
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              aria-describedby="dob-desc"
              value={formData.dateOfBirth}
              onChange={handleChange}
              onFocus={() => handleFocus("dateOfBirth")}
              onBlur={handleBlur}
              className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${getValidationClass(validations.dateOfBirth)}`}
            />
            {(focusedField === "dateOfBirth" || validations.dateOfBirth === false) && (
              <p id="dob-desc" className="text-sm text-gray-500">
                Please enter a valid date.
              </p>
            )}
          </div>

          {/* Email */}
          <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="email" className="block mb-2 text-sm text-slate-600">
              Email {getIcon(validations.email)}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              aria-describedby="email-desc"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${getValidationClass(validations.email)}`}
              placeholder="Your Email"
            />
            {(focusedField === "email" || validations.email === false) && (
              <p id="email-desc" className="text-sm text-gray-500">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Password */}
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
            {(focusedField === "password" || validations.password === false) && (
              <p id="password-desc" className="text-sm text-gray-500">
                Must be 8+ characters, with a number, uppercase, lowercase, and special character.
              </p>
            )}
          </div>

          {/* Backend Errors */}
          {backendErrors.length > 0 && (
            <div className="text-red-500 mb-4">
              {backendErrors.map((error, idx) => (
                <p key={idx}>{error.msg}</p>
              ))}
            </div>
          )}

          {/* Submit */}
          <div className="p-6 pt-0">
            <button
              className={`w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none ${
                Object.values(validations).every((isValid) => isValid)
                  ? ""
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!Object.values(validations).every((isValid) => isValid)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PatientRegister;
