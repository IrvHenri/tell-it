$(() => {
  $('.content-container').on("click", ".submit-contribution", function() {
    const content = $("#content").val();
    const user_id = localStorage.getItem("user_id");
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
    $.post(`/stories/${story_id}/contribution`, {user_id, story_id, content})
    .then(() => {
      $(".contribution-widget textarea").val("");
      $.get(`/stories/${story_id}`)
      .then((data) => {
        const { story, contributions } = data;
        $(".content-container").empty();
        $(".content-container").prepend($contributionWidget);
        renderViewedStory(story, ".content-container", false);
        renderContributions(contributions, ".contribution-container", story.user_id);
      })
      .then(() => {
        $.get(`/stories/${story_id}/acceptedContributions`)
        .then(data => {
          data.map(data => {
            $('.contributions-container').append(`<p>${data.content}</p>`)
          })
        })
      })
    });
  });
});
