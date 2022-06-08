const email = document.getElementById("email");
const imgInput = document.getElementById("imgInput");
const profileImg = document.getElementById("profileImg");
const invalidEmail = document.getElementById("invalidEmail");
const pass = document.getElementById("password");
const invalidPass = document.getElementById("invalidPass");
const pass2 = document.getElementById("validatePassword");
const invalidPass2 = document.getElementById("invalidPass2");

imgInput.onchange = (e) => {
  const [file] = imgInput.files;
  if (file) {
    profileImg.src = URL.createObjectURL(file);
  }
};

email.onchange = (e) => {
  if (!ValidateEmail(email.value)) {
    invalidEmail.classList.add("d-block");
  } else invalidEmail.classList.remove("d-block");
};

pass.onchange = (e) => {
  if (!ValidatePassword(pass.value)) {
    invalidPass.classList.add("d-block");
  } else invalidPass.classList.remove("d-block");
};

pass2.onchange = (e) => {
  if (!ValidatePassword2(pass2.value)) {
    invalidPass2.classList.add("d-block");
  } else invalidPass2.classList.remove("d-block");
};

function ValidateEmail(input) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) return true;
  else return false;
}

function ValidatePassword() {
  const validRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (pass.value.match(validRegex)) return true;
  else return false;
}

function ValidatePassword2() {
  if (pass.value === pass2.value) return true;
  else return false;
}
