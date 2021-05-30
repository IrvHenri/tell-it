const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createDetailedStory = (story) => {

}

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

const renderStories = (stories, tab) => {
  stories.forEach((story) => {
    $(tab).prepend(createStory(story));
    //Event listener for 'view more stories'
    $('.story-article footer button').on('click', function() {
      console.log(story);
    })
  });
};

const renderContributions = (contributions) => {
  contributions.forEach(contribution => {
    $(tab).prepend(createStory(story));
  })
}
