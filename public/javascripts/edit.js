const email = document.getElementById("email");
const imgInput = document.getElementById("imgInput");
const profileImg = document.getElementById("profileImg");
let counter = document.querySelectorAll(".slider").length;
const container = document.getElementById("inputContainer");
const btnContainer = document.getElementById("btnContainer");

imgInput.onchange = () => {
  const [file] = imgInput.files;
  if (file) {
    profileImg.src = URL.createObjectURL(file);
  }
};

const addSkill = () => {
  counter++;
  const p = document.createElement("p");
  p.classList.add("white", "mt-3");
  p.id = `p${counter - 1}`;
  container.append(p);

  const nameInput = document.createElement("input");
  nameInput.placeholder = "Τίτλος...";
  nameInput.classList.add("mt-5", "inputSkills");
  nameInput.name = `skills[${counter - 1}]`;
  p.append(nameInput);
  const span = document.createElement("span");
  span.classList.add("sliderRange");
  span.id = `demo${counter - 1}`;
  span.innerText = 50;
  p.append(span);
  const div = document.createElement("div");
  div.classList.add("slidercontainer");
  div.id = `slider${counter - 1}`;
  container.append(div);
  const ratingInput = document.createElement("input");
  ratingInput.classList.add("slider");
  ratingInput.name = `skills[${counter - 1}]`;
  ratingInput.type = "range";
  ratingInput.min = "1";
  ratingInput.max = "100";
  ratingInput.value = "50";
  ratingInput.id = `myRange${counter - 1}`;
  div.append(ratingInput);

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("mt-4", "me-3", "btn", "btn-danger");
  cancelBtn.innerText = "Άκυρο";
  cancelBtn.type = "button";
  cancelBtn.onclick = () => {
    const removeP = document.getElementById(`p${counter - 1}`);
    const removeSlider = document.getElementById(`slider${counter - 1}`);
    container.removeChild(removeP);
    container.removeChild(removeSlider);
    btnContainer.removeChild(cancelBtn);
    counter--;
  };
  btnContainer.prepend(cancelBtn);
};

container.addEventListener("input", function (e) {
  for (let i = 0; i < counter; i++) {
    if (e.target.classList.contains("slider")) {
      const id = e.target.id.match(/\d+/)[0];
      const span = document.getElementById(`demo${id}`);
      span.innerText = e.target.value;
    }
  }
});

email.onchange = () => {
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
