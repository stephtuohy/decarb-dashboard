"use client";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import styles from "./reg.module.css";
import { useRouter } from "next/navigation";
import Spinner from "@/ui/loaders/Spinner";

export default function RegistrationForm() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    entityType: "ENTERPRISE",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return reg.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    if (!validatePassword(formData.password))
      newErrors.password =
        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); 

      try {
        const response = await fetch("/api/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          sessionStorage.setItem('userName', formData.firstName);
          router.push("/verification");
        } else {
          const errorData = await response.json();
          console.error("Registration failed:", errorData);
          throw new Error(errorData.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: error.message || "An unexpected error occurred. Please try again.",
        }));
      } finally {
        setLoading(false); 
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

      // Clear errors for iinputs
    if (e.target.name === "firstName" && errors.firstName) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: undefined }));
    }
    if (e.target.name === "lastName" && errors.lastName) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: undefined }));
    }
    if (e.target.name === "email" && errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
    }
    if (e.target.name === "password" && errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    }
    if (e.target.name === "confirmPassword" && errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: undefined }));
    }
  };

  return (
    <div>
      <h2 className={styles.cardH2}>Register</h2>
      <p className={styles.cardSubCopy}>
        Already have an account? <span>Login</span>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="w-1/2 inputDiv">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 w-full"
            />
            {errors.firstName && (
              <p className={styles.inputErr}>{errors.firstName}</p>
            )}
          </div>

          <div className="w-1/2 inputDiv">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 w-full"
            />
            {errors.lastName && (
              <p className={styles.inputErr}>{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.email && <p className={styles.inputErr}>{errors.email}</p>}
        </div>

        <div className="inputDiv">
          <label htmlFor="entityType">Entity Type</label>
          <select
            id="entityType"
            name="entityType"
            value={formData.entityType}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option>Enterprise</option>
            <option>Financier</option>
            <option>Developer</option>
          </select>
        </div>

        <div className="inputDiv">
          <label htmlFor="password">Set Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 w-full"
          />
          <div
            onClick={() => setPasswordVisible(!passwordVisible)}
            className={styles.passEye}
          >
            {passwordVisible ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </div>
          {errors.password && <p className={styles.inputErr}>{errors.password}</p>}
        </div>

        <div className="inputDiv ">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="border p-2 w-full"
          />
          <div
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
             className={styles.passEye}
          >
            {confirmPasswordVisible ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </div>
          {errors.confirmPassword && (
            <p className={styles.inputErr}>{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <Spinner /> : 'Register'}
        </button>
        {errors.form && <p className={styles.inputErrCenter}>{errors.form}</p>}

      </form>
    </div>
  );
}
