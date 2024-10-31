import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from '../components/admin/Dashboard';
import RouteManagement from '../components/admin/RouteManagement';
import TourManagement from '../components/admin/TourManagement';
import TourBooking from '../components/user/TourBooking';

import ListVehicle from '../components/admin/ListVehicle';
import OrderManagement from '../components/admin/OrderManagement';
import HomePage from '../pages/HomePage';
import TourPage from '../pages/TourPage';
import ServiceManagement from '../components/admin/ServiceManagement';
import PriceManagement from '../components/admin/PriceManagement';

export default function MainRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tour" element={<TourPage />} />
                    <Route path="book/:tourId" element={<TourBooking />} />
                    <Route path="order" element={<OrderManagement />} />
                    <Route path="admin" element={<Dashboard />}>
                        {/* Nested Routes inside Admin */}
                        <Route path="vehicles" element={<ListVehicle />} />
                        <Route path="routes" element={<RouteManagement />} />
                        <Route path="tours" element={<TourManagement />} />
                        <Route path="services" element={<ServiceManagement />} />
                        <Route path="prices" element={<PriceManagement />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
