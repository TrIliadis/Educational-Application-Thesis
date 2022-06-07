const form = document.getElementById("registerForm");
const username = document.getElementById("name");
const email = document.getElementById("email");
const surname = document.getElementById("surname");
const imgInput = document.getElementById("imgInput");
const profileImg = document.getElementById("profileImg");
let image = "";

imgInput.onchange = (e) => {
  const [file] = imgInput.files;
  if (file) {
    profileImg.src = URL.createObjectURL(file);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    username.value.length > 0 &&
    surname.value.length > 0 &&
    ValidateEmail(email.value) &&
    ValidatePassword() &&
    ValidatePassword2()
  ) {
    const data = new FormData();
    data.append("username", email.value);
    data.append("name", username.value);
    data.append("surname", surname.value);
    data.append("password", password.value);
    data.append("image", imgInput.files[0]);

    await fetch("/register", {
      method: "POST",
      body: data,
    });
  }
});

function ValidateEmail(input) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) return true;
  else return false;
}

function ValidatePassword() {
  const password = document.getElementById("password");
  const validRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (password.value.match(validRegex)) return true;
  else {
    password.value = "";
    return false;
  }
}

function ValidatePassword2() {
  const password = document.getElementById("password");
  const password2 = document.getElementById("validatePassword");
  if (password.value === password2.value) return true;
  else {
    password2.value = "";
    return false;
  }
}
