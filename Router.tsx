import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./src/pages/Home";
import { Login } from "./src/pages/Login";
import { Usuarios } from "./src/pages/Users";
import { PostUsers } from "./src/pages/PostUser";
import { UserProvider } from "./src/context/userContext";

export const RouterApp = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/post-usuarios" element={<PostUsers />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
