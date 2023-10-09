import { API_URL} from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";


export function initAddShowing() {
        document.getElementById("add-showing-btn").addEventListener("click", async () => addShowing())
}

async function addShowing(){
    const showingFilm = document.getElementById("film-input").value;
    const showingTheater = document.getElementById("theater-input").value;
    const showingTicketPrice = document.getElementById("ticketPrice-input").value;
    const showingTimeAndDate = document.getElementById("timeAndDate-input").value;

    const token = localStorage.getItem('token');

    const newShowing = {
        filmId: showingFilm,
        theaterId: showingTheater,
        ticketPrice: showingTicketPrice,
        timeAndDate: showingTimeAndDate
    }
    console.log(newShowing)

    try{
        const newOpt = makeOptions("POST", newShowing, token);
        
        const response = await fetch(API_URL + "/showings", newOpt);
console.log("1")

        if(response.ok){
            console.log("added showing")
        } else{
            const errorData = await response.json();
            console.log("added showing failed")
        }
        } catch (error){
            console.error("Error:", error);
        }
    }

    

    
