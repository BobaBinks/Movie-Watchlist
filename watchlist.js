
import { fetchMovieData } from "./omdbAPI.js"
import { getWatchList, removeFromWatchlist } from "./watchlistStorage.js"

const watchListLocalStorageKey = 'movie-watchlist'
const moviesContainer = document.getElementById('movies-container')
const promptContainer = document.getElementById('prompt-watchlist-container')
let watchlist = getWatchList() || []

const render = () => {

    let html = ''
    for(let movie of watchlist){
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
                                <button class='watchlist-btn' data-remove-movie-id="${movie.id}"><i class="fa-solid fa-circle-minus add-icon"></i>Watchlist</button>
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

moviesContainer.addEventListener('click', (e) => {
    if(e.target.dataset['removeMovieId']){
        removeFromWatchlist(e.target.dataset['removeMovieId'])
        watchlist = getWatchList()

        if(watchlist.length === 0)
            promptContainer.classList.remove('hidden')

        render()
    }
})


if(watchlist.length > 0){
    promptContainer.classList.add('hidden')
    render()
}