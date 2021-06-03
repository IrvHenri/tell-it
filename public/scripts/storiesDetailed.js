$(() => {
  $(".content-container").on("click", ".view-story-btn", function (e) {
    $(".content-container").empty();
    $(".content-container").removeClass("view-user-page");
    $(".content-container").addClass("view-story-container");
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    reRender(story_id);
  });
});
