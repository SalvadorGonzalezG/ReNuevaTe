alert("Recuerda que tu contraseña debe contener una letra mayuscula, una minuscula y un número. Deben ser al menos 8 caracteres.");

const correo1 = document.getElementById('correoInicioSesion');
const contraseña1 = document.getElementById('contraseñaInicioSesion');
const boton = document.getElementById('botonInicioSesion');
const regex = /[a-zA-Z0-9._%+-]+@((?:gmail)|(?:outlook))\.[a-z]{2,4}/;
const regexContraseña = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}/


correo1.addEventListener("input", function() {
    console.log('hola')
    if (regex.test(correo1.value.trim()) && regexContraseña.test(contraseña1.value.trim())) {
        boton.disabled = false;
    } else {
        boton.disabled = true;
    }
})

contraseña1.addEventListener("input", function() {
    console.log('hola')
    if (regex.test(correo1.value.trim()) && regexContraseña.test(contraseña1.value.trim())) {
        boton.disabled = false;
    } else {
        boton.disabled = true;
    }
})



document.getElementById('botonInicioSesion').addEventListener('click', function(event){
    event.preventDefault();

    const correo = document.getElementById('correoInicioSesion').value;
    const contraseña = document.getElementById('contraseñaInicioSesion').value;
    
    if(correo === "arturo.ramirez@gmail.com" && contraseña === "Arturo49"){
        // function irAlInicio() {
        //     // Construir la URL con el parámetro del ID
            const url = `/inicio`;
            // Cambiar la URL sin recargar la página
            window.history.pushState({}, "", `/inicio`);
            urlLocationHandler();

        alert("bienvenido iniciaste sesión")

    }else{
        alert("No se pudo iniciar tu correo o pasword es incorrecto");
    }
});