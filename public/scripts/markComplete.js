$(() => {
  $(document).on("click", ".mark-complete-btn", function () {
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    const user_id = localStorage.getItem("user_id")
    $.post(`/stories/${story_id}`, { story_id, user_id })
      .then(() => {
        reRender(story_id)
      })
      .catch((e) => console.log(e));
  });
});
