import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/SneakerCard.css"

function SneakerCard({ sneaker }) {
    const navigation = useNavigate()
    function handleClick() {
        navigation(`/sneakers/${sneaker.id}`)
    }
    
    return (
        <div className="sneaker-display-container" onClick={handleClick}>
            <h1>{sneaker.name}</h1>
            <span>${sneaker.price}</span>
        </div>
    )
}

export default SneakerCard