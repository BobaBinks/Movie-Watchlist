import { API_KEY } from "./env.js"

const baseAPIUrl='http://www.omdbapi.com/'
const basePosterAPIUrl = 'http://img.omdbapi.com/'

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

export{
    searchMovies,
    fetchMovieData
}