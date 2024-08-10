const urlPageTitle = "JS Single Page Application Router";

// crear un documento, hacer clic que solo mira los enlaces de navegación
document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    urlRoute();
});

// crear un objeto que asigne la URL a la plantilla, inicio, sobre nosostros, iniciar sesion, carrito, perfil
const urlRoutes = {
    404: {
        template: "/templates/404.html",
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    "/ReNuevaTe/index.html": {
        template: "/ReNuevaTe/src/pages/inicio.html",
        title: "Inicio | " + urlPageTitle,
        description: "Inicio de Página",
    },
    "/about": {
        template: "/ReNuevaTe/src/pages/sobreNosotrxs.html",
        title: "Sobre Nosotres | " + urlPageTitle,
        description: "Página de Sobre Nosotres",
    },
    "/catalogue": {
        template: "/ReNuevaTe/src/pages/catalogo.html",
        title: "Catálogo | " + urlPageTitle,
        description: "Página de Catálogo",
    },
    "/login": {
        template: "/ReNuevaTe/src/pages/usuario.html",
        title: "Página Login | " + urlPageTitle,
        description: "Página de Login",
    },
    "/shopping-cart": {
        template: "/ReNuevaTe/src/pages/carrito.html",
        title: "Carrito de Compras | " + urlPageTitle,
        description: "Página Carrito de Compras",
    },
    "/user": {
        template: "/ReNuevaTe/src/pages/usuario.html",
        title: "Usuario | " + urlPageTitle,
        description: "Página del Usuario",
    },
    "/contact-us": {
        template: "/ReNuevaTe/src/pages/contactanos.html",
        title: "Contáctanos | " + urlPageTitle,
        description: "Página de Contáctanos",
    }

};

// cree una función que observe la URL y llame a urlLocationHandler
const urlRoute = (event) => {
    event = event || window.event; // obtener window.event si no se proporciona el argumento del evento
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
};

// crear una función que maneje la ubicación de la URL
const urlLocationHandler = async () => {
    const location = window.location.pathname; // obtener la ruta de path
    // si la longitud de la ruta es 0, configúrelo en la ruta de la página principal
    if (location.length == 0) {
        location = "/";
    }
    // obtener el objeto de ruta del objeto urlRoutes
    const route = urlRoutes[location] || urlRoutes["404"];
    // obtener el html del template
    const html = await fetch(route.template).then((response) => response.text());
    // establecer el contenido del div de contenido en html
    document.getElementById("content").innerHTML = html;
    // establecer el título del documento al título de la ruta
    document.title = route.title;
    // establecer la descripción del documento a la descripción de la ruta
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};

// agregue un detector de eventos a la ventana que vigila los cambios de URL
window.onpopstate = urlLocationHandler;
// llame a la función urlLocationHandler para manejar la URL inicial
window.route = urlRoute;
// llame a la función urlLocationHandler para manejar la URL inicial
urlLocationHandler();
