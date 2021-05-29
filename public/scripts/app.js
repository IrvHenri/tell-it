$(() => {
  $("#home-page").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/stories",
    }).done((stories) => {
      // for (story of stories) {
      //   $("<div>").text(user.name).appendTo($("body"));
      //   console.log(story);
      // }
      $("#home").removeClass("hidden").addClass("show");
      $("#story").removeClass("show").addClass("hidden");
      $("#user-stories").removeClass("show").addClass("hidden");
    });
  });
  $("#story-page").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/stories",
    }).done((stories) => {
      // for (story of stories) {
      //   $("<div>").text(user.name).appendTo($("body"));
      //   console.log(story);
      // }
      $("#story").removeClass("hidden").addClass("show");
      $("#home").removeClass("show").addClass("hidden");
      $("#user-stories").removeClass("show").addClass("hidden");
    });
  });
  $("#user-page").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/stories",
    }).done((stories) => {
      // for (story of stories) {
      //   $("<div>").text(user.name).appendTo($("body"));
      //   console.log(story);
      // }
      $("#user-stories").removeClass("hidden").addClass("show");
      $("#story").removeClass("show").addClass("hidden");
      $("#story").removeClass("show").addClass("hidden");
    });
  });
});
