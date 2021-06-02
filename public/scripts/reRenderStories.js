const renderContributionWidget = (story_id) => {
  return $(`
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
}

const reRender = (story_id) => {
  const $contributionWidget = renderContributionWidget(story_id);
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
}
