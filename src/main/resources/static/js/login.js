document.addEventListener('DOMContentLoaded', function () {
    let signInBtn = document.getElementsByClassName("sign-in-button")[0];
    let signUpBtn = document.getElementsByClassName("sign-up-button")[0];
    let showSignUpBtn = document.getElementsByClassName("show-sign-up-button")[0];
    let showSignInBtn = document.getElementsByClassName("show-sign-in-button")[0];

    let loginInputForm = document.getElementsByClassName("login-input__form")[0];

    let loginInput = document.getElementsByClassName("__login")[0];
    let passInput = document.getElementsByClassName("__password")[0];
    let confirmPassInput = document.getElementsByClassName("__password__confirm")[0];

    signInBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        let isCorrect = true;

        if (!checkInputValid(loginInput)) {
            if (!loginInput.classList.contains("__wrong")) {
                loginInput.classList.add("__wrong");
            }
            isCorrect = false;
        } else {
            if (loginInput.classList.contains("__wrong")) {
                loginInput.classList.remove("__wrong");
            }
        }

        if (!checkInputValid(passInput)) {
            if (!passInput.classList.contains("__wrong")) {
                passInput.classList.add("__wrong");
            }
            isCorrect = false;
        } else {
            if (passInput.classList.contains("__wrong")) {
                passInput.classList.remove("__wrong");
            }
        }

        if (isCorrect) {
            loginInputForm.submit();
        }
    });

    signUpBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        let isCorrect = true;

        if (!checkInputValid(loginInput)) {
            if (!loginInput.classList.contains("__wrong")) {
                loginInput.classList.add("__wrong");
            }
            isCorrect = false;
        } else {
            if (loginInput.classList.contains("__wrong")) {
                loginInput.classList.remove("__wrong");
            }
        }

        if (!checkInputValid(loginInput)) {
            if (!passInput.classList.contains("__wrong")) {
                passInput.classList.add("__wrong");
            }
            isCorrect = false;
        } else {
            if (passInput.classList.contains("__wrong")) {
                passInput.classList.remove("__wrong");
            }
        }

        if (!checkInputValid(confirmPassInput) || confirmPassInput.value !== passInput.value) {
            if (!confirmPassInput.classList.contains("__wrong")) {
                confirmPassInput.classList.add("__wrong");
            }
            isCorrect = false;
        } else {
            if (confirmPassInput.classList.contains("__wrong")) {
                confirmPassInput.classList.remove("__wrong");
            }
        }

        if (isCorrect) {
            loginInput.value = loginInput.value.trim();
            passInput.value = passInput.value.trim();
            confirmPassInput.value = confirmPassInput.value.trim();
            loginInputForm.submit();
        }
    });


    showSignUpBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        signInBtn.style.display = "none";
        showSignUpBtn.style.display = "none";
        signUpBtn.style.display = "inline";
        showSignInBtn.style.display = "inline";
        confirmPassInput.style.display = "block";
        confirmPassInput.removeAttribute("required");
        if (loginInputForm.getAttribute("action") === "/login") {
            loginInputForm.setAttribute("action", "/signup");
        }
    });

    showSignInBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        signInBtn.style.display = "inline";
        showSignUpBtn.style.display = "inline";
        signUpBtn.style.display = "none";
        showSignInBtn.style.display = "none";
        confirmPassInput.style.display = "none";
        confirmPassInput.setAttribute("required", "required");
        if (loginInputForm.getAttribute("action") === "/signup") {
            loginInputForm.setAttribute("action", "/login");
        }
    });

    function checkInputValid(inputField) {
        if (inputField.value.trim() === "" ||
            inputField.value.trim().length > 16 ||
            inputField.value.trim().length < 8 ||
            !(/^[A-Za-z0-9]{8,16}$/.test(inputField.value))) {
            return false;
        } else {
            return true;
        }
    }

});