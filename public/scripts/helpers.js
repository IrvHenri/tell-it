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
  )} </small><button class = 'mark-complete-btn'>Mark Complete</button> <button class = 'view-story-btn' > View Story </button> </footer>
  </article>

  `);
  return $story;
};

const randomColor = () => {
  const colors = [
    "#35d461",
    "#37b6f6",
    "#639fb0",
    "#047cac",
    "#9ad2a9",
    "#f5f5f5",
  ];
  let randomNum = Math.floor(Math.random() * 5) + 1;
  return colors[randomNum];
};

const createContribution = (contribution) => {
  const { content, created_at, username, avatar } = contribution;
  const $contribution = $(`<article class='contribution'>
  <header>${username} <div> <img  src = ${avatar} alt = 'avatar' class = 'avatar'>  </div></header>
  <p>${content}</p>
  <footer>${timeago.format(
    created_at
  )}<div class ='contribution-icons'><i class="fas fa-check-circle"></i><i class="fas fa-arrow-up"></i></div></footer>
  </article>`);
  $($contribution).css("background", randomColor());
  return $contribution;
};

const renderStories = (stories, tab) => {
  stories.forEach((story) => {
    $(tab).prepend(createStory(story));
  });
};

const renderStory = (story, tab) => {
  $(tab).append(createStory(story));
};

const renderContributions = (contributions, tab) => {
  $(tab).empty();
  contributions.map((contribution) => {
    $(tab).append(createContribution(contribution));
  });
};
