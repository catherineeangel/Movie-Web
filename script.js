// API from TMDB

const API_KEY = 'api_key=da03529120653a027860abf535701f3a'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const L_API_URL = BASE_URL + '/discover/movie?primary_release_date.gte=2021-09-15&primary_release_date.lte=2021-10-26&' + API_KEY;
const API_GENRE = BASE_URL + '/discover/movie?'+ API_KEY + '&with_genres=27'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const movieList = document.getElementById('movie-list')
const movieListLatest = document.getElementById('movie-list-latest')
const movieListGen = document.getElementById('movie-list-genre')

getLatest(L_API_URL);
getMovies(API_URL);
getGenre(API_GENRE);

function getLatest(url){
    fetch(url).then(response => response.json()).then(data => {
        console.log(data);    
        showLatest(data.results);
    })
}
function showLatest(data){
    movieListLatest.innerHTML= '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const movieEl = document.createElement('div');
        // let ratingClass = 'movie-rating-'
        movieEl.classList.add('movie-list-item');
        movieEl.innerHTML = `
        <img class="movie-img" src="${IMG_URL+poster_path}" alt="${title}">
        <span class="movie-title">${title}
        <p class="movie-year">(${release_date})</p>
            <p class="movie-rating">&#127775 ${vote_average}</p>
        </span>
        
        <p class="movie-desc">${overview.split(".").slice(0,1)}.</p>
        `;
        movieListLatest.appendChild(movieEl);
    })
}
    
function showMovies(data){
    movieList.innerHTML= '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-list-item');
        movieEl.innerHTML = `
        <img class="movie-img" src="${IMG_URL+poster_path}" alt="${title}">
        <span class="movie-title">${title}
            <p class="movie-year">(${release_date})</p>
            <p class="movie-rating">&#127775 ${vote_average}</p>
        </span>
        
        <p class="movie-desc">${overview.split(".").slice(0,1)}.</p>
        `;
        movieList.appendChild(movieEl);
    })
}
function getMovies(url){
    fetch(url).then(response => response.json()).then(data => {
        console.log(data);    
        showMovies(data.results);
    })
}
    
function getGenre(url){
    fetch(url).then(response => response.json()).then(data => {
        console.log(data);    
        showGenre(data.results);
    })
}
    
function showGenre(data){
    movieListGen.innerHTML= '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const movieEl = document.createElement('div');
        // let ratingClass = 'movie-rating-'
        movieEl.classList.add('movie-list-item');
        movieEl.innerHTML = `
        <img class="movie-img" src="${IMG_URL+poster_path}" alt="${title}">
        <span class="movie-title">${title}
        <p class="movie-year">(${release_date})</p>
        <p class="movie-rating">&#127775 ${vote_average}</p>
        </span>
        <p class="movie-desc">${overview.slice(0,100).split(".")}.</p>
        `;
        movieListGen.appendChild(movieEl);
    })
}

// search movies
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    const latest = document.getElementById('movie-list-latest');
    const horror = document.getElementById('movie-list-genre');
    const heading = document.getElementsByClassName('movie-list-heading');
    if (searchTerm) {
        getMovies(searchURL + '&query=' +searchTerm)
        latest.style.display = "none";
        horror.style.display = "none";
        // heading.style.display = "none";
    } else{
        getMovies(API_URL).style.display = "table";
        latest.style.display = "flex";
        horror.style.display = "flex";
    }
})