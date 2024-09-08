"use client"
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import styles from './reg.module.css';

export default function RegistrationForm({ router }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    entityType: "ENTERPRISE",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
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
      // Perform registration logic
      // If successful:
      router.push("/verification"); // Redirect to the verification page
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className={styles.cardH2}>Register</h2>
      <p className={styles.cardSubCopy}>
        Already have an account? <span>Login</span>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="w-1/2">
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
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>

          <div className="w-1/2">
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
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div>
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
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
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

        <div>
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
            className="absolute right-3 top-2 text-gray-500 cursor-pointer"
          >
            {passwordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </div>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-6 relative">
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
            className="absolute right-3 top-2 text-gray-500 cursor-pointer"
          >
            {confirmPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </div>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
