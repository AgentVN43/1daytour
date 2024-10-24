import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function VehicleOption({ name }) {
    const navigate = useNavigate()
    return (
        /* From Uiverse.io by SteveBloX */
        <div onClick={() => navigate('/tour')} class="card">
            {name}
        </div>

    )
}
