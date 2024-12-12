import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from './src/pages/Home'

export const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};
