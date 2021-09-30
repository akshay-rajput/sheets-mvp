import React, { useEffect } from "react";
import "./tailwind.css";
import "./App.css";

// redux
import { useDispatch } from "react-redux";
import { setupData } from "./features/Table/tableSlice";
import websiteData from "./data.min.json";

// components
import TheNavbar from "./features/shared/TheNavbar";
import TheFooter from "./features/shared/TheFooter";
import Home from "./screens/Home";
import About from "./screens/About";

import { Routes, Route } from "react-router-dom";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch initial action
        dispatch(setupData(websiteData));
    }, []);

    return (
        <div className="App">
            <TheNavbar />

            <main className="container mx-auto px-4">
                {/* render routes inside main container */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about/*" element={<About />} />
                </Routes>
            </main>

            <TheFooter />
        </div>
    );
}

export default App;
