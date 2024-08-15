function createCards(categorys) {
    const container = document.getElementById('card-container-categorias');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    categorys.forEach(category => {
        // Crear elementos de la tarjeta
        const card = document.createElement('div');
        card.classList.add('card');
        card.onclick = () => getCategoryProduct(category.id);

        const description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = `<img id="demo" src="${category.image}" alt="">`;

        const shoeDetails = document.createElement('div');
        shoeDetails.classList.add('shoe-details');
        shoeDetails.innerHTML = `<span class="shoe_name">${category.category_name}</span>`;

        card.appendChild(description);
        card.appendChild(shoeDetails);
        container.appendChild(card);
    });
    const card = document.createElement('div');
    card.classList.add('card');
    card.onclick = () => getCategoryProduct();

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerHTML = `<img id="demo" src="/ReNuevaTe/public/imagenes/marca.webp" alt="">`;

    const shoeDetails = document.createElement('div');
    shoeDetails.classList.add('shoe-details');
    shoeDetails.innerHTML = `<span class="shoe_name">Ver todo</span>`;

    card.appendChild(description);
    card.appendChild(shoeDetails);
    container.appendChild(card);

}
function getCategoryProduct(idCategory) {
    // Construir la URL con el parámetro del ID
    const url = `/catalogue/${idCategory}`;
    console.log("id categoria" + idCategory);

    // Cambiar la URL sin recargar la página
    window.history.pushState({}, "", url);

    // Llamar a la función para manejar la nueva URL
    urlLocationHandler();
}



// Cargar datos del JSON
fetch('/ReNuevaTe/data/catalogo.json')
    .then(response => response.json())
    .then(data => {
        createCards(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });