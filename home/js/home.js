const userName = localStorage.getItem("allUsersData");
console.log(userName);

document.getElementById("msgWelcome").innerHTML = userName;
