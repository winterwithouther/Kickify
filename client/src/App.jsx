import React, { useState, useEffect } from 'react'
import Home from "./pages/Home.jsx"
import AddSneaker from "./pages/AddSneaker.jsx"
import SneakerPage from "./pages/SneakerPage.jsx"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
    const [sneakers, setSneakers] = useState([])

    useEffect(() => {
        async function getSneakers() {
            const response = await fetch("http://localhost:3000/sneakers")
            const data = await response.json()
            console.log(data)
            setSneakers(data)
        }

        getSneakers()
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home sneakers={sneakers}/>}/>
                <Route path="/new" element={<AddSneaker/>}/>
                <Route path="/sneakers/:id" element={<SneakerPage/>}/>
            </Routes>
        </Router>
    )
}

export default App