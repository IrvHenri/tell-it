$(() => {
  $(".content-container").on('click', '.upvote-btn', function(){
    const user_id = localStorage.getItem("user_id")
    const contribution_id = $(this).attr("data-id")
    $.post(`/contributions/${contribution_id}/upvote`, {user_id})
    .then(() => {
      console.log($(this).closest(".contribution-container").attr("data-id"))
      //Reload the stories page... or use the hacky solution of adding one to upvotes.
      //location.reload()
    })
    .catch(err => console.log(err))
  })
})
