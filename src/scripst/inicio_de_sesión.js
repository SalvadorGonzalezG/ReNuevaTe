// Obtener elementos del DOM
const signUpButton = document.getElementById('goToRegister');
const signInButton = document.getElementById('goToLogin');
const forgotPasswordButton = document.getElementById('forgotPassword');
const container = document.getElementById('container');

// Función para añadir la clase 'right-panel-active'
const addRightPanelActive = () => {
    container.classList.add('right-panel-active');
};

// Función para remover la clase 'right-panel-active'
const removeRightPanelActive = () => {
    container.classList.remove('right-panel-active');
};

// Eventos para los botones de registro e inicio de sesión
signUpButton.addEventListener('click', addRightPanelActive);
signInButton.addEventListener('click', removeRightPanelActive);

// Evento para el botón de recuperación de contraseña
forgotPasswordButton.addEventListener('click', () => {
    alert('Funcionalidad de recuperación de contraseña aún no implementada.');
});

// Validación y almacenamiento del formulario de registro
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe directamente

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Verificar campos vacíos
    if (!document.getElementById('name').value || !password || !confirmPassword) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return; // Detiene la ejecución si las contraseñas no coinciden
    }

    // Crear objeto JSON con los datos del formulario
    const user = {
        name: capitalizeFirstLetter(document.getElementById('name').value),
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: btoa(password) // Codificar la contraseña en Base64
    };

    // Almacenar los datos del usuario en localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el correo electrónico ya está registrado
    if (users.some(existingUser => existingUser.email === user.email)) {
        alert('El correo electrónico ya está registrado.');
        return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Limpiar el formulario
    document.getElementById('signUpForm').reset();

    // Mostrar un alert de cuenta creada
    alert('Cuenta creada exitosamente.');
});

// Función para capitalizar solo la primera letra del nombre
function capitalizeFirstLetter(str) {
    if (!str) return '';
    const words = str.split(' ');
    const capitalizedWords = words.map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return capitalizedWords.join(' ');
}

// Validación del formulario de inicio de sesión
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe directamente

    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    // Verificar campos vacíos
    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Codificar la contraseña en Base64
    const encodedPassword = btoa(password);

    // Recuperar usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar las credenciales
    const user = users.find(u => u.email === email && u.password === encodedPassword);

    if (user) {
        alert('Inicio de sesión exitoso.');
        window.history.pushState({}, "", "/inicio");
        urlLocationHandler();
        // Redirigir o mostrar mensaje de éxito
    } else {
        alert('Nombre de usuario o contraseña inválidos.');
    }
});