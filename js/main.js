/* https://image.tmdb.org/t/p/original */

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
      //.get("http://www.omdbapi.com?s=" + searchText + "&apikey=53bfb4cb")
      .then(function (response) {
         console.log(response);
         let movies = response.data.results;
         let output = "";

         // Everything you see after search is here
         $.each(movies, function (index, movie) {
            output += `
            <div class="col-md-3">
               <div class="text-center">
                  <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}">
                  <h5>${movie.title}</h5>
                  <a onclick="movieSelected('${movie.id}')" class="btn btn-dark" href="#">Movie Details</a>
               </div> 
            </div>
            `;
         });

         // ^ this whole thing is passed to the #movies div inside index.html
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

         //Each movie on movie.html html is here add classes here to do css thingy
         let output = `
         <div class = "row">
            <div class = "col-md-4">
            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" class="">
            </div>
            <div class = "col-md-8">
               <h2 class="movieHead">${movie.title}</h2>
               <ul class="list-group">
                  <li class="list-group-item"><strong>Genre: </strong> ${movie.genres[0].name}, ${movie.genres[1].name}, ${movie.genres[2].name}</li>
                  <li class="list-group-item"><strong>Released: </strong>${movie.release_date}</li>
                  <li class="list-group-item"><strong>Runtime (mins): </strong>${movie.runtime}</li>
                  <li class="list-group-item"><strong>Rating: </strong>${movie.vote_average}</li>
                </ul>
            </div>
         </div>
         <div class = "row">
            <div class = "well">
               <h3>Plot</h3>
               ${movie.overview}
               <hr>
               <a href="http://imdb.com/title/${movie.imdb_id}" class="btn btn-dark">View on IMDB</a>
               <a href="index.html" class="btn btn-dark">Go back</a>
               <br>
               <br>           
            </div>
         </div>
         <div class = "row">
            <div class = "well">
               <h3>Cast</h3>
               
             ${actors}

            </div>
         </div>
         `;

         //^ all this is sent to movie.html in #movie div
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
