const form = document.getElementById("signup-form");
const fields = Array.from(form.querySelectorAll("input"));
const password = document.getElementById("password");
const confirmation = document.getElementById("confirm-password");
const statusMessage = document.getElementById("signup-status");

function validate(field) {
  let message = "";

  if (field.value.trim() === "") {
    message = "Field is required";
  } else if (field.type === "email" &&
      (field.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))) {
    message = "Enter a valid email, such as joe@test.com";
  } else if (field === confirmation && field.value !== password.value) {
    message = "Passwords must match";
  }

  field.classList.toggle("is-invalid", message !== "");
  field.setAttribute("aria-invalid", message ? "true" : "false");
  field.setCustomValidity(message);
  field.placeholder = message || field.dataset.placeholder;
  document.getElementById(field.id + "-error").textContent = message;
  return message === "";
}

fields.forEach(function (field) {
  field.dataset.placeholder = field.placeholder;

  field.addEventListener("blur", function () {
    field.dataset.checked = "true";
    validate(field);
  });

  field.addEventListener("input", function () {
    statusMessage.textContent = "";
    if (field.dataset.checked === "true") validate(field);
    if (field === password && confirmation.dataset.checked === "true") {
      validate(confirmation);
    }
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let firstInvalid = null;

  fields.forEach(function (field) {
    field.dataset.checked = "true";
    if (!validate(field) && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    statusMessage.textContent = "Please correct the highlighted fields.";
    firstInvalid.focus();
    return;
  }

  statusMessage.textContent = "All fields are valid. This form does not create an account.";
});

form.addEventListener("reset", function () {
  fields.forEach(function (field) {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
    field.setCustomValidity("");
    field.placeholder = field.dataset.placeholder;
    delete field.dataset.checked;
    document.getElementById(field.id + "-error").textContent = "";
  });
  statusMessage.textContent = "";
});
