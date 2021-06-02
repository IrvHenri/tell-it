$(() => {
  $(".content-container").on("click", ".view-story-btn", function (e) {
    $(".content-container").empty();
    $(".content-container").removeClass("view-user-page");
    $(".content-container").addClass("view-story-container");
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    let $contributionWidget = $(`
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
  });
});
