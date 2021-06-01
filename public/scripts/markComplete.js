const renderMarkCompleteBtn = (story) => {
  const uid = localStorage.getItem('user_id')
  if(uid == story.user_id){
    $('.story-article').append(`
    <button class='mark-complete'>Mark Complete</button>
    `)
  }
}
