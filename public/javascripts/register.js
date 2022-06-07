const form = document.getElementById("registerForm");
const button = document.getElementById("registerButton");
const username = document.getElementById("name");
const email = document.getElementById("email");
const surname = document.getElementById("surname");
const town = document.getElementById("town");
const address = document.getElementById("address");
const imgInput = document.getElementById("imgInput");
const profileImg = document.getElementById("profileImg");

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
    ValidatePassword2() &&
    town.value.length > 0 &&
    address.value.length > 0
  ) {
    let details = {
      name: username.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      town: town.value,
      address: address.value,
      image: profileImg.src,
    };
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
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
  const validRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
