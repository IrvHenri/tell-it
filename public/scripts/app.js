$(() => {
  // Homepage events/clicks
  $("#home-page").on("click", () => {
    $("#home").empty();
    loadHomePage();
  });

  $(".create-story-form").submit((e) => {
    e.preventDefault();
    let title = $("#title").val();
    let initial_content = $("#initial_content").val();

    $.post("/stories", { title, initial_content })
      .then(() => {
        $("jquery-modal").hide();
      })
      .catch((err) => console.log(err));
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const renderStories = (stories) => {
    stories.forEach((story) => {
      $("#home").prepend(createStory(story));
      //Event listener for 'view more stories'
      $('.story-article footer button').on('click', function() {
        console.log(story);
      })
    });
  };

  const createStory = (story) => {
    const { title, avatar, initial_content, created_at, username } = story;
    const safeTitle = escape(title);
    const safeContent = escape(initial_content);
    const $story = $(`
    <article class ='story-article'>
    <header>
    <h3> ${username}</h3>
     <div> <img src = ${avatar} alt= 'avatar' class = 'avatar'> </div>
    </header>
    <h2>${safeTitle}</h2>
    <p class ='story-content'> ${safeContent}</p>

    <footer> <small>${timeago.format(
      created_at
    )} </small> <button> View Story </button> </footer>
    </article>

    `);
    return $story;
  };

  // $("#story-page").on("click", () => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/stories",
  //   }).done((stories) => {
  //     $("#story").removeClass("hidden").addClass("show");
  //     $("#home").removeClass("show").addClass("hidden");
  //     $("#user-stories").removeClass("show").addClass("hidden");
  //   });
  // });
  // $("#user-page").on("click", () => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/stories",
  //   }).done((stories) => {
  //     $("#user-stories").removeClass("hidden").addClass("show");
  //     $("#story").removeClass("show").addClass("hidden");
  //     $("#story").removeClass("show").addClass("hidden");
  //   });
  // });

  const loadHomePage = () => {
    $.ajax("/stories")
      .then((data) => {
        let stories = data.stories;
        renderStories(stories);
        $("#home").removeClass("hidden").addClass("show");
        $("#story").removeClass("show").addClass("hidden");
        $("#user-stories").removeClass("show").addClass("hidden");
      })
      .catch((err) => console.log(err));
  };

  loadHomePage();
});
