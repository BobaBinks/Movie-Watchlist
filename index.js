import { API_KEY } from "./env.js"

const baseAPIUrl='http://www.omdbapi.com/'
const basePosterAPIUrl = 'http://img.omdbapi.com/'

const searchMovieForm = document.getElementById('search-form')
const myWatchlist = document.getElementById('my-watchlist')
const moviesContainer = document.getElementById('movies-container')


// Todo: 
// Communicate with the API
// get the search results
// fill up movie container
// add to watch list container (save it to localstorage)

let moviesArr = []
let watchlist = []

const render = () => {
    let html = ''

    for(let movie of moviesArr){
        html += 
        `
            <article class="movie-item">
                <img class='movie-poster' src="${movie.poster}" alt="movie poster">

                <div class="movie-content">

                    <header class="movie-header">
                        <h2 class="movie-title">
                            ${movie.title} 
                            <span class="movie-rating"><i class="fa-solid fa-star review-icon"></i>${movie.rating}</span>
                        </h2>

                        <div class="movie-meta">
                            <p class="movie-runtime">${movie.runTimes}</p>
                            <p class="movie-genres">${movie.genre}</p>
                            
                            <div class="movie-item-actions">
                                <button class='add-watchlist-btn' data-movie-id="${movie.id}"><i class="fa-solid fa-circle-plus add-icon"></i>Watchlist</button>
                            </div>
                        </div>
                    </header>
                    
                    <p class="movie-description">${movie.description}</p>
                </div>

            </article>

        `
    }

    moviesContainer.innerHTML = html
}

const searchMovies = async (title) => {
    const res = await fetch(`${baseAPIUrl}?apikey=${API_KEY}&s=${title}&page=1`)

    const data = await res.json()

    // console.log(data.Search)
    return data.Search.map((movie) => {
        return movie.imdbID
    })
}

const fetchMovieData = async (id) => {
    // tt2015381
    const res = await fetch(`${baseAPIUrl}?apikey=${API_KEY}&i=${id}`)

    const data = await res.json()

    return {
        id: data.imdbID,
        title: data.Title,
        rating: data.imdbRating,
        runTime: data.Runtime,
        genre: data.Genre,
        poster: data.Poster,
        description: data.Plot
    }
}


const handleSearchSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const searchQuery = formData.get('movie-search-input')

    const movieIds = await searchMovies(searchQuery)

    for(let id of movieIds){
        moviesArr.push(await fetchMovieData(id))
    }

    render()
}

const addToWatchlist = (id) => {
    watchlist.push(id)
    localStorage.setItem('movie-watchlist', watchlist)
}

const removeFromWatchlist = (id) => {
    watchlist = watchlist.filter((movie) => movie!=id)
    localStorage.setItem('movie-watchlist', watchlist) 
}

const handleMovieItemAction = (e) => {
    console.log(e.target.dataset)
    if(e.target.dataset['movieId']){
        addToWatchlist(e.target.dataset['movieId'])
        return
    }

}

searchMovieForm.addEventListener('submit', handleSearchSubmit)
moviesContainer.addEventListener('click', handleMovieItemAction)
