$(() => {
  $('.content-container').on("click", ".submit-contribution", function() {
    const content = $("#content").val();
    const user_id = localStorage.getItem("user_id");
    const story_id = $(this).closest(".content-container").children(".story-article").attr("data-id");
    $.post(`/stories/${story_id}/contribution`, {user_id, story_id, content})
    .then(() => {
      reRender(story_id)
    });
  });
});
