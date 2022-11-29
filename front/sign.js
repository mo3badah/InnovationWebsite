
// password validation
let password = document.getElementById('password'),
    confirmPassword = document.getElementById('confirm_password'),
    message = document.getElementById('message');
password.addEventListener('keyup', check)
confirmPassword.addEventListener('keyup', check)
function check(){
    if (password.value == confirmPassword.value) {
        message.style.fontSize = "15px";
        message.style.color = 'green';
        message.innerHTML = 'matching';
    } else {
        message.style.fontSize = "15px";
        message.style.color = 'red';
        message.innerHTML = 'not matching';
    }
}
