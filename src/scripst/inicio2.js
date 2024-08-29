
function createCards(seealls) {
    const carousel = document.getElementById('card-products-seeall');
    carousel.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

    seealls.forEach(seeall => {
        const li = document.createElement('li');
        li.classList.add('card');

        const card = document.createElement('div');
        card.classList.add('inicio-card');
        card.onclick = () => getProductSseeall(seeall.id);

        const description = document.createElement('div');
        description.classList.add('inicio-description');
        description.innerHTML = `<img id="demo" src="${seeall.image}" alt="${seeall.category_name}">`;

        const shoeDetails = document.createElement('div');
        shoeDetails.classList.add('inicio-shoe-details');
        shoeDetails.innerHTML = `<span class="inicio-shoe_name">${seeall.category_name}</span>`;

        card.appendChild(description);
        card.appendChild(shoeDetails);
        li.appendChild(card);
        carousel.appendChild(li);
    });

    // Agregar la tarjeta "Ver todo"
    const li = document.createElement('li');
    li.classList.add('card');

    const card = document.createElement('div');
    card.classList.add('inicio-card');
    card.onclick = () => getProductSseeall();

    const description = document.createElement('div');
    description.classList.add('inicio-description');
    description.innerHTML = `<img id="demo" src="/ReNuevaTe/public/imagenes/marca.webp" alt="Ver todo">`;

    const shoeDetails = document.createElement('div');
    shoeDetails.classList.add('inicio-shoe-details');
    shoeDetails.innerHTML = `<span class="inicio-shoe_name">Ver todo</span>`;

    card.appendChild(description);
    card.appendChild(shoeDetails);
    li.appendChild(card);
    carousel.appendChild(li);
}

// Funcionalidad de los botones de navegación
const carousel = document.getElementById('carousel');
const arrowIcons = document.querySelectorAll(".arrow");
let firstImgWidth = 250 + 14; // Width de cada tarjeta + margin

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    });
});


// Cargar los datos desde el archivo JSON y generar las tarjetas
fetch('/ReNuevaTe/data/seeallProducts.json')
    .then(response => response.json())
    .then(data => {
        createCards(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });