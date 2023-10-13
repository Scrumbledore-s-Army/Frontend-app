import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows, handleHttpErrors, makeOptions, checkLogin} from "../../utils.js"

const url = API_URL + "/films"

const omdbUrl= "http://www.omdbapi.com/?apikey=6dfe795d&plot=full&i="

export function initAddFilm(){
    const token = localStorage.getItem('token');
    if (token === null) {
        alert("Du skal være logget ind for at tilføje en film")
        window.router.navigate("#")
        return;
    }

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
    const showresponse = document.getElementById("response")
    const filmId = document.querySelector("#film-input").value
    try{

        checkLogin()
        const response = await fetch(url + "/" + filmId, makeOptions("POST", null, true))
        
        if(response.ok){
            showresponse.style.color = "green"
            showresponse.innerHTML = "Film tilføjet"
        } else {
            showresponse.style.color = "red"
            showresponse.innerHTML = "Film kunne ikke tilføjes"
        }
        
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}