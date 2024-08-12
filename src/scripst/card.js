// Función para crear tarjetas
function createCards(products) {
    const container = document.getElementById('card-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    products.forEach(product => {
        // Crear elementos de la tarjeta
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = 'demo';
        card.onclick = () => getDetailProduct(product.id);

        const logoCart = document.createElement('div');
        logoCart.classList.add('logo-cart');
        logoCart.innerHTML = '<img class="i" width="25px" height="25px" src="/ReNuevaTe/public/imagenes/compras.png" alt="logo">';

        const category = document.createElement('div');
        category.classList.add('category');
        category.innerHTML = `<img src="${product.image}" alt="">`;

        const shoeDetails = document.createElement('div');
        shoeDetails.classList.add('shoe-details');
        shoeDetails.innerHTML = `<span class="shoe_name">${product.marca}</span>`;

        const colorPrice = document.createElement('div');
        colorPrice.classList.add('color-price');

        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.innerHTML = `<span class="color">Color:</span>
                                  <div class="circles">
                                  <span class="circle" style="background-color: ${product.color};"></span>
                                  </div>`;

        const price = document.createElement('div');
        price.classList.add('price');
        price.innerHTML = `<span class="price_num">${product.precio}</span>`;

        colorPrice.appendChild(colorOption);
        colorPrice.appendChild(price);
        // Agregar elementos a la tarjeta
        card.appendChild(logoCart);
        // card.appendChild(cardImage);
        card.appendChild(category);
        card.appendChild(shoeDetails);
        card.appendChild(colorPrice);
        // Adjuntar tarjeta al contenedor
        container.appendChild(card);
    });
}

function getDetailProduct(idProducto) {
    // Construir la URL con el parámetro del ID
    const url = `/detail/${idProducto}`;
    console.log(idProducto);

    // Cambiar la URL sin recargar la página
    window.history.pushState({}, "", url);

    // Llamar a la función para manejar la nueva URL
    urlLocationHandler();
}

// Función para llenar los filtros
function populateFilters(products) {
    const brandFilter = document.getElementById('brand-filter');
    const colorFilter = document.getElementById('color-filter');

    const brands = new Set();
    const colors = new Set();

    products.forEach(product => {
        brands.add(product.marca);
        colors.add(product.color);
    });

    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });

    colors.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.innerHTML = `<div class="circle" style="background-color: ${color};"></div>${color}`;
        colorFilter.appendChild(option);
    });
}

// Función para filtrar productos
function filterProducts(products) {
    const priceFilter = document.getElementById('price-filter').value;
    const brandFilter = document.getElementById('brand-filter').value;
    const colorFilter = document.getElementById('color-filter').value;

    let filteredProducts = products;

    // Filtrar por marca
    if (brandFilter) {
        filteredProducts = filteredProducts.filter(product => product.marca === brandFilter);
    }

    // Filtrar por precio
    if (priceFilter) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.precio.replace(/[^0-9.]/g, '');
            const priceNumber = parseFloat(price);
            if (isNaN(priceNumber)) return false;

            switch (priceFilter) {
                case 'low':
                    return priceNumber < 500;
                case 'medium':
                    return priceNumber >= 500 && priceNumber <= 1000;
                case 'high':
                    return priceNumber > 1000;
                default:
                    return true;
            }
        });
    }

    // Filtrar por color
    if (colorFilter) {
        filteredProducts = filteredProducts.filter(product => product.color === colorFilter);
    }
    // Crear tarjetas con los productos filtrados
    createCards(filteredProducts);
}
// Cargar datos del JSON y configurar filtros
fetch('/ReNuevaTe/data/products.json')
    .then(response => response.json())
    .then(data => {
        createCards(data);
        populateFilters(data);

        document.getElementById('price-filter').addEventListener('change', () => filterProducts(data));
        document.getElementById('brand-filter').addEventListener('change', () => filterProducts(data));
        document.getElementById('color-filter').addEventListener('change', () => filterProducts(data));
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });