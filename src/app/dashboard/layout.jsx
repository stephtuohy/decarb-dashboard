import NavBar from "@/ui/NavBar/NavBar.jsx";


const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-between w-full p-6 md:p-24">
        {children}
      </main>
    </div>
  );
};

export default Layout;
