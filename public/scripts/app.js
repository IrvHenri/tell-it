$(() => {
  // Homepage events/clicks
  $("#home-page").on("click", () => {
    $(".content-container").empty();
    loadHomePage();
  });

  // AJAX POST - Create Story form
  $(".create-story-form").submit((e) => {
    e.preventDefault();
    const title = $("#title").val();
    const initial_content = $("#initial_content").val();
    const user_id = localStorage.user_id;

    $.modal.close();
    $.post("/stories", { user_id, title, initial_content })
      .then(loadHomePage)
      .catch((err) => console.log(err));
  });

  // AJAX GET - View story button
  $(document).on("click", ".view-story-btn", function (e) {
    $(".content-container").empty();
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    let $contributionWidget = $(`
    <div class= 'contribution-widget'>
      <h2>Submit a contribution!</h2>
      <form class= 'contribution-form' method="POST" action="/stories/${story_id}/contribution">
        <textarea id ='content' name="content" type="text" rows="4" cols="50" placeholder="What comes next?">
        </textarea>
        <button type="submit">Submit</button>
      </form>
      </div>
      `);
    $.ajax(`/stories/${story_id}`)
      .then((data) => {
        const { story, contributions } = data;
        $(".content-container").prepend(createStory(story));
        $(".content-container").prepend($contributionWidget);
        renderContributions(contributions, ".content-container");
      })
      .catch((err) => console.log(err));
  });

  // AJAX POST - Contribution form
  $(".contribution-form").submit((e) => {
    e.preventDefault();
    const content = $("#content").val();
    const user_id = localStorage.user_id;
    // const story_id = $(this).siblings("article[data-id]").attr("data-id"); Need to find way to get story_id
    $.post(`/stories/${story_id}/contribution`, {
      user_id,
      story_id,
      content,
    })
      .then(() => {
        console.log("Success!");
      })
      .catch((err) => console.log(err));
  });

  const loadHomePage = () => {
    $.ajax("/stories")
      .then((data) => {
        let stories = data.stories;
        renderStories(stories, ".content-container");
      })
      .catch((err) => console.log(err));
  };

  loadHomePage();
});
