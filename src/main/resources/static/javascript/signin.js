var email = document.querySelector('.email');
var password = document.querySelector('.password');
var signinBoard = document.querySelector('.signin-board');
var signupButton = document.querySelector('.signin-board_signup-button');
var emailLabel = document.querySelector('.email-label');
var passwordLabel = document.querySelector('.password-label');

signupButton.addEventListener('click', function () {
    location.href = "/signup";
});

function setDisplay(input, condition){
    if(condition) {
        input.style.display = "none";
    } else {
        input.style.display = "block";
    }
}

signinBoard.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailCond = (/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(email.value));
    var passwordCond = password.value.length >= 8 && password.value.length <= 20;

    setDisplay(emailLabel, emailCond);
    setDisplay(passwordLabel, passwordCond);

    if(emailCond && passwordCond) {
        signinBoard.submit();
    }
});