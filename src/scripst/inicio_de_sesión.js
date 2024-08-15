document.getElementById('botonInicioSesion').addEventListener('click', function(event){
    event.preventDefault();

    const correo = document.getElementById('correoInicioSesion').value;
    const contraseña = document.getElementById('contraseñaInicioSesion').value;
    
    if(correo === "arturo.ramirez@gmail.com" && contraseña === "12345"){
        alert("bienvenido iniciaste sesión")
    }else{
        alert("No se pudo iniciar tu correo o pasword es incorrecto");
    }
})