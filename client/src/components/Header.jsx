import React from 'react'
import "../styles/Header.css"
import { Link } from 'react-router-dom'

function Header() {

    return (
        <header className="header-container">
             <h1>Kickify</h1>
             <Link className="add-sneaker" to="/new">
                Add Sneaker
             </Link>
        </header>
    )
}

export default Header