function validateForm() {
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var password = document.getElementById('password').value;
    var accept = document.getElementById('accept').checked;

    var nameError = document.getElementById('nameError');
    var lastNameError = document.getElementById('lastNameError');
    var passwordError = document.getElementById('passwordError');
    var acceptError = document.getElementById('acceptError');

    nameError.innerHTML = '';
    lastNameError.innerHTML = '';
    passwordError.innerHTML = '';
    acceptError.innerHTML = '';

    if (name === '') {
        nameError.innerHTML = 'Please enter your first name';
        return false;
    }

    if (lastName === '') {
        lastNameError.innerHTML = 'Please enter your last name';
        return false;
    }

    if (password === '') {
        passwordError.innerHTML = 'Please enter a password';
        return false;
    }

    if (!accept) {
        acceptError.innerHTML = 'Please accept the terms of use';
        return false;
    }

    return true;
}