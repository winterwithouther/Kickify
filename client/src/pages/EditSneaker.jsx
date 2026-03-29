import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/SneakerForm.css"

function EditSneaker({editedSneaker}) {
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params

    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate = year + '-' + month + '-' + day

    const sizes = {
        "6": { "cost": 5 },
        "7": { "cost": 7 },
        "8": { "cost": 9 },
        "9": { "cost": 11 },
        "10": { "cost": 13 },
        "11": { "cost": 15 },
        "12": { "cost": 17 },
        "13": { "cost": 19 }
    }


    const colors = {
        red: {
            cost: 15,
            value: "red"
        },
        blue: {
            cost: 12,
            value: "blue"
        },
        green: {
            cost: 10,
            value: "green"
        },
        white: {
            cost: 8,
            value: "white"
        },
        yellow: {
            cost: 11,
            value: "yellow"
        },
        orange: {
            cost: 11,
            value: "orange"
        },
        purple: {
            cost: 13,
            value: "purple"
        },
        pink: {
            cost: 13,
            value: "pink"
        }
    }

    const materials = {
        leather: {
            cost: 25,
            value: "leather"
        },
        suede: {
            cost: 22,
            value: "suede"
        },
        canvas: {
            cost: 15,
            value: "canvas"
        },
        mesh: {
            cost: 18,
            value: "mesh"
        }
    }

    const [sneaker, setSneaker] = useState({
        name: "",
        size: "",
        price: "",
        color_primary: "",
        color_secondary: "",
        material: "",
        submittedBy: "",
        submittedOn: currentDate
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setSneaker({ ...sneaker, [name]: value });
    }

    useEffect(() => {
        async function updateSneaker() {
            const response = await fetch(`http://localhost:3000/sneakers/${id}`)
            const data = await response.json()
            console.log(data)
            setSneaker(data)
        }

        updateSneaker()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/sneakers/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sneaker)
            })
            const data = await response.json()
            editedSneaker(data)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const totalPrice = (sizes[sneaker.size]?.cost || 0) + (colors[sneaker.color_primary]?.cost || 0) + (colors[sneaker.color_secondary]?.cost || 0) + (materials[sneaker.material]?.cost || 0);   

    return (
        <div className="form-container">
            <h2 className="form-header">Edit a Sneaker</h2>
            <form className="form" onSubmit={handleSubmit}>

                <div className="name-container">
                    <label>Name</label>
                    <input name="name" type="text" value={sneaker.name} onChange={handleChange} required />
                </div>

                <div className="size-container">    
                    <label>Size</label>
                    <div className="size-selection-container">    
                        {Object.keys(sizes).map((size) => (
                            <div key={size} onClick={() => setSneaker({ ...sneaker, size, price: Number(sneaker.price || 0) + sizes[size].cost })}
                                style={{
                                    cursor: "pointer",
                                    border: sneaker.size === size ? "1px solid white" : "1px solid rgb(66, 66, 66)"
                                }}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {/* <label>Price</label>
                <input name="price" type="number" step="0.01" value={sneaker.price} onChange={handleChange} required /> */}

                <div className="primary-color-container color-container">
                    <label>Primary Color</label>
                    <div className="primary-color-selection-container color-selection-container">
                        {Object.keys(colors).map((color) => (
                            <div
                                className="color-boxes"
                                key={color}
                                onClick={() =>
                                setSneaker({
                                    ...sneaker,
                                    color_primary: colors[color].value,
                                    price: Number(sneaker.price || 0) + colors[color].cost
                                })
                                }
                                style={{
                                backgroundColor: colors[color].value,
                                boxShadow: sneaker.color_primary === color ? "0px 0px 30px 10px rgba(255, 255, 255, 0.6)" : "0px 0px 0px 0px",
                                cursor: "pointer",
                                transition: ".2s ease-in-out"
                                }}
                            >
                                {color}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="secondary-color-container color-container">
                    <label>Secondary Color</label>
                    <div className="primary-color-selection-container color-selection-container">
                        {Object.keys(colors).map((color) => (
                            <div
                                className="color-boxes"
                                key={color}
                                onClick={() =>
                                setSneaker({
                                    ...sneaker,
                                    color_secondary: colors[color].value,
                                    price: Number(sneaker.price || 0) + colors[color].cost
                                })
                                }
                                style={{
                                backgroundColor: colors[color].value,
                                boxShadow: sneaker.color_secondary === color ? "0px 0px 30px 10px rgba(255, 255, 255, 0.6)" : "0px 0px 0px 0px",
                                cursor: "pointer",
                                transition: ".2s ease-in-out"
                                }}
                            >
                                {color}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="material-container">
                    <label>Material</label>
                    <div className="material-selection-container">
                        {Object.keys(materials).map((mat) => (
                            <div
                                key={mat}
                                onClick={() =>
                                setSneaker({
                                    ...sneaker,
                                    material: materials[mat].value,
                                    price: Number(sneaker.price || 0) + materials[mat].cost
                                })
                                }
                                style={{
                                cursor: "pointer",
                                backgroundColor: sneaker.material === mat ? "black" : "white",
                                color: sneaker.material === mat ? "white" : "black"
                                }}
                            >
                            {mat}
                        </div>
                        ))}
                    </div>
                </div>
                <h2 className="price">Total Price: ${totalPrice}</h2>
                <button type="submit">Edit Sneaker</button>
            </form>
        </div>
    )
}

export default EditSneaker