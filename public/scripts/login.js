const renderLoginForm = () => {
  const uid = localStorage.getItem('user_id')
  const username = localStorage.getItem('user_name');
  if(uid){
    $('.user-login').html(`
    <p>Welcome ${username}!</p>
    <button class='logout'>Logout</button>
  `)
  } else {
    $('.user-login').html(`
    <form>
      <input id='login-input' type="text">
      <button class='login'>Login</button>
    </form>
    `)
  }
}

const login = (loginVal) => {
  $(".user-login #login-error").remove()
  $.post('/users/login', {loginVal})
  .then(data => {
    localStorage.setItem('user_id', data.id);
    localStorage.setItem('user_name', data.username);
    location.reload()
  })
  .catch(err => {
    $(".user-login").prepend(`<p id='login-error'>ERROR: Please try again</p>`)
  })
}

const logout = () => {
  localStorage.removeItem('user_id');
  location.reload()
}

$(() => {
  renderLoginForm()
  $('.user-login').on('click', '.logout', function(){
    logout()
  })

  $('.user-login').on('click', '.login', function(e){
    e.preventDefault();
    login($('#login-input').val())
  })
})
