$(() => {
  $(".content-container").on("click", ".view-story-btn", function () {
    $(".content-container").removeClass("view-user-page");
    $(".content-container").addClass("view-story-container");
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    reRender(story_id);
  });
});
