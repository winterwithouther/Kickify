import React, { useState, useEffect } from 'react'
import Home from "./pages/Home.jsx"
import AddSneaker from "./pages/AddSneaker.jsx"
import SneakerPage from "./pages/SneakerPage.jsx"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditSneaker from './pages/EditSneaker.jsx'

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

    function editedSneaker(updatedSneaker) {
        setSneakers(prevSneakers => 
            prevSneakers.map((s) => (
                s.id === updatedSneaker.id ? updatedSneaker : s
            ))
        )
    }

    function deletedSneaker(sneakerDeleted) {
        setSneakers(prevSneakers =>
            prevSneakers.filter((sneaker) => (
                sneaker.id !== sneakerDeleted.id
            ))
        )
    }

    function addedSneaker(sneakerAdd) {
        setSneakers(prevSneakers => [...prevSneakers, sneakerAdd])
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home sneakers={sneakers}/>}/>
                <Route path="/new" element={<AddSneaker addedSneaker={addedSneaker}/>}/>
                <Route path="/sneakers/:id" element={<SneakerPage deletedSneaker={deletedSneaker}/>}/>
                <Route path="/sneakers/:id/edit" element={<EditSneaker editedSneaker={editedSneaker}/>}/>
            </Routes>
        </Router>
    )
}

export default App