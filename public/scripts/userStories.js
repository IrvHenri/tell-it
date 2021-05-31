//Third tab, current logged in user's stories
$(() => {
  $("#user-page").on("click", () => {
    $(".content-container").empty();
    loadStoriesPage();
  });

  const loadStoriesPage = () => {
    const currUserId = localStorage.user_id;
    if(!currUserId){
      $(".content-container").prepend(`
          <div>
            <h1>Looks like you aren't logged in :( </h1>
            <h2>Sign up to write your own stories!</h2>
          </div>`)
    } else {
      $.ajax(`/users/${currUserId}/stories`)
      .then((data) => {
        let stories = data.stories;
        //If user doesn't have stories, render something else
        if(stories.length === 0){
          $(".content-container").prepend(`
          <div>
            <h1>Uh Oh</h1>
            <h2>This user has no stories!</h2>
          </div>`)
        } else {
          renderStories(stories, ".content-container");
        }
      })
      .catch((err) => console.log(err));
    }
  };
});
