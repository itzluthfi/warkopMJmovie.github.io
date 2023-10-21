// halaman awal
$.ajax({
  url: "https://www.omdbapi.com/?i=tt3896198&apikey=d48c8ef8&s=harry potter",
  success: (hasil) => {
    const movies = hasil.Search;
    console.log(movies);
    let cards = "";
    movies.forEach((m) => {
      cards += showCards(m);
    });
    $(".movie-container").html(cards);
    // ketika tombol movie-detail-button di klik
    $(".movie-detail-button").on("click", function () {
      let dataImdbid = $(this).data("imdbid");
      $.ajax({
        url: `https://www.omdbapi.com/?i=${dataImdbid}&apikey=d48c8ef8&=`,
        success: (m) => {
          const movieDetails = showDetailMovies(m);
          console.log(m);
          $(".modal-body").html(movieDetails);
        },
        error: (e) => {
          console.log(e.responseText);
        },
      });
    });
  },
  error: (e) => {
    console.log(e.responseText);
  },
});

// function
function showCards(m) {
  return `
  <div class="col-md-4 my-3">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary movie-detail-button" data-bs-toggle="modal"
        data-bs-target="#movie-detail-modal" data-imdbid="${m.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}

function showDetailMovies(m) {
  return `<div class="container-fluid">
<div class="row">
  <div class="col-md-3">
    <img src="${m.Poster}" class="img-fluid" />
  </div>
  <div class="col-md">
    <ul class="list-group">
      <li class="list-group-item active" aria-current="true">
        <h4>${m.Title}</h4>
      </li>
      <li class="list-group-item">
        <strong>Rating : </strong><i class="bi bi-star"></i> ${m.Ratings[0].Value}.
      </li>
      <li class="list-group-item">
        <strong>Language : </strong>  ${m.Language}.
      </li>
      <li class="list-group-item">
        <strong>Genre : </strong> ${m.Genre}.
      </li>
      <li class="list-group-item">
        <strong>Director : </strong> ${m.Director}.
      </li>
      <li class="list-group-item">
        <strong>Actor : </strong>${m.Actors}.
      </li>
      <li class="list-group-item">
        <strong>Writer : </strong> ${m.Writer}.
      </li>
      <li class="list-group-item">
        <strong>Plot : </strong> <br />
        ${m.Plot}.
      </li>
    </ul>
  </div>
</div>
</div>`;
}

//  halaman setelah tombol search di klik
$(".tombol-pencarian").on("click", function () {
  let inputValue = $(".input-keyword").val();
  $(".loading").toggleClass("d-none");

  $.ajax({
    url: `https://www.omdbapi.com/?i=tt3896198&apikey=d48c8ef8&s=${inputValue}`,
    success: (hasil) => {
      $(".loading").toggleClass("d-none");

      const movies = hasil.Search;
      console.log(movies);
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);
      // ketika tombol movie-detail-button di klik
      $(".movie-detail-button").on("click", function () {
        let dataImdbid = $(this).data("imdbid");
        $.ajax({
          url: `https://www.omdbapi.com/?i=${dataImdbid}&apikey=d48c8ef8&=`,
          success: (m) => {
            const movieDetails = showDetailMovies(m);
            console.log(m);
            $(".modal-body").html(movieDetails);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });

  // function
  function showCards(m) {
    return `
    <div class="col-md-4 my-3">
      <div class="card">
        <img src="${m.Poster}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary movie-detail-button" data-bs-toggle="modal"
          data-bs-target="#movie-detail-modal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
      </div>
    </div>`;
  }

  function showDetailMovies(m) {
    return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid" />
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item active" aria-current="true">
          <h4>${m.Title}</h4>
        </li>
        <li class="list-group-item">
          <strong>Rating : </strong><i class="bi bi-star"></i> ${m.Ratings[0].Value}.
        </li>
        <li class="list-group-item">
          <strong>Language : </strong>  ${m.Language}.
        </li>
        <li class="list-group-item">
          <strong>Genre : </strong> ${m.Genre}.
        </li>
        <li class="list-group-item">
          <strong>Director : </strong> ${m.Director}.
        </li>
        <li class="list-group-item">
          <strong>Actor : </strong>${m.Actors}.
        </li>
        <li class="list-group-item">
          <strong>Writer : </strong> ${m.Writer}.
        </li>
        <li class="list-group-item">
          <strong>Plot : </strong> <br />
          ${m.Plot}.
        </li>
      </ul>
    </div>
  </div>
  </div>`;
  }
});
