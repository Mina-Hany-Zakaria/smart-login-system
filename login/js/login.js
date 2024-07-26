//@===== form selection ====>
const logInForm = document.getElementById("logInForm");

//@===== inputs selection ====>
const emailInputLogIn = document.getElementById("emailInputLogIn");
const passwordInputLogIn = document.getElementById("passwordInputLogIn");

//@===== alerts msgs selection ====>
const loginMsg = document.getElementById("loginMsg");

let allUsers = [];
if (localStorage.getItem("allUsersData") !== null) {
  allUsers = JSON.parse(localStorage.getItem("allUsersData"));
}

// console.log(allUsers);

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log("object");
  logInUser();
});

// !========= log in function implementation =====>
function logInUser() {
  let userDate = {
    email: emailInputLogIn.value,
    password: passwordInputLogIn.value,
  };

  console.log(userDate);
  if (checkIfLoggedIm(userDate) == true) {
    loginMsg.classList.replace("d-block", "d-none");
    window.location.href = "../../home.html";
  } else {
    loginMsg.classList.replace("d-none", "d-block");
  }
}

// !========= check if logged im function implementation =====>
function checkIfLoggedIm(userUserDate) {
  for (const loggedUser of allUsers) {
    if (
      loggedUser.email == userUserDate.email &&
      loggedUser.password == userUserDate.password
    ) {
      console.log("user logged in");
      localStorage.setItem("allUsersData", loggedUser.name);
      return true;
    }
  }
}
