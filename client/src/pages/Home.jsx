import React, { useEffect, useState } from 'react'

function Home() {
    const [sneakers, setSneakers] = useState([])

    useEffect(() => {
        async function getSneakers() {
            const response = await fetch("http://localhost:3000/sneakers")
            const data = await response.json()
            console.log(data)
        }

        getSneakers()
    }, [])    
        
    return (
        <div className="homepage-container">
            <h1>HOME</h1>
        </div>
    )
}

export default Home