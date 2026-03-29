import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import "../styles/SneakerPage.css"

function SneakerPage({deletedSneaker}) {
    const params = useParams()
    const navigate = useNavigate()
    const { id } = params;

    const [sneaker, setSneaker] = useState({});

    useEffect(() => {
        try {
            async function getSneaker() {
                const response = await fetch(`http://localhost:3000/sneakers/${id}`)
                const data = await response.json()
                setSneaker(data)
                console.log(data)
            }

            getSneaker()
            console.log("fetching sneaker by id")
        } catch (err) {
            console.log(err)
        }
    }, [])

    async function handleDelete() {
        const response = await fetch(`http://localhost:3000/sneakers/${id}`, {
            method: "DELETE"
        })
        console.log("successfully deleted")
        deletedSneaker(sneaker)
        navigate("/")
    }

    function handleEdit() {
        navigate(`/sneakers/${id}/edit`)
    }

    return (
        <div className="sneaker-page-container">
            <h1>{sneaker.name}</h1>
            <div className="sneaker-info-container">
                <span>Primary color: {sneaker.color_primary}</span>
                <span>Secondary color: {sneaker.color_secondary}</span>
                <span>Size: {sneaker.size}</span>
                <span>Price: ${sneaker.price}</span>
                <span>Material: {sneaker.material}</span>
            </div>
            <div className="buttons-container">
                <button onClick={handleEdit}>edit</button>
                <button onClick={handleDelete}>delete</button>
            </div>
        </div>
    )
}

export default SneakerPage