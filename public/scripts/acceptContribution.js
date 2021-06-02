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
    //Also needs a TON of refactoring.
    const contribution_id = $(this).attr("data-id")
    $.post(`/contributions/${contribution_id}`)
    .then(() => {
      const story_id = $(this).closest(".content-container").children(".story-article").attr("data-id");
      const $contributionWidget = $(`
      <div class = 'side-bar'>
      <div class= 'contribution-widget'>
        <h2>Submit a contribution!</h2>
        <textarea id ='content' name="content" class='text-field'  rows="4" cols="50" placeholder = "What happens next?" required ></textarea>
          <button type="button" class = 'submit-contribution' >Submit</button>
        </div>
        <div data-id=${story_id} class ='contribution-container'>
        </div>
      </div>
        `);
      $(".content-container").empty();
      $.get(`/stories/${story_id}`)
        .then((data) => {
          const { story, contributions } = data
          isAuthorView(story, contributions, $contributionWidget);
        })
        .then(() => {
          $.get(`/stories/${story_id}/acceptedContributions`)
          .then(data => {
            data.map(data => {
              $('.contributions-container').append(`<p>${data.content}</p>`)
            })
          })
        })
        .catch((err) => console.log(err));
    })
  })
})
