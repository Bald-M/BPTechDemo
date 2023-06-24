var signUpForm = document.querySelector('#signup');
var signInForm = document.querySelector('#signin');

// Current date
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1;
var day = currentDate.getDay();

function signUpFormValid() {
    // Selected Date
    var selectedYear = signUpForm['dob'].value.split('-')[0];
    var selectedMonth = signUpForm['dob'].value.split('-')[1];
    var selectedDay = signUpForm['dob'].value.split('-')[2];

    if (signUpForm['password'].value !== signUpForm['confirmed-password'].value) {
        alert("Password does not match");

    }
    else if (Number(selectedYear) >= year && Number(selectedMonth) >= month && Number(selectedDay) > day) {
        alert("Invalid birthdate");

    }
}

function signInFormValid() {
    if (signInForm['password'].value === null || signInForm['password'].value === '') {
        alert("The password can't be empty");
        return false;
    }
}


