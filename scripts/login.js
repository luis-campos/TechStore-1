document.addEventListener('DOMContentLoaded', function() {
  let users = localStorage.getItem('loginData');
  const userDefault = {
    id: 1,
    username: 'Automação',
    password: '12345'
  };

  if (users) {
    const usersArray = JSON.parse(users);

    const exists = usersArray.some(objeto => objeto.id === userDefault.id);
    if (!exists) {
      usersArray.push(userDefault);
      localStorage.setItem('loginData', JSON.stringify(usersArray));
    }
  } else {
    let usersArray = [userDefault];
    localStorage.setItem('loginData', JSON.stringify(usersArray));
  }
});

function validateForm(event) {
  event.preventDefault();

  let username = document.forms["loginForm"]["username"].value;
  let password = document.forms["loginForm"]["password"].value;

  let usernameError =  document.getElementById("usernameError");
  let passwordError = document.getElementById("passwordError");
  let userOrPasswordInvaid = document.getElementById("userOrPasswordInvalid");

  usernameError.textContent = "";
  passwordError.textContent = "";
  userOrPasswordInvaid.textContent = "";

  const userData = localStorage.getItem("loginData");

  if (userData) {
    const data = JSON.parse(userData);
    const isValidUser = data.some(user => user.username === username && user.password === password);

    if (username === "") {
      usernameError.textContent = "Por favor, insira um nome de usuário.";
    } else if (password === "") {
      passwordError.textContent = "Por favor, insira uma senha.";
    } else if (!isValidUser) {
      userOrPasswordInvaid.textContent = "Usuário ou senha incorretos.";
    } else {
      window.location.href = "./homepage.html";
    }
  }
}
