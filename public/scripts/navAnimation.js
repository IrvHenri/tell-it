$(document).ready(() => {
  const scrollFunction = () => {
    if ($(".content-container").scrollTop() > 75) {
      $(".jump-btn").show();
    } else {
      $(".jump-btn").hide();
    }
  };
  // Jump to top of window function
  $(".jump-btn").click(() => {
    jumpToTop();
  });
  const jumpToTop = () => {
    $(".content-container").scrollTop(0);
  };

  $(".content-container").scroll(() => {
    scrollFunction();
  });
});
