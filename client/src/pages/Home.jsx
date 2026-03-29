import React from 'react'
import SneakerCard from "../components/SneakerCard.jsx"
import Header from '../components/Header.jsx'

function Home(props) {
    const { sneakers } = props

    return (
        <div className="homepage-container">
            <Header/>
            {sneakers.map((sneaker) => (
                <SneakerCard key={`${sneaker.name}-${sneaker.size}`} sneaker={sneaker}/>
            ))}
        </div>
    )
}

export default Home