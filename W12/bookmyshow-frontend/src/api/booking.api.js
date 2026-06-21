// src/api/booking.api.js

import api from "./axios";

/*
=========================================================
CREATE BOOKING
=========================================================
*/

export async function createBooking(payload) {
    const response = await api.post("/bookings", payload);
    return response.data;
}

/*
=========================================================
GET MY BOOKINGS
=========================================================
*/

export async function getMyBookings() {
    const response = await api.get("/bookings/my");
    return response.data;
}

/*
=========================================================
CANCEL BOOKING
=========================================================
*/

export async function cancelBooking(bookingId) {
    const response = await api.patch(`/bookings/${bookingId}/cancel`);
    return response.data;
}