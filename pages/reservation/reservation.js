import { API_URL } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

let username;
let showingId;
let seats;

export function initReservation(match) {

    username = localStorage.username;
    showingId = match.params.showingId;
    showingId = parseInt(match.params.showingId, 10);


    seats = match.params.seatsSelected;
    seats = seats.split(',').map(str => parseInt(str, 10));


    const reservationData = {
        username: username,
        showingId: showingId,
        seatIds: seats
    };


    fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Reservation response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
