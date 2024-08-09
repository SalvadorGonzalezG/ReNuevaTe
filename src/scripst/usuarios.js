document.addEventListener('DOMContentLoaded', () => {
    fetch('../usuarios/usuarios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const contenedorDatos = document.querySelector('.contenedorDatos'); // Selector corregido
            contenedorDatos.innerHTML = `
                <div class='datos'>Id</div>
                <div class='datos'>Nombre de usuario</div>
                <div class='datos'>Nombre</div>
                <div class='datos'>Correo</div>
                <div class='datos'>Roll</div>
                <div class='datos'>Publicaciones</div>
            `;
            // Iteramos sobre cada usuario en el JSON
            data.forEach(usuario => { // Método corregido
                const idDiv = document.createElement('div');
                idDiv.classList.add('datos');
                idDiv.textContent = usuario.id;

                const nombreUsuarioDiv = document.createElement('div');
                nombreUsuarioDiv.classList.add('datos');
                nombreUsuarioDiv.textContent = usuario.nombre_de_usuario;

                const nombreDiv = document.createElement('div');
                nombreDiv.classList.add('datos');
                nombreDiv.textContent = usuario.nombre;

                const correoDiv = document.createElement('div');
                correoDiv.classList.add('datos');
                correoDiv.textContent = usuario.correo;

                const rollDiv = document.createElement('div'); // Método corregido
                rollDiv.classList.add('datos');
                rollDiv.textContent = usuario.roll;

                const publicacionesDiv = document.createElement('div')
                publicacionesDiv.classList.add('datos');
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
});

