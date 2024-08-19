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
    
    const buttonCar = document.createElement('button');
    buttonCar.classList.add('detail-button');
    buttonCar.innerText = "Agregar al Carrito";
    buttonCar.onclick = function () {
      alert('Botón "Agregar al Carrito" fue clickeado');
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
  