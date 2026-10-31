
import { fetchMovieData, searchMovies } from "./omdbAPI.js"
import { addToWatchlist } from "./watchlistStorage.js"

const searchMovieForm = document.getElementById('search-form')
const moviesContainer = document.getElementById('movies-container')
const promptSearchEl = document.getElementById('prompt-search-container')

let moviesArr = []

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
                            <p class="movie-runtime">${movie.runTime}</p>
                            <p class="movie-genres">${movie.genre}</p>
                            
                            <div class="movie-item-actions">
                                <button class='watchlist-btn' data-add-movie-id="${movie.id}"><i class="fa-solid fa-circle-plus add-icon"></i>Watchlist</button>
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

const handleSearchSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const searchQuery = formData.get('movie-search-input')

    const movieIds = await searchMovies(searchQuery)

    for(let id of movieIds){
        moviesArr.push(await fetchMovieData(id))
    }

    if(moviesArr.length > 0){
        promptSearchEl.classList.add('hidden')
    }

    render()
}

const handleMovieItemAction = async (e) => {
    console.log(e.target.dataset)
    if(e.target.dataset['addMovieId']){
        const movie = await fetchMovieData(e.target.dataset['addMovieId'])
        addToWatchlist(movie)
        alert(`Added ${movie.title} to watchlist!`)
    }
}

searchMovieForm.addEventListener('submit', handleSearchSubmit)
moviesContainer.addEventListener('click', handleMovieItemAction)