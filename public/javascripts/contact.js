const form = document.getElementById("contactForm");
const button = document.getElementById("contactButton");
const username = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    username.value.length > 0 &&
    ValidateEmail(email.value) &&
    message.value.length > 0
  ) {
    button.textContent = "Αποστολή ...";
    button.classList.add("sendingBtn");
    let details = {
      name: username.value,
      email: email.value,
      message: message.value,
    };
    try {
      let response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      if (response.status === 200) {
        button.classList.remove("sendingBtn");
        document.getElementById("hiddenSuccess").classList.remove("hidden");
        button.textContent = "Αποστολή";
      } else {
        button.classList.remove("sendingBtn");
        document.getElementById("hiddenError").classList.remove("hidden");
        button.classList.add("errorSend");
        button.textContent = "Αποστολή";
      }
    } catch {
      button.classList.remove("sendingBtn");
      document.getElementById("hiddenError").classList.remove("hidden");
      button.classList.add("errorSend");
      button.textContent = "Αποστολή";
    }
  }
});

function ValidateEmail(input) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) return true;
  else return false;
}
