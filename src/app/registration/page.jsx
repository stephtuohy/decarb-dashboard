"use client"
import RegistrationForm from "@/ui/registration/regFrom/regForm.jsx";
// import { useRouter } from 'next/router'; router={ router}


const Registration = () => {
  // const router = useRouter();
  return (
    <div className="relative h-screen">
    <div className="bg-white p-8 rounded-lg max-w-md mx-auto absolute inset-0 m-auto h-full sm:h-fit" >
        <RegistrationForm  />
      </div>
      </div>
  );
};

export default Registration;