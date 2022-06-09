const email = document.getElementById("email");
const imgInput = document.getElementById("imgInput");
const profileImg = document.getElementById("profileImg");

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

function ValidateEmail(input) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) return true;
  else return false;
}
