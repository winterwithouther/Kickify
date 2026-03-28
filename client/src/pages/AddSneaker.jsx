import React, { useState } from 'react'

function AddSneaker() {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate = year + '-' + month + '-' + day

    const [sneaker, setSneaker] = useState({
        name: "",
        size: "",
        price: "",
        color_primary: "",
        color_secondary: "",
        sole_color: "",
        material: "",
        lace_color: "",
        submittedBy: "",
        submittedOn: currentDate
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setSneaker({ ...sneaker, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/sneakers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sneaker)
            })

            console.log("sneaker added")
            // add that new sneaker into the list of sneakers
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Add a Sneaker</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name="name" type="text" value={sneaker.name} onChange={handleChange} required />

                <label>Size</label>
                <input name="size" type="number" value={sneaker.size} onChange={handleChange} required />

                <label>Price</label>
                <input name="price" type="number" step="0.01" value={sneaker.price} onChange={handleChange} required />

                <label>Primary Color</label>
                <input name="color_primary" value={sneaker.color_primary} onChange={handleChange} required />

                <label>Secondary Color</label>
                <input name="color_secondary" value={sneaker.color_secondary} onChange={handleChange} required />

                <label>Sole Color</label>
                <input name="sole_color" value={sneaker.sole_color} onChange={handleChange} required />

                <label>Material</label>
                <input name="material" value={sneaker.material} onChange={handleChange} required />

                <label>Lace Color</label>
                <input name="lace_color" value={sneaker.lace_color} onChange={handleChange} required />

                <label>Submitted By</label>
                <input name="submittedBy" value={sneaker.submittedBy} onChange={handleChange} required />

                <button type="submit">Add Sneaker</button>
            </form>
        </div>
    )
}

export default AddSneaker