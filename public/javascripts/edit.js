const email = document.getElementById("email");
const imgInput = document.getElementById("imgInput");
const profileImg = document.getElementById("profileImg");
const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
const slider1 = document.getElementById("myRange1");
const output1 = document.getElementById("demo1");
const slider2 = document.getElementById("myRange2");
const output2 = document.getElementById("demo2");
const slider3 = document.getElementById("myRange3");
const output3 = document.getElementById("demo3");

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

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

output1.innerHTML = slider1.value;

slider1.oninput = function () {
  output1.innerHTML = this.value;
};

output2.innerHTML = slider2.value;

slider2.oninput = function () {
  output2.innerHTML = this.value;
};

output3.innerHTML = slider3.value;

slider3.oninput = function () {
  output3.innerHTML = this.value;
};
