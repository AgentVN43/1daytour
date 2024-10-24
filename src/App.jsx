import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/admin/Dashboard";
import RouteManagement from "./components/admin/RouteManagement";
import TourManagement from "./components/admin/TourManagement";
import VehicleManagement from "./components/admin/VehicleManagement";
import HomePage from "./components/user/HomePage";
import TourBooking from "./components/user/TourBooking";
import TourList from "./components/user/TourList";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="tours" element={<TourList />} />
          <Route path="book/:tourId" element={<TourBooking />} />
          <Route path="admin" element={<Dashboard />}>
            {/* Nested Routes inside Admin */}
            <Route path="vehicles" element={<VehicleManagement />} />
            <Route path="routes" element={<RouteManagement />} />
            <Route path="tours" element={<TourManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
