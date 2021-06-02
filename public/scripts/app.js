$(() => {
  // Home Tab event

  const loadHomePage = () => {
    $(".content-container").empty();
    $.get("/stories")
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
    const created_at = new Date().toISOString();
    $.modal.close();
    $.post("/stories", { user_id, title, initial_content, created_at })
      .then(() => {
        loadHomePage();
        $(".create-story-form input").val("");
        $(".create-story-form textarea").val("");
      })
      .catch((err) => console.log(err));
  });

  loadHomePage();
});
