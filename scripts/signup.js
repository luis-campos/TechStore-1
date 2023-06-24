function validateForm(event) {
  event.preventDefault();

  const usernameInput = document.forms["signupForm"]["username"];
  const passwordInput = document.forms["signupForm"]["password"];
  const confirmPasswordInput = document.forms["signupForm"]["confirmPassword"];

  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  usernameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  let isValid = true;

  if (usernameInput.value.length < 5) {
    usernameError.textContent = "O nome de usuário deve ter pelo menos 5 caracteres.";
    isValid = false;
  }

  if (passwordInput.value.length < 5 || !(/^\d+$/.test(passwordInput.value))) {
    passwordError.textContent = "A senha deve ter pelo menos 5 caracteres e conter somente números.";
    isValid = false;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.textContent = "As senhas não coincidem.";
    isValid = false;
  }

  if (isValid) {
    let users = localStorage.getItem("loginData");

    if (users) {
      users = JSON.parse(users);
    } else {
      users = [];
    }

    let lastID = 0;
    if (users.length > 0) {
      lastID = users[users.length - 1].id;
    }

    const newUser = {
      id: lastID + 1,
      username: usernameInput.value,
      password: passwordInput.value
    };

    users.push(newUser);

    localStorage.setItem('loginData', JSON.stringify(users));
    window.location.href = "./homepage.html";
  }
}
