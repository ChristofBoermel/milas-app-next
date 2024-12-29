import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import stars from "@/public/images/stars.jpeg";

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
      <body className=" h-screen bg-slate-900">
        <Navbar></Navbar>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
