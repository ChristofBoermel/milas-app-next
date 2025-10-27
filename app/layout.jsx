import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";

const MainLayout = ({ children }) => {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Macondo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-900">
        <LanguageProvider>
          <Navbar></Navbar>
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
};

export default MainLayout;
