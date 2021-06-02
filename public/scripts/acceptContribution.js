$(() => {
  $(".content-container").on('click', '.accept-contribution-btn', function(){
    //Needs a check to make sure user sending request is the real user on FE
    const contribution_id = $(this).attr("data-id")
    const story_id = $(this).closest(".content-container").children(".story-article").attr("data-id");
    $.post(`/contributions/${contribution_id}`)
    .then(() => {
      reRender(story_id)
    })
  })
})
