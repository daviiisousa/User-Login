import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from './src/pages/Home'
import { Login } from "./src/pages/Login";
import { Usuarios } from "./src/pages/Users";

export const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
        </BrowserRouter>
    );
};
