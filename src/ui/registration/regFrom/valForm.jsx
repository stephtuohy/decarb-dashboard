
import { useState, useRef } from "react";
import styles from './reg.module.css'

export default function RegistrationForm({ router }) {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);



const [pin, setPin] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure input is a number
    if (!isNaN(value) && value.length === 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

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
        Please enter the 5-digit verification code sent via email to ex******@mail.com 
      </p>
      
      <form>
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

      <button>Validate</button>
 
      <p className={styles.cardSubCopy2}>
      Didn't get the code? <span>Resend</span>
      </p>
    
      </form>
    </div>

  );
}


