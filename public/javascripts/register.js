const form = document.getElementById("registerForm");
const button = document.getElementById("registerButton");
const username = document.getElementById("name");
const email = document.getElementById("email");
const surname = document.getElementById("surname");
const password = document.getElementById("password");
const validatePassword = document.getElementById("validatePassword");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      username.value.length > 0 &&
      email.value.length > 0 &&
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
          button.textContent = `Το μήνυμα στάλθηκε επιτυχώς`;
        } else {
          button.classList.remove("sendingBtn");
          button.classList.add("errorSend");
          button.textContent = `Υπήρξε κάποιο πρόβλημα, παρακαλώ προσπαθήστε αργότερα`;
        }
      } catch {
        button.classList.remove("sendingBtn");
        button.classList.add("errorSend");
        button.textContent = `Υπήρξε κάποιο πρόβλημα, παρακαλώ προσπαθήστε αργότερα`;
      }
    }
  });