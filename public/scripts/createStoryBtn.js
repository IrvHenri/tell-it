$(() => {
  const user = localStorage.getItem('user_id')
  user && $(".create-story-btn-container").html(`
  <button class="create-story-btn">
    <a href="#ex1" rel="modal:open"><i class="fas fa-pencil-alt"></i></a>
  </button>
  `)
})
