$(() => {
  $(".content-container").on('click', '.upvote-btn', function(){
    const user_id = localStorage.getItem("user_id")
    const contribution_id = $(this).attr("data-id")
    $.post(`/contributions/${contribution_id}/upvote`, {user_id})
    .then(data => {
      $.get(`/contributions/${data.contribution_id}/upvotes`)
      .then(data => {
        $(this)
        .closest('.contribution')
        .children('h5')
        .children('span')
        .text(data.count)
      })
    })
    .catch(err => {
      console.log("NO UPVOTE")
      console.log(err)
    })
  })
})
