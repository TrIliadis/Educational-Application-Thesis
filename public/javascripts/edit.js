const form = document.getElementById("editForm");
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
    town.value.length > 0 &&
    address.value.length > 0
  ) {
    let details = {
      name: username.value,
      surname: surname.value,
      email: email.value,
      town: town.value,
      address: address.value,
    };
    await fetch("/edit", {
      method: "PUT",
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
