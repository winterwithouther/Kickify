import React from 'react'
import Home from "./pages/Home.jsx"
import AddSneaker from "./pages/AddSneaker.jsx"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/new" element={<AddSneaker/>}/>
            </Routes>
        </Router>
    )
}

export default App