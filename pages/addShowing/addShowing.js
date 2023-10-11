import { API_URL} from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initAddShowing() {
  loadMovies();
  loadTheaters();

  const filmSelect = document.getElementById("film-input");
  const selectedOption = filmSelect; // Declare selectedOption outside the listener

  filmSelect.addEventListener("change", function () {
      if (selectedOption.value !== "") {
          inspectFilm();
          console.log("Inspectfilm");
      }
  });
  document.getElementById("add-showing-btn").addEventListener("click", async () => addShowing());

async function loadMovies() {
  try {
    const response = await fetch("http://localhost:8080/api/films");
    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();
    const select = document.querySelector("#film-input");

    data.forEach(movie => {
      const option = document.createElement('option');
      option.value = movie.id; 
      option.text = movie.title; 
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading movies:', error);
  }
}

async function loadTheaters(){
try {
  const response = await fetch("http://localhost:8080/api/theaters")
  if(!response.ok){
      throw new Error('Request failed')
  }
  const data = await response.json();
  const select = document.querySelector("#theater-input")

  data.forEach(theater =>{
      const option = document.createElement('option')
      option.value = theater.id
      option.text = theater.id
      select.append(option)
  })
  
} catch (error) {
  console.error('Error loading movies:', error);
}
}

async function inspectFilm(){
  const filmId = document.getElementById("film-input").value;

  await fetch("http://localhost:8080/api/films/" + filmId)
  .then(res => handleHttpErrors(res))
  .then(film => {
      const markUp = `
      <div class="movie-details-container" style="margin-left: auto; margin-right: auto;"><img src="${film.poster}">
      <ul>
        <li>Titel: ${film.title}</li>
        <li>Instruktør: ${film.director}</li>
        <li>Løbetid: ${film.runtime}</li>
        <li>Genre: ${film.genre}</li>
        <li>PG-Rating: ${film.rated}</li>
      </ul>
      <br>
      <p type="text">${film.plot}</å>
      </div>
  `;
  console.log(filmId)
  console.log(film)

  document.querySelector("#inspect-film").innerHTML=markUp
  })
}

async function addShowing(){
    const showingFilm = document.getElementById("film-input").value;
    const showingTheater = document.getElementById("theater-input").value;
    const showingTicketPrice = document.getElementById("ticketPrice-input").value;
    const showingTimeAndDate = document.getElementById("timeAndDate-input").value.replace("T", " ") + ':00';

    const token = localStorage.getItem('token');

    console.log(showingTimeAndDate)

    const newShowing = {
        filmId: showingFilm,
        theaterId: showingTheater,
        ticketPrice: showingTicketPrice,
        timeAndDate: showingTimeAndDate
    }



    try{
        const newOpt = makeOptions("POST", newShowing, token);
        
        const response = await fetch(API_URL + "/showings", newOpt);

        if(response.ok){
            addshowingmessage.textContent = "Added Showing!";
        } else{
            const errorData = await response.json();
            addshowingmessage.textContent = "Added Showing FAILED!";
        }
        } catch (error){
            console.error("Error:", error);
        }
    }
  }

    
