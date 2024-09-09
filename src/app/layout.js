import { Inter } from "next/font/google";
import "@/ui/globals.css";
import { AuthProvider } from "./contexts/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Decarb.Earth Dashboard",
  description: "Dashboard with registration and verificatoin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
