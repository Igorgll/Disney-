const API_KEY = '03c4e3dc470296959d6bf68804146538'
const API_LANGUAGE = 'pt-br'

const LIST_MOVIES = ['tt12801262', 'tt2948372', 'tt7146812', 'tt3521164', 'tt2948356', 'tt2096673', 'tt2380307', 'tt1049413', 'tt2953050', 'tt8097030', 'tt4823776']

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

function setFeaturedMovie(movieId) {
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    console.log(data)
    const app = document.getElementById('app')
    const title = document.querySelector('.movie h1')
    const description = document.querySelector('.movie p')
    const info = document.querySelector('.movie span')
    const rating = document.querySelector('.rating strong')

    const yearRelease = data.release_date.split('-')[0]

    title.innerHTML = data.title
    description.innerHTML = data.overview
    rating.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie'

    const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`
})
}

const moviesList = document.getElementById('movies__list')

function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onClick', `setFeaturedMovie('${movieId}')`)
    button.innerHTML = `<img src="/assets/icon-play-button.png" alt="Icon play button" />`
    return button
}

function createMovie(movieId) {
    console.log('createMovie id', movieId)
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        const movie = document.createElement('li')
        const genre = `<span>${data.genres[0].name}</span>`
        const title = `<strong>${data.title}</strong>`
        const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`

        movie.innerHTML = genre + title
        movie.appendChild(createButtonMovie(movieId))

        movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`
        
        moviesList.appendChild(movie)
    })
}

function loadListMovies() {
    LIST_MOVIES.map(createMovie)
}

loadListMovies()

setFeaturedMovie(LIST_MOVIES[0])