import { API_URL } from "../../settings.js";
import {
  handleHttpErrors,
  makeOptions,
  renderHtml,
  loadHtml,
} from "../../utils.js";
import { initAktuelleFilm } from "../aktuelleFilm/aktuelleFilm.js";

export function initHome() {
  showMovies();
  fetchAndDisplayMovies();
  fetchAndDiscplayMovies2();
}

async function showMovies() {
  const templateAktuelleFilm = await loadHtml(
    "./pages/aktuelleFilm/aktuelleFilm.html"
  );
  renderHtml(templateAktuelleFilm, "active-movies");
  initAktuelleFilm();
}

async function fetchAndDisplayMovies() {
  const response = await fetch(API_URL + "/films");
  const movies = await response.json();
  const banner = document.getElementById("banner");

  // Clear the banner before generating new posters
  banner.innerHTML = "";

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-poster", "max-w-xs"); // Apply the movie poster style and set max width to 445 pixels

    const poster = document.createElement("img");
    poster.src = movie.poster;
    poster.alt = movie.title;
    movieDiv.appendChild(poster);

    banner.appendChild(movieDiv);
  });
}

async function fetchAndDiscplayMovies2() {
  const response = await fetch(API_URL + "/films");
  const movies = await response.json();

  const bannerContainer = document.querySelector("#banner2");
  const bannerItems = document.querySelector(".banner-items");
  const items = [];
  let currentItemIndex = 0;

  const itemWidth = bannerContainer.clientWidth;

  movies.forEach((movie) => {
    items.push(movie);
  })

  items.forEach((item) => {
    const bannerItem = document.createElement("div");
    bannerItem.classList.add("banner-item");
    bannerItem.style.backgroundImage = `url(${item.poster})`;
    bannerItems.appendChild(bannerItem);
  })
console.log(items)
  // Function to display the current item
  function showCurrentItem() {
    bannerItems.style.transform = `translateX(-${
      currentItemIndex * itemWidth
    }px)`;
  }

  // Function to handle swipe right
  function swipeRight() {
    currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
    showCurrentItem();
  }

  // Function to handle swipe left
  function swipeLeft() {
    currentItemIndex = (currentItemIndex + 1) % items.length;
    showCurrentItem();
  }

  // Event listeners for touch or click events
  bannerContainer.addEventListener("swiperight", swipeRight);
  bannerContainer.addEventListener("swipeleft", swipeLeft);

  // Display the initial item
  showCurrentItem();
}
