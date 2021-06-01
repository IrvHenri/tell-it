$(document).ready(() => {
  // Jump to top of window function
  $(".navbar h1").click(() => {
    jumpToTop();
  });
  const jumpToTop = () => {
    $(document).scrollTop(0);
  };
});
