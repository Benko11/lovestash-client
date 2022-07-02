import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './Add';
import AddCategory from './AddCategory';
import App from './App';
import './reset.css';
import Home from './Home';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="/add" element={<Add />} />
                    <Route
                        path="/add-category"
                        element={<AddCategory />}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
