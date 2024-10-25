import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TourList from '../components/user/TourList'
import TourBooking from '../components/user/TourBooking'
import Dashboard from '../components/admin/Dashboard'
import VehicleManagement from '../components/admin/VehicleManagement'
import RouteManagement from '../components/admin/RouteManagement'
import TourManagement from '../components/admin/TourManagement'

import HomePage from '../pages/HomePage';
import TourPage from '../pages/TourPage';
import OrderManagement from '../components/admin/OrderManagement';

export default function MainRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tour" element={<TourPage />} />
                    <Route path="book/:tourId" element={<TourBooking />} />
                    <Route path="admin" element={<Dashboard />}>
                        <Route path="order" element={<OrderManagement/>} />
                        {/* Nested Routes inside Admin */}
                        <Route path="vehicles" element={<VehicleManagement />} />
                        <Route path="routes" element={<RouteManagement />} />
                        <Route path="tours" element={<TourManagement />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
