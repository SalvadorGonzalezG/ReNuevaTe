const urlPageTitle = "ReNuevate";

// crear un documento, hacer clic que solo mira los enlaces de navegación
document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a") && !target.matches("footer a")) {
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
        scripts: ["/ReNuevaTe/src/scripst/inicio.js"],
        styles: ["/ReNuevaTe/src/styles/inicio.css"]
    },
    "/inicio": {
        template: "/ReNuevaTe/src/pages/inicio.html",
        title: "Sobre Nosotres | " + urlPageTitle,
        description: "Página de Sobre Nosotres",
        scripts: ["/ReNuevaTe/src/scripst/inicio.js"],
        styles: ["/ReNuevaTe/src/styles/inicio.css"]
    },
    "/about": {
        template: "/ReNuevaTe/src/pages/sobreNosotrxs.html",
        title: "Sobre Nosotres | " + urlPageTitle,
        description: "Página de Sobre Nosotres",
        scripts: [],
        styles: ["/ReNuevaTe/src/styles/sobreNosotrxs.css"]
    },
    "/catalogue": (id) => ({
        template: "/ReNuevaTe/src/pages/catalogo.html",
        title: `Catalogo | ${urlPageTitle}`,
        description: `Página de catalogo con ID ${id}`,
        scripts: ["/ReNuevaTe/src/scripst/card.js"], // Scripts específicos para la página de inicio
        styles: ["/ReNuevaTe/src/styles/card.css"] // Estilos específicos para la página de inicio
    }),
    "/detail": (id) => ({
        template: "/ReNuevaTe/src/pages/detalleproducto.html",
        title: `Detalle del Producto | ${urlPageTitle}`,
        description: `Página de detalle del producto con ID ${id}`,
        scripts: ["/ReNuevaTe/src/scripst/detail.js"], // Scripts específicos para la página de detalle
        styles: ["/ReNuevaTe/src/styles/detalleproducto.css"] // Estilos específicos para la página de detalle
    }),
    "/login": {
        template: "/ReNuevaTe/src/pages/usuario.html",
        title: "Página Login | " + urlPageTitle,
        description: "Página de Login",
        scripts: ["/ReNuevaTe/src/scripst/usuarios.js"],
        styles: ["/ReNuevaTe/src/styles/usuarios.css"]
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
        scripts: ["/ReNuevaTe/src/scripst/contactanos.js"],
        styles: ["/ReNuevaTe/src/styles/contactanos.css"]
    },
    "/inicioDeSesion": {
        template: "/ReNuevaTe/src/pages/inicioDeSesion.html",
        title: "Inicio de Sesion | " + urlPageTitle,
        description: "Página de Inicio de Sesion",
        scripts: ["/ReNuevaTe/src/scripst/inicio_de_sesión.js"],
        styles: ["/ReNuevaTe/src/styles/inicioDeSesion.css"]
    },
    "/category": {
        template: "/ReNuevaTe/src/pages/categorias.html",
        title: "Categorias | " + urlPageTitle,
        description: "Página de Categorias",
        scripts: ["/ReNuevaTe/src/scripst/categorias.js"],
        styles: ["/ReNuevaTe/src/styles/categorias.css"]
    },
    "/shopping": {
        template: "/ReNuevaTe/src/pages/carroCompras.html",
        title: "Categorias | " + urlPageTitle,
        description: "Página Carrito de Compras",
        scripts: ["/ReNuevaTe/src/scripst/carroCompras.js"],
        styles: []
    },
     "/shippingDetails": {
        template: "/ReNuevaTe/src/pages/detallesDeEnvio.html",
        title: "Categorias | " + urlPageTitle,
        description: "Página de Detalles de Envio",
        scripts: ["/ReNuevaTe/src/scripst/detallesDeEnvio.js"],
        styles: ["/ReNuevaTe/src/styles/detallesDeEnvio.css"]
    },
    "/paymenDetails": {
       template: "/ReNuevaTe/src/pages/detEnvMetPag.html",
       title: "Categorias | " + urlPageTitle,
       description: "Página Metodos de Pago",
       scripts: ["/ReNuevaTe/src/scripst/detEnvMetPag.js"],
       styles: ["/ReNuevaTe/src/styles/detEnvMetPag.css", "/ReNuevaTe/src/styles/metodoDePago.css", "/ReNuevaTe/src/styles/detallesDeEnvio.css"]
   },
   "/paymentMethods": {
      template: "/ReNuevaTe/src/pages/metodoDePago.html",
      title: "Categorias | " + urlPageTitle,
      description: "Página Metodos de Pago",
      scripts: ["/ReNuevaTe/src/scripst/metodoDePago.js"],
      styles: ["/ReNuevaTe/src/pages/metodoDePago.html"]
  },
  "/comentarios": {
    template: "ReNuevaTe/src/pages/comentarios.html",
    title: "Comentarios | " + urlPageTitle,
    description: "comentarios de pagina",
    scripts: ["/ReNuevaTe/src/scripst/comentarios.js"],
    styles: ["/ReNuevaTe/src/styles/comentarios.css"]
}
};

// Función para cargar y aplicar los estilos y scripts
const loadAssets = (route) => {
    // Cargar estilos específicos
    if (route.styles) {
        route.styles.forEach(style => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = style;
            link.dataset.route = route.template; // Marca el estilo con la ruta actual
            document.head.appendChild(link);
        });
    }

    // Cargar scripts específicos
    if (route.scripts) {
        route.scripts.forEach(script => {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.dataset.route = route.template; // Marca el script con la ruta actual
            document.body.appendChild(scriptElement);
        });
    }
};

// // cree una función que observe la URL y llame a urlLocationHandler
const urlRoute = (event) => {
    event = event || window.event; // obtener window.event si no se proporciona el argumento del evento
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
};

// crear una función que maneje la ubicación de la URL
// Función que maneja la ubicación de la URL
const urlLocationHandler = async () => {
    let path = window.location.pathname; // Obtener la ruta de path
    // Si la longitud de la ruta es 0, configúrelo en la ruta de la página principal
    if (path.length == 0) {
        path = "/";
    }

    // Obtener el ID de la URL si existe
    const idMatch = path.match(/\/detail\/(\d+)/);
    const idMatchCategory = path.match(/\/catalogue\/(\w+)/);
    let route;

    if (idMatch) {
        const id = idMatch[1];
        route = urlRoutes["/detail"](id); // Llama a la función de la ruta con el ID
    } else if (idMatchCategory) {
        const id = idMatchCategory[1];
        route = urlRoutes["/catalogue"](id); // Llama a la función de la ruta con el ID
    }else{
        route = urlRoutes[path] || urlRoutes[404];
    }

    // Obtener el HTML del template
    const html = await fetch(route.template).then((response) => response.text());
    // Establecer el contenido del div de contenido en html
    document.getElementById("content").innerHTML = html;
    // Establecer el título del documento al título de la ruta
    document.title = route.title;

    // Actualizar la meta descripción
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", route.description);
    }

    // Limpiar estilos y scripts existentes
    document.querySelectorAll('link[data-route]').forEach(link => link.remove());
    document.querySelectorAll('script[data-route]').forEach(script => script.remove());

    // Cargar estilos y scripts específicos
    loadAssets(route);
};

// agregue un detector de eventos a la ventana que vigila los cambios de URL
window.onpopstate = urlLocationHandler;
// llame a la función urlLocationHandler para manejar la URL inicial
window.route = urlRoute;
// llame a la función urlLocationHandler para manejar la URL inicial
urlLocationHandler();



