function createDetail(product) {
  const containerDetail = document.getElementById('detail-container');
  containerDetail.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

  // Contenedor de la card
  const details = document.createElement('div');
  details.classList.add('container-detail');
  details.classList.add('flex-detail');

  // Contenedor de imagenes izquierdas
  const left = document.createElement('div');
  left.classList.add('left');

  // Contenedor imagen principal
  const mainImage = document.createElement('div');
  mainImage.classList.add('main_image');
  const primeraImagen = Object.values(product.pictures)[0];
  mainImage.innerHTML = `<img id="main-img" width="550px" height="550px"  src="${primeraImagen}" class="slide">`;

  const pictureKeys = Object.keys(product.pictures);
  const option = document.createElement('div');
  option.classList.add('option');
  option.classList.add('flex');
  pictureKeys.forEach(key => {
    console.log(`Key: ${key}, URL: ${product.pictures[key]}`);
    // Crea un elemento img
    const imgElement = document.createElement('img');
    // Asigna el src al valor correspondiente en el objeto
    imgElement.src = product.pictures[key];
    // Opcional: Establece atributos de tamaño o clase si lo deseas
    imgElement.width = 150; // Ancho de 150px
    imgElement.height = 150; // Alto de 150px
    // Agrega la imagen al contenedor galeria
    imgElement.onclick = function () {
      const imagen = document.getElementById('main-img');
      imagen.src = product.pictures[key];
    };

    option.appendChild(imgElement);
  });

  //Contenedor derecho
  const right = document.createElement('div');
  right.classList.add('right');
  right.innerHTML = `<h3>${product.name}</h3>
                          <h4>${product.price}</h4>
                          <p>${product.detalle}</p>
                          <h5>Color</h5>`;

  //Contenedor color
  const color = document.createElement('div');
  color.classList.add('color');
  color.classList.add('flex1');
  color.innerHTML = `<span style="background-color: ${product.color}";></span>`;

  //Agregar botones detail-button

  // const buttonCar = document.createElement('button');
  // buttonCar.classList.add('detail-button');
  // buttonCar.innerText = "Agregar al Carrito";
  // buttonCar.onclick = function () {
  //   alert('Botón "Agregar al Carrito" fue clickeado');
  // };

  // Botón "Agregar al Carrito"
  const buttonCar = document.createElement('button');
  buttonCar.classList.add('detail-button', 'agregar-carrito');
  buttonCar.setAttribute('data-id', product.id); // **1. Asocia el id del producto al botón usando data-id**
  buttonCar.innerText = "Agregar al Carrito";

  buttonCar.onclick = function () {
    agregarCurso({ target: buttonCar }); // **2. Al hacer clic, llama a agregarCurso pasándole el botón clickeado**
    abrirModal(); // Abre el modal al agregar al carrito
  };



  const buttonShop = document.createElement('button');
  buttonShop.classList.add('detail-button');
  buttonShop.innerText = "Comprar ahora";
  buttonShop.onclick = function () {
    alert('Botón "Comprar ahora" fue clickeado');
  };

  left.appendChild(mainImage);
  left.appendChild(option);
  right.appendChild(color);
  right.appendChild(buttonCar);
  right.appendChild(buttonShop)
  details.appendChild(left);
  details.appendChild(right);
  containerDetail.appendChild(details);
  // Crear y agregar el modal al documento
  crearModal();
}
function crearModal() {
  // Crear el div para la ventana modal
  const modal = document.createElement('div');
  modal.id = 'ventanaModal';
  modal.className = 'modal';
  modal.style.display = 'none';  // Ocultar el modal por defecto

  // Crear el contenido del modal
  const modalContent = document.createElement('div');
  modalContent.className = 'contenido-modal';

  // Crear el span para cerrar el modal
  const closeSpan = document.createElement('span');
  closeSpan.className = 'close'; //cerrar
  closeSpan.innerHTML = '&times;';
  modalContent.appendChild(closeSpan);

  // Crear el título del modal
  // const modalTitle = document.createElement('h2');
  // // Crear la imagen
  // const iconoExito = document.createElement('img');
  // iconoExito.src = '/ReNuevaTe/public/imagenes/success.svg'; // Cambia esta ruta por la correcta
  // iconoExito.className = 'icono-exito'; // Asigna la clase CSS

  // // Añadir la imagen y el texto al título
  // modalTitle.appendChild(iconoExito);
  // // modalTitle.textContent = 'Se Agregó Con Éxito';
  // modalTitle.appendChild(document.createTextNode('Se Agregó Con Éxito'));

// Crear el título del modal
const modalTitle = document.createElement('h2');
modalTitle.classList.add('title-modal');

// Crear un nodo de texto para "Se Agregó Con Éxito"
const textNode = document.createTextNode('Se Agregó Con Éxito');

// Crear la imagen y añadirla al título
const successImage = document.createElement('img');
successImage.src = '/ReNuevaTe/public/imagenes/success.svg'; // Reemplaza con la ruta correcta
successImage.alt = 'Éxito';
successImage.classList.add('success-image');

// Añadir el texto y luego la imagen al título
modalTitle.appendChild(textNode);
modalTitle.appendChild(successImage);

// Añadir el título al contenido del modal
modalContent.appendChild(modalTitle);


  modalContent.appendChild(modalTitle);

  // Crear el párrafo dentro del modal
  const modalText = document.createElement('p');
  modalText.textContent = 'El producto se agregó al carrito';
  modalContent.appendChild(modalText);

  // Añadir el contenido del modal a la ventana modal
  modal.appendChild(modalContent);

  // Añadir la ventana modal al cuerpo del documento
  document.body.appendChild(modal);

  // Función para abrir el modal
  window.abrirModal = function () {
    modal.style.display = 'block';

    setTimeout(function () {
      modal.style.display = 'none';
    }, 2000); // **4000 milisegundos = 4 segundos**
  };
  // Función para cerrar el modal manualmente cuando se presiona la "X"
  closeSpan.onclick = function () {
    modal.style.display = 'none';
  };

  // // Función para cerrar el modal
  // closeSpan.onclick = function () {
  //   modal.style.display = 'none';
  // };

  // Cerrar el modal si se hace clic fuera de él
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

//Capturamos el id de la URL
function getProductIdFromUrl() {
  // Obtener la ruta completa de la URL
  const path = window.location.pathname;

  // Usar una expresión regular para extraer el ID de la ruta
  const idMatch = path.match(/\/detail\/(\d+)/);

  // Devolver el ID si existe, o null si no se encuentra
  return idMatch ? idMatch[1] : null;
}

fetch('/ReNuevaTe/data/productDetail.json')
  .then(response => response.json())
  .then(data => {
    const productId = getProductIdFromUrl();
    const product = data.find(p => p.id === productId);

    if (product) {
      createDetail(product);
    } else {
      console.error('Producto no encontrado');
    }
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
