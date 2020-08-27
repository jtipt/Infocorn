$("#searchForm").on("submit", function (e) {
   let searchText = $("#searchText").val();
   getMovies(searchText);
   e.preventDefault(); //stops from from actually submitting to file
   $(".main-movies").slideUp();
});

function getMovies(searchText) {
   axios
      .get(
         "https://api.themoviedb.org/3/search/movie?api_key=1512aa34ca08b654cc993f8e4e2e539e&query=" +
            searchText
      )

      .then(function (response) {
         console.log(response);
         let movies = response.data.results;
         let output = "";

         //after search
         $.each(movies, function (index, movie) {
            output += `
            <div class="col-xs-6 col-md-4 col-lg-3">
               <div class="text-center">
                  <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="404 Not Found">
                  <a onclick="movieSelected('${movie.id}')" href="#"><h5>${movie.title}</h5></a>
               </div> 
            </div>
            `;
         });

         $("#movies").html(output);
      })
      .catch(function (error) {});
}

function movieSelected(id) {
   sessionStorage.setItem("movieId", id);
   window.location = "movie.html";
   return false;
}

function getMovie() {
   let movieId = sessionStorage.getItem("movieId");
   axios
      .get(
         "http://api.themoviedb.org/3/movie/" +
            movieId +
            "?api_key=1512aa34ca08b654cc993f8e4e2e539e&append_to_response=videos,credits"
      )
      .then(function (response) {
         console.log(response);
         let movie = response.data;
         let cast = response.data.credits.cast;
         let actors = "";
         $.each(cast, function (index, c) {
            actors += `
                 <ul style="display: inline-block; font-size:24px;padding:10px;"><li>${c.name}</li></ul>
          `;
         });

         let output = `
         <div class = "row">
            <div class = "col-md-4">
            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" class="">
            </div>
            <div class = "col-md-8">
            <a href="http://imdb.com/title/${movie.imdb_id}/"><h2 class="movieHead">${movie.title}</h2></a>
               <ul class="tilesWrap">
                  <li class="l">
                     <h2>Details</h2>
                     <h3>Details</h3>
                        <ul>
                           <li class=""><strong>Genre: </strong> ${movie.genres[0].name}, ${movie.genres[1].name}, ${movie.genres[2].name}</li>
                           <li class=""><strong>Released: </strong>${movie.release_date}</li>
                           <li class=""><strong>Runtime (mins): </strong>${movie.runtime}</li>
                           <li class=""><strong>Rating: </strong>${movie.vote_average}</li>
                     </ul>
                  </li>
               </ul>
              
            </div>
         </div>
         <div class = "row">
               <ul class="tilesWrap">
               <li class = "l l2">
               <h2>Plot</h2>
               <h3>Plot</h3>
               <p style="font-size:2rem">${movie.overview}</p>
               <hr>
               
                     
               </li>
            <ul>
         </div>
         <div class = "row">
            <ul class="tilesWrap">
            <li class="l l2">   
            <h3>Cast</h3>
            <h2>Cast</h2>
               
             ${actors}
            </li>
            </ul>
         </div>
         `;

         $("#movie").html(output);
         $("title").html(movie.title);
      })
      .catch(function (error) {});
}

function myFunction() {
   var x = document.getElementById("myTopnav");
   if (x.className === "topnav") {
      x.className += " responsive";
   } else {
      x.className = "topnav";
   }
}

var slideIndex = 0;
showSlides();
function showSlides() {
   var i;
   var slides = document.getElementsByClassName("mySlides");
   for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }
   slideIndex++;
   if (slideIndex > slides.length) {
      slideIndex = 1;
   }
   slides[slideIndex - 1].style.display = "block";
   setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function scrollWin() {
   window.scrollBy(0, 700);
}

function todo() {
   scrollWin();
   getMovies(searchText);
}
