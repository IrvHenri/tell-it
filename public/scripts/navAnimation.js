$(document).ready(() => {
  const scrollFunction = () => {
    if ($(document).scrollTop() > 20) {
      $("nav").hide();
      $(".jump-btn").show();
    } else {
      $("nav").show();
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
