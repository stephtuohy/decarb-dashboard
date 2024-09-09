// import Registration from "@/app/pages/registration";
"use client";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./dashboard/page";
import Registration from "./registration/page";

const App = () => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <Dashboard /> : <Registration />}</>;
};

export default App;
