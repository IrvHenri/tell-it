const renderLoginForm = () => {
  const uid = localStorage.getItem('user_id')
  if(uid){
    $('.user-login').html(`
    <p>Welcome! ${uid}</p>
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
  //More robust login/auth TBD
  $.post('/users/login', {loginVal})
  .then(data => {
    console.log(data)
    localStorage.setItem('user_id', data.id);
    location.reload()
  })
  .catch(err => console.log(err))
  // localStorage.setItem('user_id', val);
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
