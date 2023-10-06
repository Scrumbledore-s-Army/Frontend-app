export function initAktuelleFilm() {
    loadMovies();
}

async function loadMovies() {
    try {
        // Select the movie container div
        const movieContainer = document.getElementById("movie-container");
        movieContainer.innerHTML = '';
        // Fetch the JSON data from the API
        const response = await fetch("http://localhost:8080/api/films");
        const data = await response.json();

        // Loop through the data and create movie cards
        data.forEach((movie) => {
            const card = document.createElement("card");
            card.className = "movie-card";

            // Create an img element for the movie poster
            const posterImg = document.createElement("img");
            posterImg.className = "movie-poster-img";
            posterImg.src = movie.poster;

            // Create a span for the movie title
            const titleSpan = document.createElement("span");
            titleSpan.className = "movie-title";
            titleSpan.textContent = movie.title;

            // Create a div for the movie buttons container
            const btnsContainerDiv = document.createElement("div");
            btnsContainerDiv.className = "movie-btns-container";

            // Create "Read More" link
            const readMoreLink = document.createElement("a");
            readMoreLink.href = `#film${movie.id}`;
            readMoreLink.setAttribute("data-navigo", "");
            readMoreLink.className = "read-more-btn";
            const readMoreSpan = document.createElement("span");
            readMoreSpan.textContent = "Læs Mere";
            readMoreLink.appendChild(readMoreSpan);

            // Create "Billeter" link
            const ticketsLink = document.createElement("a");
            ticketsLink.href = "#";
            ticketsLink.setAttribute("data-navigo", "");
            ticketsLink.className = "tickets-btn";
            const ticketsSpan = document.createElement("span");
            ticketsSpan.textContent = "Billeter";
            const ticketsImg = document.createElement("img");
            ticketsImg.className = "ticket-btn-icon";
            ticketsImg.src = "ticket-outline.svg";
            ticketsLink.appendChild(ticketsSpan);
            ticketsLink.appendChild(ticketsImg);

            // Append elements to the movie card
            btnsContainerDiv.appendChild(readMoreLink);
            btnsContainerDiv.appendChild(ticketsLink);
            card.appendChild(posterImg);
            card.appendChild(titleSpan);
            card.appendChild(btnsContainerDiv);

            // Append the movie card to the container
            movieContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching data:", error);

    }
}



