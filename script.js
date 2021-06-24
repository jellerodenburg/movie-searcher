const moviesUL = document.querySelector("#movies-ul");
const categorySelectionButtons = document.getElementsByName("category-selection");

const addMoviesToDom = (list) => {
    moviesUL.innerHTML = "";
    let imgList = list.map(movie =>
        '<a href=' + getImdbUrl(movie.imdbID) + ' target="_blank"><img src=' + movie.Poster + '></a>');
    imgList.forEach(imgLink => {
        const listItem = document.createElement("li");
        listItem.innerHTML = imgLink;
        moviesUL.appendChild(listItem);
    });
}

handleOnChangeEvent = (event) => {
    switch (event.target.value) {
        case "latest":
            filterLatestMovies()
            break;
        case "avengers":
            filterMovies("Avengers")
            break;
        case "x-men":
            filterMovies("X-Men")
            break;
        case "princess":
            filterMovies("Princess")
            break;
        case "batman":
            filterMovies("Batman")
            break;
        default:
            filterLatestMovies()
            break;
    }
}

addEventListeners = (radioButtons) =>
    radioButtons.forEach(button => {
        button.addEventListener('change', (event) => handleOnChangeEvent(event));
        button.addEventListener('click', (event) => handleOnChangeEvent(event));
    })

addEventListeners(categorySelectionButtons);

filterMovies = (wordInMovieTitle) => {
    let filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(wordInMovieTitle.toLowerCase()));
    addMoviesToDom(filteredMovies);
}

filterLatestMovies = () => {
    let latestMovies = movies.filter(movie => Number(movie.Year) >= 2014);
    addMoviesToDom(latestMovies);
}

getImdbUrl = (imdbID) => "https://www.imdb.com/title/" + imdbID;

// Default (empty) filter on page load
filterMovies("");

// Bonus Requirements
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', (event) => handleSearch(event));
searchBar.addEventListener('focus', (event) => handleSearch(event));

handleSearch = () => {
    filterMovies(searchBar.value);
    uncheckButtons(categorySelectionButtons); // Uncheck radio buttons when using the search bar
}

uncheckButtons = (buttons) => {
    buttons.forEach(button => button.checked = false)
}