var ratedIndex = -1,
   uID = 0;
$(document).ready(function () {
   resetStarColor();
   if (localStorage.getItem("ratedIndex") != null) {
      setStars(parseInt(localStorage.getItem("ratedIndex")));
      uID = localStorage.getItem("uID");
   }
   $(".fa-star").on("click", function () {
      ratedIndex = parseInt($(this).data("index"));
      localStorage.setItem("ratedIndex", ratedIndex);
      saveToTheDB();
   });
   $(".fa-star").mouseover(function () {
      resetStarColor();
      var currentIndex = parseInt($(this).data("index"));
      for (var i = 0; i <= currentIndex; i++) {
         $(".fa-star:eq(" + i + ")").css("color", "yellow");
      }
   });
   $(".fa-star").mouseleave(function () {
      resetStarColor();
      if (ratedIndex != -1) {
         setStars(ratedIndex);
      }
   });
});

function setStars(max) {
   for (var i = 0; i <= max; i++) {
      $(".fa-star:eq(" + i + ")").css("color", "yellow");
   }
}

function resetStarColor() {
   $(".fa-star").css("color", "white");
}

function saveToTheDB() {
   $.ajax({
      url: "rateus.php",
      method: "POST",
      dataType: "json",
      data: {
         save: 1,
         uID: uID,
         ratedIndex: ratedIndex,
      },
      success: function (r) {
         uID = r.id;
         localStorage.setItem("uID", uID);
      },
   });
}
