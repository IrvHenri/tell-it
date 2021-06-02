$(() => {
  $(".content-container").on("click", ".submit-contribution", function () {
    const content = $("#content").val();
    const user_id = localStorage.getItem("user_id");
    const story_id = $(this)
      .closest(".content-container")
      .children(".story-article")
      .attr("data-id");
    const created_at = new Date().toISOString();
    $.post(`/stories/${story_id}/contribution`, {
      user_id,
      story_id,
      content,
      created_at,
    })
      .then(() => {
        reRender(story_id);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
