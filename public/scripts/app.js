$(() => {
  // Homepage events/clicks
  $("#home-page").on("click", () => {
    $("#home").empty();
    loadHomePage();
  });

  // AJAX POST - Create Story form
  $(".create-story-form").submit((e) => {
    e.preventDefault();
    const title = $("#title").val();
    const initial_content = $("#initial_content").val();
    const user_id = localStorage.user_id;

    $(".jquery-modal").css("display", "none");
    $.post("/stories", { user_id, title, initial_content })
      .then(() => {
        loadHomePage();
        console.log("Success!");
      })
      .catch((err) => console.log(err));
  });

  // AJAX GET - View story button
  $(document).on("click", ".view-story-btn", function (e) {
    $("#story").empty();
    const story_id = $(this).closest("article[data-id]").attr("data-id");
    let $contributionWidget = $(`<div class= 'contribution-widget'>
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
        $("#story").prepend(createStory(story));
        $("#story").prepend($contributionWidget);
        renderContributions(contributions, "#story");
        $("#story").removeClass("hidden").addClass("show");
        $("#home").removeClass("show").addClass("hidden");
        $("#user-stories").removeClass("show").addClass("hidden");
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
        renderStories(stories, "#home");
        $("#home").removeClass("hidden").addClass("show");
        $("#story").removeClass("show").addClass("hidden");
        $("#user-stories").removeClass("show").addClass("hidden");
      })
      .catch((err) => console.log(err));
  };

  loadHomePage();
});
