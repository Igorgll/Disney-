const API_KEY = '03c4e3dc470296959d6bf68804146538'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
    original:'https://image.tmdb.org/t/p/original',
    small:'https://image.tmdb.org/t/p/w500'
}

const LIST_MOVIES = ['tt12801262', 'tt2948372', 'tt7146812', 'tt3521164', 'tt2948356', 'tt2096673', 'tt2380307', 'tt1049413', 'tt2953050', 'tt8097030', 'tt4823776']

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

function setFeaturedMovie(movieId) {
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    console.log(data)
    const appImage = document.querySelector('.app__image img')
    const title = document.querySelector('.featured__movie h1')
    const description = document.querySelector('.featured__movie p')
    const info = document.querySelector('.featured__movie span')
    const rating = document.querySelector('.rating strong')

    const yearRelease = data.release_date.split('-')[0]

    title.innerHTML = data.title
    description.innerHTML = data.overview
    rating.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie'

    const image = BASE_URL_IMAGE.original.concat(data.backdrop_path)
    appImage.setAttribute('src', image)
})
}

const moviesList = document.getElementById('movies__list')

function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onClick', `setFeaturedMovie('${movieId}')`)
    button.innerHTML = `<img src="/assets/icon-play-button.png" alt="Icon play button" />`
    
    return button
}

function createImageMovie(movieImage, movieTitle) {
    const divImageMovie = document.createElement('div')
    divImageMovie.classList.add('movie__image')
    const image = document.createElement('img')

    image.setAttribute('src', movieImage)
    image.setAttribute('alt', `Imagem do filme ${movieTitle}`)
    image.setAttribute('loading', 'lazy')

    divImageMovie.appendChild(image)

    return divImageMovie
}

function createMovie(movieId) {
    console.log('createMovie id', movieId)
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        const movie = document.createElement('li')
        movie.classList.add('movie')
        const genre = `<span>${data.genres[0].name}</span>`
        const title = `<strong>${data.title}</strong>`
        const image = BASE_URL_IMAGE.small.concat(data.backdrop_path)

        movie.innerHTML = genre + title
        movie.appendChild(createButtonMovie(movieId))
        movie.appendChild(createImageMovie(image, data.title))

        moviesList.appendChild(movie)
    })
}

function loadListMovies() {
    LIST_MOVIES.map(createMovie)
}

loadListMovies()

setFeaturedMovie(LIST_MOVIES[0])