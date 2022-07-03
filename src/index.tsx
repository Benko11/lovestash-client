import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Add from './pages/Add';
import AddCategory from './pages/AddCategory';
import App from './App';
import './reset.css';
import Home from './pages/Home';
import { Gallery } from './pages/Gallery';

console.log(import.meta);
console.log(process.env);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
console.log((import.meta as any).env);
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
                    <Route path="/gallery" element={<Gallery />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

serviceWorkerRegistration.unregister();
