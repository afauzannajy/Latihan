const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=2b1184cb&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      movies.forEach((m) => (cards += showMovies(m)));
      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      // ketika tombol detail di-klik
      const modalDetailButton = document.querySelectorAll(
        ".modal-detail-button"
      );
      modalDetailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=2b1184cb&i=" + imdbid)
            .then((response) => response.json())
            .then((md) => {
              const movieDetail = showMovieDetail(md);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            })
            .catch((response) => console.log("Terjadi Error: " + response));
        });
      });
    })
    .catch((response) => console.log("Terjadi Error: " + response));
});

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
