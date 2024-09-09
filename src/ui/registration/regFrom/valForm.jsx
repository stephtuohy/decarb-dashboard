import { useState, useRef } from "react";
import styles from "./reg.module.css";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/ui/loaders/Spinner";

export default function ValidationForm() {
  const [pin, setPin] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const router = useRouter();

  const validatePin = () => {
    const enteredPin = pin.join("");
    const newErrors = {};

    if (!enteredPin || enteredPin.length !== 5) {
      newErrors.pin = "Please enter a valid 5-digit verification code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     

    if (!validatePin()) {
      return
    };

    const enteredPin = pin.join("");
    setLoading(true); 
    try {
      //  Mock API here
      const response = await fetch("/api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: enteredPin }),
      });

      const data = await response.json();

      if (data.success) {
        // setUse
        handleLogin();
        router.push("/dashboard");
      } else {
       setServerError(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setServerError("An error occurred. Please try again.");
    } finally {
        setLoading(false); 
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Input is number
    if (!isNaN(value) && value.length === 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setErrors({}); //reset errors when typing agains

      // Move focus to next input
      if (index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newPin = [...pin];
      newPin[index] = "";
      setPin(newPin);
      

      // Move focus to previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div>
      <h2 className={styles.cardH2}>Register</h2>
      <p className={styles.cardSubCopy}>
        Please enter the 5-digit verification code sent via email.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={styles.pinInpt}
            />
          ))}
        </div>
        {errors.pin && <p className={styles.inputErrCenter}>{errors.pin}</p>}

        <button className="mt-4" type="submit"  disabled={loading}> {loading ? <Spinner /> : 'Validate'}</button>

      {serverError && <p className={styles.inputErrCenter}>{serverError}</p>}

        <p className={styles.cardSubCopy2}>
          Didn't get the code? <span className="font-bold cursor-pointer">Resend</span>
        </p>
      </form>
    </div>
  );
}
