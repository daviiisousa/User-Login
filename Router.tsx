import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./src/pages/Home";
import { Login } from "./src/pages/Login";
import { Usuarios } from "./src/pages/Users";
import { PostUsers } from "./src/pages/PostUser";
import { UserProvider } from "./src/context/userContext";
import { Header } from "./src/components/layout/header";
import { Footer } from "./src/components/layout/footer";

export const RouterApp = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-darkBlue to-lightBlue text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/post-usuarios" element={<PostUsers />} />
            </Routes>
          </main>
          <Footer>Todos os direitos Reservados</Footer>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};
