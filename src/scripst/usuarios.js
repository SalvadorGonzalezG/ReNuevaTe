(function() {
    let idContador = 1;
    let Roll = "usuario";
    let publicacion = "0";
// document.addEventListener('DOMContentLoaded', () => {
    fetch('/ReNuevaTe/data/usuarios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const contenedorDatos = document.querySelector('.contenedorDatos'); // Selector corregido
            contenedorDatos.innerHTML = `
                <div class='datosId'>Id</div>
                <div class='datosNombreU'>Nombre de usuario</div>
                <div class='datosNombre'>Nombre</div>
                <div class='datosCorreo'>Correo</div>
                <div class='datosRoll'>Roll</div>
                <div class='datosPublicaciones'>Publicaciones</div>
            `;
            // Iteramos sobre cada usuario en el JSON
            data.forEach(usuario => { // Método corregido
                const idDiv = document.createElement('div');
                idDiv.classList.add('datosId');
                idDiv.textContent = usuario.id;

                const nombreUsuarioDiv = document.createElement('div');
                nombreUsuarioDiv.classList.add('datosNombreU');
                nombreUsuarioDiv.textContent = usuario.nombre_de_usuario;

                const nombreDiv = document.createElement('div');
                nombreDiv.classList.add('datosNombre');
                nombreDiv.textContent = usuario.nombre;

                const correoDiv = document.createElement('div');
                correoDiv.classList.add('datosCorreo');
                correoDiv.textContent = usuario.correo;

                const rollDiv = document.createElement('div'); // Método corregido
                rollDiv.classList.add('datosRoll');
                rollDiv.textContent = usuario.roll;

                const publicacionesDiv = document.createElement('div')
                publicacionesDiv.classList.add('datosPublicaciones');
                publicacionesDiv.textContent = usuario.publicaciones;

                // Agregamos los elementos al contenedor de datos
                contenedorDatos.appendChild(idDiv);
                contenedorDatos.appendChild(nombreUsuarioDiv);
                contenedorDatos.appendChild(nombreDiv);
                contenedorDatos.appendChild(correoDiv);
                contenedorDatos.appendChild(rollDiv);
                contenedorDatos.appendChild(publicacionesDiv)
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
// });

// Manejamos la acción del boton crear usuario
document.querySelector('.botonCrearUsuariosSubmit').addEventListener('click', function(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario.

    // Obtener los valores de los inputs
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;
    const confirmaContraseña = document.getElementById('confirmaContraseña').value;

    // Validamos que las contraseñas coincidan
    if (contraseña !== confirmaContraseña) {
        alert('Las contraseñas no coinciden');
        // Detenemos la ejecución si las contraseñas no coinciden.
        return;
    }
    const nuevoId = idContador++;
    const usuarioRoll = Roll;
    const nuevaPublicacion = publicacion;

    const nuevoUsuarioContainer = document.createElement('div');
    nuevoUsuarioContainer.classList.add('usuarioContainer');
    // Crear un nuevo div para el usuario
    const nuevoUsuarioDivId = document.createElement('div');
    nuevoUsuarioDivId.classList.add('datosId');
    nuevoUsuarioDivId.innerHTML = `
        <div>
        <input type="checkbox" id="checkbox_${nuevoId}">
        ${nuevoId}
        </div>
    `;
    let nuevoUsuarioDivNombreU = document.createElement('div');
    nuevoUsuarioDivNombreU.classList.add('datosNombreU')
    nuevoUsuarioDivNombreU.innerHTML = `
        <div>${nombre + nuevoId}<div>
    `
    const nuevoUsuarioNombre = document.createElement('div');
    nuevoUsuarioNombre.classList.add('datosNombre');
    nuevoUsuarioNombre.innerHTML = `
        <div>${nombre}<div>
    `
    const nuevoUsuarioCorreo = document.createElement('div');
    nuevoUsuarioCorreo.classList.add('datosCorreo');
    nuevoUsuarioCorreo.innerHTML = `
        <div>${correo}</div>
    `
    const nuevoUsuarioRoll = document.createElement('div')
    nuevoUsuarioRoll.classList.add('datosRoll')
    nuevoUsuarioRoll.innerHTML = `
        <div>${usuarioRoll}</div>
    `
    const nuevoUsuarioPublicacion = document.createElement('div');
    nuevoUsuarioPublicacion.classList.add('datosPublicaciones');
    nuevoUsuarioPublicacion.innerHTML = `
    <div>${nuevaPublicacion}
    <button class="botonEliminarUsuario" style="display:none;">Eliminar</button>
    <button class="botonGuardarUsuario" style="display:none;">Guardar</button>
    </div>
    `
    // Agregamos el usuario al contenedorDatos
    document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioDivId);
    document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioDivNombreU)
    document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioNombre);
    document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioCorreo);
    document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioRoll);
    document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioPublicacion);
    
    //Añadir el usuario al contenedor principal de datos.
    //document.querySelector('.contenedorDatos').appendChild(nuevoUsuarioContainer);

    // Añadir un evento al checkbox para mostrar/ocultar los botones.
    const checkbox = nuevoUsuarioDivId.querySelector(`#checkbox_${nuevoId}`);
        checkbox.addEventListener('change', function(){
            const botonElimar = nuevoUsuarioPublicacion.querySelector('.botonEliminarUsuario');
            const botonGuardar = nuevoUsuarioPublicacion.querySelector('.botonGuardarUsuario')
            // Si el check esta marcado muestra los botones de lo contrario ocultalos
            if (checkbox.checked){
                botonElimar.style.display = 'inline-block';
                botonGuardar.style.display = 'inline-block';
            } else {
                botonElimar.style.display = 'none';
                botonGuardar.style.display = 'none';
            }
        })
    //Añadir el evento de eliminar al botol elimnar
    const botonEliminar = nuevoUsuarioPublicacion.querySelector('.botonEliminarUsuario');
        botonEliminar.addEventListener('click', function(){
            nuevoUsuarioDivId.remove();
            nuevoUsuarioDivNombreU.remove();
            nuevoUsuarioNombre.remove();
            nuevoUsuarioCorreo.remove();
            nuevoUsuarioRoll.remove();
            nuevoUsuarioPublicacion.remove();

        });

        // Añadir el evento de guardar al botón guardar dentro de la misma función
    const botonGuardar = nuevoUsuarioPublicacion.querySelector('.botonGuardarUsuario');
    botonGuardar.addEventListener('click', function() {
        const nuevoNombre = document.getElementById('nombre').value;
        const nuevoCorreo = document.getElementById('correo').value;
        const nuevaContraseña = document.getElementById('contraseña').value;
        const confirmaNuevaContraseña = document.getElementById('confirmaContraseña')

        if (nuevoNombre && nuevoCorreo) {
            //actualización del UsuarioDivNombreU
            nuevoUsuarioDivNombreU.textContent = nuevoNombre + nuevoId;
            nuevoUsuarioNombre.textContent = nuevoNombre;
            nuevoUsuarioCorreo.textContent = nuevoCorreo;

            if (nuevaContraseña === confirmaNuevaContraseña) {
                console.log(`Contraseña actualizada para el usuario con ID: ${nuevoId}`);
            }

            // Limpiar el formulario después de guardar
            document.querySelector('.contenedorFormularioLabel').reset();
        } else {
            alert('Por favor, completa todos los campos para actualizar');
        }
    });


    // Limpiamos el formulario una vez que se creó el usuario
    document.querySelector('.contenedorFormularioLabel').reset();
});

    // Event Listenner para el boton "Editar Usuario"
    // Manejamos la acción del botón "Editar Usuario"
document.querySelector('.botonEditarUsuario').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.contenedorDatos .datosId input[type="checkbox"]');
    let usuarioSeleccionado = null;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const contenedorUsuario = checkbox.closest('.contenedorDatos');
            const nombreDiv = contenedorUsuario.querySelector('.datosNombre');
            const correoDiv = contenedorUsuario.querySelector('.datosCorreo');

            // Rellenar el formulario con los datos del usuario
            document.getElementById('nombre').value = nombreDiv.textContent.trim();
            document.getElementById('correo').value = correoDiv.textContent.trim();

            usuarioSeleccionado = contenedorUsuario;
        }
    });

    if (!usuarioSeleccionado) {
        alert('Seleccione un usuario para editar.');
    }
});
})();