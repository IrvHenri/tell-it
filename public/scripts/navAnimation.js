$(document).ready(() => {
  const scrollFunction = () => {
    if ($(document).scrollTop() > 75) {
      $("nav").slideUp(500);
      $(".jump-btn").show();
    } else {
      $("nav").slideDown();
      $(".jump-btn").hide();
    }
  };
  // Jump to top of window function
  $(".jump-btn").click(() => {
    jumpToTop();
  });
  const jumpToTop = () => {
    $(document).scrollTop(0);
  };

  $(window).scroll(() => {
    scrollFunction();
  });
});
