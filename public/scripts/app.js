$(() => {
  // Homepage events/clicks
  $("#home-page").on("click", () => {
    $("#home").empty();
    loadHomePage();
  });

  //Create Story form events/post
  $(".create-story-form").submit((e) => {
    e.preventDefault();
    let title = $("#title").val();
    let initial_content = $("#initial_content").val();
    const user_id = localStorage.user_id;
    $.post("/stories", { user_id, title, initial_content })
      .then(() => {
        loadHomePage();
        console.log("Success!");
      })
      .catch((err) => console.log(err));
  });

  //View story button click event
  $(document).on("click", ".view-story-btn", function (e) {
    $("#story").empty();
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    $.ajax(`/stories/${story_id}`)
      .then((data) => {
        const { story, contributions } = data;
        $("#story").prepend(createStory(story));
        renderContributions(contributions, "#story");
        $("#story").removeClass("hidden").addClass("show");
        $("#home").removeClass("show").addClass("hidden");
        $("#user-stories").removeClass("show").addClass("hidden");
      })
      .catch((err) => console.log(err));
  });

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
