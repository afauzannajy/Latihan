const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

// binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=2b1184cb&i=" + imdbid)
    .then((response) => response.json())
    .then((response) => response);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=2b1184cb&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showMovies(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showMovies(m) {
  return `<div class="col-md-3 my-5">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <p class="card-text">${m.Year}</p>
              <a href="#" class="btn btn-success modal-detail-button" data-bs-toggle="modal"
                data-bs-target="#movieDetailModal" data-imdbid = "${m.imdbID}">Show Details</a>
            </div>
          </div>
        </div>`;
}

function showMovieDetail(md) {
  return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                <img src="${md.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                <ul class="list-group" style="text-align: justify;">
                    <li class="list-group-item"><h4>${md.Title} (${md.Year})</h4></li>
                    <li class="list-group-item"><strong>Genre : </strong>${md.Genre}</li>
                    <li class="list-group-item"><strong>Director : </strong>${md.Director}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${md.Writer}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${md.Actors}</li>
                    <li class="list-group-item"><strong>Plot : </strong>${md.Plot}</li>
                </ul>
                </div>
            </div>
        </div>`;
}
