const confirmPassword = document.getElementById("confirmPassword");
const Password = document.getElementById("Password");
const message = document.getElementById("message");

confirmPassword.addEventListener("input", function () {

    // Password validation
    const password = Password.value;
    const confirmpassword = confirmPassword.value;
   
    if (!confirmpassword) {
        message.textContent = "Password is required.";
        message.style.color = "red";
        confirmPassword.focus();
        return;
    }
    
    // check length of password
    if (confirmpassword.length < 8) {
        message.textContent = "Password must be atleast 8 characters long.";
        message.style.color = "red";
        confirmPassword.focus();
        return;
    }

    // check UPPERCASE characters
    if (!/[A-Z]/.test(confirmpassword)) {
        message.textContent = "Password must be atleast 1 UPPERCASE character.";
        message.style.color = "red";
        confirmPassword.focus();
        return;
    }

    // check LOWERCASE characters 
    if (!/[a-z]/.test(confirmpassword)) {
        message.textContent = "Password must be atleast 1 LOWERCASE character.";
        message.style.color = "red";
        confirmPassword.focus();
        return;
    }

    // check number
    if (!/\d/.test(confirmpassword)) {
        message.textContent = "Password must be atleast 1 digit in it.";
        message.style.color = "red";
        confirmPassword.focus();
        return;
    }

    // check special character
    if (!/[@#$%&*!]/.test(confirmpassword)) {
        message.textContent = "Password must be atleast 1 special character @#$%&*!.";
        message.style.color = "red";
        confirmPassword.focus();
        return;
    }
    else if (password === !confirmpassword) {
        message.textContent = "Password Don't Match";
        message.style.color = "red";
    }
    else{
        message.textContent = "Password Matches & Valid password entered";
        message.style.color = "green";
    }
    console.log("Success!", { Password: password });
});