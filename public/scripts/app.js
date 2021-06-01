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
    $(".content-container").removeClass("user-page");
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

  // $(document).on("click", ".mark-complete-btn", function () {
  //   const story_id = $(this).closest("article[data-id]").attr("data-id");
  //   // Need to Validate
  //   $.post(`/stories/${story_id}`, { story_id: story_id })
  //     .then(() => {
  //       $.get(`/stories/${story_id}`)
  //         .then((data) => {
  //           const { story } = data;
  //           $(".content-container").empty();
  //           renderStory(story, ".content-container");
  //         })
  //         .catch((e) => console.log(e));
  //     })
  //     .catch((e) => console.log(e));
  // });
  loadHomePage();
});
