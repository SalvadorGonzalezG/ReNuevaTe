const menu = document.querySelector('.menu');
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');

// aqui vamos a hacer es que si el menu esta abierto quiero que lo cierresy si esta cerrado que lo abra

function toggleMenu() {
    menu.classList.toggle("menu_opened");
}
openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);