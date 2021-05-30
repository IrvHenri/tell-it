const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createDetailedStory = (story) => {};

const createStory = (story) => {
  const { title, avatar, initial_content, created_at, username, id } = story;
  const safeTitle = escape(title);
  const safeContent = escape(initial_content);
  const $story = $(`
  <article class ='story-article' data-id= ${id}>
  <header>
  <h3> ${username}</h3>
   <div> <img src = ${avatar} alt= 'avatar' class = 'avatar'> </div>
  </header>
  <h2>${safeTitle}</h2>
  <p class ='story-content'> ${safeContent}</p>

  <footer> <small>${timeago.format(
    created_at
  )} </small> <button class = 'view-story-btn' > View Story </button> </footer>
  </article>

  `);
  return $story;
};

const createContribution = (contribution) => {
  const { content, created_at, username } = contribution;
  const $contribution = $(`<article>
  <header>${username}</header>
  <p>${content}</p>
  <footer>${timeago.format(
    created_at
  )}<div><i class="fas fa-check-circle"></i><i class="fas fa-arrow-up"></i></div></footer>
  </article`);

  return $contribution;
};

const renderStories = (stories, tab) => {
  stories.forEach((story) => {
    $(tab).prepend(createStory(story));
  });
};

const renderContributions = (contributions, tab) => {
  contributions.forEach((contribution) => {
    $(tab).prepend(createContribution(contribution));
  });
};
