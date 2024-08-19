document.querySelector('.botonCrearUsuariosSubmit').addEventListener('click', function(event){
    event.preventDefault(); // prevenimos el comportamiento por defecto del fomulario

    // obtenemos los valores de los inputs
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;
    const confirmaContraseña = document.getElementById('confirmaContraseña').value;

    //validamos las contraseñas si las contraseñas coinciden
    if(contraseña !== confirmaContraseña){
        alert('Las contraseñas no coinciden')
        // Si las contraseñas se para la ejecución del programa y no se crea el usuario.
        return;
    }

    //Crear un nuevo div para el usuario si las contraseñas coinciden
    const nuevoUsuarioDiv = document.createElement('div');
    nuevoUsuarioDiv.classList.add('datos')
    nuevoUsuarioDiv.innerHTML = `
        <div>${nombre}</div>
        <div>${correo}</div>
        <div>${contraseña}</div>
    `;

    // Agregar el nuevo usuario a contenedorDatos
    document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioDiv);

    // Limpiamos el fomulario una vez que se creo el usuario
    document.querySelector('.contenedorFormularioLabel').reset();

})