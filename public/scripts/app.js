$(() => {
  // Home Tab event

  const loadHomePage = () => {
    $(".content-container").empty();
    $.ajax("/stories")
      .then((data) => {
        let stories = data.stories;
        renderStories(stories, ".content-container");
      })
      .catch((err) => console.log(err));
  };

  $("#home-page").on("click", () => {
    $(".content-container").empty();
    $(".content-container").removeClass("view-story-container");
    $(".content-container").removeClass("view-user-page");
    loadHomePage();
  });

  // AJAX POST - Create Story form
  $(".create-story-form").submit((e) => {
    e.preventDefault();
    const title = $("#title").val();
    const initial_content = $("#initial_content").val();
    const user_id = localStorage.getItem("user_id");
    $.modal.close();
    $.post("/stories", { user_id, title, initial_content })
      .then(loadHomePage)
      .catch((err) => console.log(err));
  });
  loadHomePage();
});
