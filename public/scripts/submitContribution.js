$(() => {
  $(".content-container").on("click", ".submit-contribution", function () {
    $(".contribution-widget #error-msg").remove()
    const content = $("#content").val();
    if(!content){
      $(".contribution-widget").append(`<p id='error-msg'>ERROR: Contribution cannot be empty!!</p>`)
      return;
    }
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
      created_at
    })
      .then(() => {
        reRender(story_id);
      })
      .catch((err) => {
        console.log(err);
        $(".contribution-widget").append(`<p id='error-msg'>ERROR: Please login to post a contribution!</p>`)
      });
  });
});
