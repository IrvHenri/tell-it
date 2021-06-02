$(() => {
  $(document).on("click", ".mark-complete-btn", function () {
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    $.post(`/stories/${story_id}`, { story_id: story_id })
      .then(() => {
        reRender(story_id)
      })
      .catch((e) => console.log(e));
  });
});
