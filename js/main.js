$("#searchForm").on("submit", function (e) {
   let searchText = $("#searchText").val();
   getMovies(searchText);
   e.preventDefault(); //stops from from actually submitting to file
});

function getMovies(searchText) {
   axios
      .get("http://www.omdbapi.com?s=" + searchText + "&apikey=53bfb4cb")
      .then(function (response) {
         console.log(response);
      })
      .catch(function (error) {});
}
