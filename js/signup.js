//@===== form selection ====>
const signUpForm = document.getElementById("signUpForm");

//@===== inputs selection ====>
const userNameInput = document.getElementById("userNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const conformPasswordInput = document.getElementById("conformPasswordInput");

let allUsers = [];

//@===== alerts msgs selection ====>
const userNameInputAlertValidation = document.getElementById(
  "userNameInputAlertValidation"
);
const emailInputAlertValidation = document.getElementById(
  "emailInputAlertValidation"
);
const passwordInputAlertValidation = document.getElementById(
  "passwordInputAlertValidation"
);
const conformPasswordInputAlertValidation = document.getElementById(
  "conformPasswordInputAlertValidation"
);
const conformPasswordInputAlertValidationConformation = document.getElementById(
  "conformPasswordInputAlertValidationConformation"
);
const userAlreadyExists = document.getElementById("userAlreadyExists");
const sussesMsg = document.getElementById("sussesMsg");

if (localStorage.getItem("allUsersData") !== null) {
  allUsers = JSON.parse(localStorage.getItem("allUsersData"));
}

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkWeatherAllInputsAreValid()) {
    addUser();
  }
});

// !========= add user function implementation =====>
function addUser() {
  let newUser = {
    name: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    conformPass: conformPasswordInput.value,
  };

  if (checkIfAlreadyExists(newUser) == true) {
    userAlreadyExists.classList.replace("d-none", "d-block");
  } else {
    userAlreadyExists.classList.replace("d-block", "d-none");
    sussesMsg.classList.replace("d-none", "d-block");
    window.location.href = "../login.html";
    allUsers.push(newUser);
    console.log(allUsers);
    localStorage.setItem("allUsersData", JSON.stringify(allUsers));
  }
}

// !========= check if user exists =====>
function checkIfAlreadyExists(newUserData) {
  for (const user of allUsers) {
    if (user.email == newUserData.email) {
      console.log("they Already Exists");
      return true;
    }
  }
}

// !========= handle user inputs =====>
function validateInput(regexCode, inputValue, alertMsg) {
  let pattern = regexCode;

  if (pattern.test(inputValue.value)) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

// !========= check weather all inputs are valid =====>
function checkWeatherAllInputsAreValid() {
  if (
    validateInput(
      /^[A-Za-z]{3,29}$/,
      userNameInput,
      userNameInputAlertValidation
    ) == true &&
    validateInput(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      emailInput,
      emailInputAlertValidation
    ) == true &&
    validateInput(
      /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      passwordInput,
      passwordInputAlertValidation
    ) == true &&
    validateInput(
      /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      conformPasswordInput,
      conformPasswordInputAlertValidation
    ) == true
  ) {
    checkPasswordMatched();
    return true;
  } else {
    return false;
  }
}

// !========= check weather passwords are matched =====>
function checkPasswordMatched() {
  if (
    passwordInput.value.toLowerCase() ===
    conformPasswordInput.value.toLowerCase()
  ) {
    conformPasswordInputAlertValidationConformation.classList.replace(
      "d-block",
      "d-none"
    );
  } else {
    conformPasswordInputAlertValidationConformation.classList.replace(
      "d-none",
      "d-block"
    );
  }
}

// user name input --> /^[A-Za-z][A-Za-z0-9_]{7,29}$/
// email input     --> /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
// password input  --> /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
