$(() => {
  $(".content-container").on('click', '.upvote-btn', function(){
    const user_id = localStorage.getItem("user_id")
    const contribution_id = $(this).attr("data-id")
    const $upvoteSpan = $(this)
    .closest('.contribution')
    .children('header')
    .children('h5')
    .children('span');
    $.post(`/contributions/${contribution_id}/upvote`, {user_id})
    .then(data => {
      $.get(`/contributions/${data.contribution_id}/upvotes`)
      .then(data => {
        $upvoteSpan.fadeOut(400, function(){
          $upvoteSpan.text(data.count)
          $upvoteSpan.fadeIn(400)
        })
      })
    })
    .catch(err => {
      console.log("NO UPVOTE")
      console.log(err)
      $upvoteSpan
      .parent()
      .animate({color: "red"})
      .effect("shake", {distance: "5"})
      .animate({color: "black"});
    })
  })
})
