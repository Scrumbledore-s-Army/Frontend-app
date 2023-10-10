import { API_URL } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initShowing(match) {

    getShowing(match.params.showingId);



}


async function getShowing(showingId) {
    const apiUrl = `${API_URL}/showings/${showingId}/includeSeats`;
    const showing = await fetch(apiUrl).then(handleHttpErrors);

    console.log(showing);

    makeseats(showing);
}

function makeseats(showing) {
    let tableCreated = false; // Flag to track if the table has been created
    let seatsData = []; // Mock data for seats

    let ticketReservations = [];
    let movieTitle = showing.movieTitle;
    let salId = showing.theater.id;
    let showId = showing.id;
    seatsData = showing.seats;



seatsData[5].reservation='test'
    // Select the cinema-container div
    const cinemaSeats = document.querySelector('.cinema-container');

    cinemaSeats.innerHTML = '';


    // Create a table element only if it hasn't been created yet
    const table = document.createElement('table');
    tableCreated = true; // Set the flag to true after creating the table

    const markedSeats = []; // Array to store marked seat numbers

    // Function to toggle seat status
    function toggleSeatStatus(seat, seatData) {
        if (seatData.reservation !== null) {
            // If the seat is reserved, do nothing
            return;
        }

        const cell = seat.parentElement; // Get the parent cell
        const seatNumber = seatData.seatNumber;

        cell.classList.toggle('marked-cell');

        if (cell.classList.contains('marked-cell')) {
            markedSeats.push(seatNumber); // Add seat to the markedSeats array
        } else {
            const index = markedSeats.indexOf(seatNumber);
            if (index !== -1) {
                markedSeats.splice(index, 1); // Remove seat from the markedSeats array
            }
        }

        console.log('Sæder valgt:', markedSeats.map(seat => `seat ${seat}`).join(', '));

        document.getElementById("seatsSelected").innerHTML = 'Sæder valgt: <br>    ' + markedSeats.map(seat => `- ${seat}<br>`).join('');
    }
    const theaterRows = showing.theater.seatCount / showing.theater.rowLength
    // Loop to create rows and cells
    for (let i = 0; i < theaterRows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < showing.theater.rowLength; j++) {
            const cell = document.createElement('td');
            const seat = document.createElement('img');


            const seatData = seatsData[i * showing.theater.rowLength + j];



            // Set the cinema seat image source
            seat.setAttribute('src', '../../images/cinema-seat-svgrepo-com.svg');
            seat.classList.add('cinema-seat');

            if (seatData.reservation !== null) {
                seat.classList.add('reserved-seat');
            } else {
                // Add a click event listener to the seat
                seat.addEventListener('click', () => {
                    toggleSeatStatus(seat, seatData);
                });
            }

            // Append the seat to the cell and the cell to the row
            cell.appendChild(seat);
            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);
    }

    // Append the table to the cinema-container div
    cinemaSeats.appendChild(table);
    document.getElementById('movieTitle').innerText = `Filmtitel: ${movieTitle}`;
    document.getElementById('salId').innerText = `Sal: ${salId}`;
    document.getElementById('showId').innerText = `Forestillings ID: ${showId}`
}