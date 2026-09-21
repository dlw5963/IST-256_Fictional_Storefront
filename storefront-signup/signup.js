const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirm-password");
const statusMessage = document.getElementById("signup-status");

function validateFields() {
  username.setCustomValidity(username.value.trim() ? "" : "Please enter a username.");
  confirmation.setCustomValidity(confirmation.value && confirmation.value !== password.value
    ? "Passwords must match." : "");
}

form.addEventListener("input", function () {
  statusMessage.textContent = "";
  validateFields();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateFields();
  if (!form.reportValidity()) return;
  form.reset();
  statusMessage.textContent = "Your entries are valid. This form does not create an account.";
});

form.addEventListener("reset", function () {
  username.setCustomValidity("");
  confirmation.setCustomValidity("");
  statusMessage.textContent = "";
});
