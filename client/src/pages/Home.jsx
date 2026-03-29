import React from 'react'
import SneakerCard from "../components/SneakerCard.jsx"

function Home(props) {
    const { sneakers } = props

    return (
        <div className="homepage-container">
            {sneakers.map((sneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker}/>
            ))}
        </div>
    )
}

export default Home