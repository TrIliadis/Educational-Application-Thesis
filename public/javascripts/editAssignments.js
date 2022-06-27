let counter = document.querySelectorAll(".button").length;


for (let i = 0; i < counter; i++) {
  let modal = document.getElementById(`myModal${i}`);
  let btn = document.getElementById(`modalBtn${i}`);
  let span = document.getElementsByClassName("close");
  let switches = document.getElementById(`switch${i}`);

  switches.addEventListener("click", async (e) => {
    const id = e.target.id.match(/\d+/)[0] + e.target.checked;
    fetch(`/toggleVisibility/${id}`, {
      method: "POST",
      mode: "no-cors",
    });
  });

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span[i].onclick = function () {
    modal.style.display = "none";
  };
}


