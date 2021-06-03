$(() => {
  const user = localStorage.getItem("user_id");
  user &&
    $(".create-story-btn-container").html(`

    <a href="#ex1" rel="modal:open" class="create-story-btn"><i class="fas fa-pencil-alt"></i></a>

  `);
});
