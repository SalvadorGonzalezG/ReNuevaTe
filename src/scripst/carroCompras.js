
const carrito = document.getElementById("carrito"),
      contenedorCarrito = document.querySelector('.buy-card .lista_de_cursos'),
      vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners();

function registrarEventsListeners() {
    // El evento "agregarCurso" se maneja directamente en el botón del detalle del producto
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

function agregarCurso(e) {
    const cursoSeleccionado = e.target.closest('.right'); 
    leerInfo(cursoSeleccionado);
}

function leerInfo(curso) {
    const infoCurso = {
        imagen: curso.parentElement.querySelector('.main_image img').src, // **3. Selecciona la imagen principal del producto**
        titulo: curso.querySelector('h3').textContent, // **4. Selecciona el título del producto**
        precio: curso.querySelector('h4').textContent, // **5. Selecciona el precio del producto**
        id: curso.querySelector('button').getAttribute('data-id'), // **6. Obtén el id del producto del botón**
        cantidad: 1
    };

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]; // **7. Agrega el producto al carrito si no existe**
    }

    carritoHTML();
}

function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach(curso => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${curso.imagen}"></img>
            <p>${curso.titulo}</p>
            <p>${curso.precio}</p>
            <p>${curso.cantidad}</p>
            <p><span class="borrar-curso" data-id="${curso.id}">X</span></p>
        `;
        contenedorCarrito.appendChild(fila);
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}