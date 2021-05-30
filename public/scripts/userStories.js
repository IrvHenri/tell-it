//Third tab, current logged in user's stories
$(() => {
  $("#user-page").on("click", () => {
    $("#user-stories").empty();
    loadStoriesPage();
  });

  const loadStoriesPage = () => {
    const currUserId = localStorage.user_id;
    $("#home").removeClass("show").addClass("hidden");
    $("#story").removeClass("show").addClass("hidden");
    $("#user-stories").removeClass("hidden").addClass("show");
    $.ajax(`/users/${currUserId}/stories`)
      .then((data) => {
        let stories = data.stories;
        //If user doesn't have stories, render something else
        renderStories(stories, "#user-stories");
      })
      .catch((err) => console.log(err));
  };

  // //loadHomePage();
});
