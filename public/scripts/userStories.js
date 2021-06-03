//Third tab, current logged in user's stories
$(() => {
  $("#user-page").on("click", () => {
    $(".content-container").empty();
    $(".content-container").removeClass("view-story-container");
    $(".content-container").addClass("view-user-page");
    loadStoriesPage();
  });

  const loadStoriesPage = () => {
    const currUserId = localStorage.getItem("user_id");
    if (!currUserId) {
      $(".content-container").prepend(`
          <div class='user-stories-fail'>
            <h1>Looks like you aren't logged in :( </h1>
            <h2>Sign up to write your own stories!</h2>
          </div>`);
    } else {
      $.ajax(`/users/${currUserId}/stories`)
        .then((data) => {
          let stories = data.stories;
          //If user doesn't have stories, render something else
          if (stories.length === 0) {
            $(".content-container").prepend(`
          <div class='user-stories-fail'>
            <h1>Uh Oh</h1>
            <h2>You haven't written any stories!</h2>
            <a href="#ex1" rel="modal:open">
              <button>Write a story!</button>
            </a>
          </div>`);
          } else {
            renderStories(stories, ".content-container");
          }
        })
        .catch((err) => console.log(err));
    }
  };
});
