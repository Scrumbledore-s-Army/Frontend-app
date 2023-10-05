import { sanitizeStringWithTableRows, handleHttpErrors } from "../../utils.js"

const url = "http://localhost:8080/api/films"

const omdbUrl= "http://www.omdbapi.com/?apikey=6dfe795d&plot=full&i="

export function initAddFilm(){
    document.querySelector("#inspect-btn").addEventListener("click", async () => inspectFilm())
}

async function inspectFilm(){
    const filmId = document.getElementById("film-input").value;

    await fetch(omdbUrl+filmId)
    .then(res => handleHttpErrors(res))
    .then(film => {
        const markUp = `
        <ul>
        <li>title: ${film.Title}</li>
        <li>title: ${film.Director}</li>
        <li>title: ${film.Runtime}</li>
        </ul>
    `;
    console.log(filmId)
    console.log(film)

    document.querySelector("#inspect-film").innerHTML=markUp
    })

    
    
}