var email = document.querySelector('.email');
var password = document.querySelector('.password');
var username = document.querySelector('.username');
var signupBoard = document.querySelector('.signup-board');
var emailLabel = document.querySelector('.email-label');
var passwordLabel = document.querySelector('.password-label');
var usernameLabel = document.querySelector('.username-label');

function setDisplay(input, condition){
    if(condition) {
        input.style.display = "none";
    } else {
        input.style.display = "block";
    }
}

signupBoard.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailCond = (/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(email.value));
    var passwordCond = password.value.length >= 8 && password.value.length <= 20;
    var usernameCond = username.value.length >= 6 && username.value.length <= 20;

    setDisplay(emailLabel, emailCond);
    setDisplay(passwordLabel, passwordCond);
    setDisplay(usernameLabel, usernameCond);

    if(emailCond && passwordCond && usernameCond) {
        signupBoard.submit();
    }
});