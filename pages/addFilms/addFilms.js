import { sanitizeStringWithTableRows, handleHttpErrors, makeOptions} from "../../utils.js"

const url = "http://localhost:8080/api/films"

const omdbUrl= "http://www.omdbapi.com/?apikey=6dfe795d&plot=full&i="

export function initAddFilm(){
    document.querySelector("#inspect-btn").addEventListener("click", async () => inspectFilm())
    document.querySelector("#add-film-btn").addEventListener("click", async () => addFilm())
}

async function inspectFilm(){
    const filmId = document.getElementById("film-input").value;

    await fetch(omdbUrl+filmId)
    .then(res => handleHttpErrors(res))
    .then(film => {
        const markUp = `
        <ul>
        <li>Title: ${film.Title}</li>
        <li>Director: ${film.Director}</li>
        <li>Runtime: ${film.Runtime}</li>
        </ul>
    `;
    console.log(filmId)
    console.log(film)

    document.querySelector("#inspect-film").innerHTML=markUp
    })

    
    
}

async function addFilm(){
    const filmId = document.querySelector("#film-input").value
    const token = localStorage.getItem('token');
    try{

        if (!token) {
            console.error('Token not found. Please log in.');
            return;
        }

        const response = await fetch(url + "/" + filmId, makeOptions("POST", null, true))
        
        if(response.ok){
            alert("GODT")
        } else {
            alert("LORT")
        }
        
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}