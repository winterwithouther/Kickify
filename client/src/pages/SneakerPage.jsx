import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

function SneakerPage() {
    const params = useParams()
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
        window.location = '/'
    }

    return (
        <div>
            <h1>{sneaker.name}</h1>
            <div>
                <span>Primary color: {sneaker.color_primary}</span>
                <span>Secondary color: {sneaker.color_secondary}</span>
                <span>Lace color: {sneaker.lace_color}</span>
                <span>Sole color: {sneaker.sole_color}</span>
                <span>Size: {sneaker.size}</span>
                <span>Price: {sneaker.price}</span>
                <span>Material: {sneaker.material}</span>
            </div>
            <div>
                <button>edit</button>
                <button onClick={handleDelete}>delete</button>
            </div>
        </div>
    )
}

export default SneakerPage