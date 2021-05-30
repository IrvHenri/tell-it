$(() => {
  // Homepage events/clicks
  $("#home-page").on("click", () => {
    $("#home").empty();
    loadHomePage();
  });

  $(".create-story-form").submit((e) => {
    e.preventDefault();
    let title = $("#title").val();
    let initial_content = $("#initial_content").val();

    $.post("/stories", { title, initial_content })
      .then(() => {
        $("jquery-modal").hide();
      })
      .catch((err) => console.log(err));
  });

  // $("#story-page").on("click", () => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/stories",
  //   }).done((stories) => {
  //     $("#story").removeClass("hidden").addClass("show");
  //     $("#home").removeClass("show").addClass("hidden");
  //     $("#user-stories").removeClass("show").addClass("hidden");
  //   });
  // });
  // $("#user-page").on("click", () => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/stories",
  //   }).done((stories) => {
  //     $("#user-stories").removeClass("hidden").addClass("show");
  //     $("#story").removeClass("show").addClass("hidden");
  //     $("#story").removeClass("show").addClass("hidden");
  //   });
  // });

  const loadHomePage = () => {
    $.ajax("/stories")
      .then((data) => {
        let stories = data.stories;
        renderStories(stories, "#home");
        $("#home").removeClass("hidden").addClass("show");
        $("#story").removeClass("show").addClass("hidden");
        $("#user-stories").removeClass("show").addClass("hidden");
      })
      .catch((err) => console.log(err));
  };

  loadHomePage();
});
