import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function VehicleOption({ item }) {
    console.log("🚀 ~ VehicleOption ~ item:", item)
    const navigate = useNavigate()
    return (
        <div
            onClick={() => {
                navigate('/tour')
                localStorage.setItem('selectedOption', item.code ? item.code : null);
            }}
            className="card"
        >
            {item.type}
        </div>

    )
}
