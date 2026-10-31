const watchListLocalStorageKey = 'movie-watchlist'


const getWatchList = () => {
    let watchlist = localStorage.getItem(watchListLocalStorageKey)

    return watchlist ? JSON.parse(watchlist) : []
    // might have to parse the data? sincce we saving it as an array of objects?
}

const addToWatchlist = (movie) => {
    let watchlist = getWatchList()
    watchlist.push(movie)
    localStorage.setItem(watchListLocalStorageKey, JSON.stringify(watchlist))
}

const removeFromWatchlist = (id) => {
    let watchlist = getWatchList()
    console.log("Watchliust: ", watchlist)

    if(watchlist.length === 0)
        return

    watchlist = JSON.stringify(watchlist.filter((movie) => movie.id != id))
    localStorage.setItem('movie-watchlist', watchlist) 
}

export{
    addToWatchlist,
    removeFromWatchlist,
    getWatchList
}