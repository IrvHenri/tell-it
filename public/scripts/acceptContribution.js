$(() => {
  $(".content-container").on('click', '.accept-contribution-btn', function(){
    const contribution_id = $(this).attr("data-id")
    const story_id = $(this).closest(".content-container").children(".story-article").attr("data-id");
    const user_id = localStorage.getItem("user_id")
    $.post(`/contributions/${contribution_id}`, {user_id})
    .then(() => {
      reRender(story_id)
    })
  })
})
