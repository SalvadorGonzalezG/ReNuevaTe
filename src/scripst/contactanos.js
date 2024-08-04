
const button = document.getElementById('button');
button.disabled = true;
/*const emailRegex = /^[a-zA-Z0-9._*-]+@gmail.com$/;
*/
const emailRegex = /^[a-zA-Z0-9._*-]+@(gmail.com|hotmail.com)$/;
const emailInput = document.getElementById('emailInput');

emailInput.addEventListener('input', (event) => {
    const email = event.target.value;

    // Sentencia condicional para evaluar el valor del input, si se cumple se habilita el botón, en caso contrario, sigue deshabilitado
    if (emailRegex.test(email)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
});