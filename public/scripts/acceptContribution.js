//creator of story can accept a contribution; this merges it to the rest of the story
/*
  DONE 1. Render only those contributions that are 'not reviewed'
  DONE 2. Add a button (only for author) that sends an acceptance POST request to server
  DONE 3. Re-render contributions post accept
  4. Merge the contribution into 'stories' post accept
    *Render accepted contributions by their accepted_at date
    *Show who contributed what (stretch?)
*/

$(() => {
  $(".content-container").on('click', '.accept-contribution-btn', function(){
    //Needs a check to make sure user sending request is the real user on FE
    const contribution_id = $(this).attr("data-id")
    $.post(`/contributions/${contribution_id}`)
    .then(() => {
      const story_id = $(this).closest(".content-container").children(".story-article").attr("data-id");
      $(".content-container").empty();
      $.get(`/stories/${story_id}`)
        .then((data) => {
          const { story, contributions } = data;
          if (story.is_complete) {
            $(".content-container").removeClass("view-user-page");
            $(".content-container").removeClass("view-story-container");
            renderViewedStory(story, ".content-container", false);
          } else {
            isAuthorView(story, contributions, $contributionWidget);
          }
        })
        .catch((err) => console.log(err));
    })
  })
})
