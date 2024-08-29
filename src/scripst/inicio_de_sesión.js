<<<<<<< Updated upstream
=======
// Obtener elementos del DOM
const signUpButton = document.getElementById('goToRegister');
const signInButton = document.getElementById('goToLogin');
const forgotPasswordButton = document.getElementById('forgotPassword');
const container = document.getElementById('container');

// Función para añadir la clase 'right-panel-active'
const addRightPanelActive = () => {
    container.classList.add('right-panel-active');
};
>>>>>>> Stashed changes

// Función para remover la clase 'right-panel-active'
const removeRightPanelActive = () => {
    container.classList.remove('right-panel-active');
};

<<<<<<< Updated upstream
    // Función para mostrar alertas nativas del navegador
    function showAlert(message) {
        alert(message);
    }

    // Mostrar alerta al abrir la página
    function showWelcomeAlert() {
        showAlert('Bienvenidx a la página. Asegúrate de seguir las instrucciones para el registro y el inicio de sesión.');
    }

    // Validación de campos vacíos
    function validateEmptyFields(fields) {
        for (const field in fields) {
            if (!fields[field]) {
                showAlert(`${field} es obligatorio.`);
                return false;
            }
        }
        return true;
=======
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
>>>>>>> Stashed changes
    }

    // Validación de formato de correo electrónico
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            showAlert('El correo electrónico no es válido.');
            return false;
        }
        return true;
    }

    // Validación de número de teléfono (solo números)
    function validatePhone(phone) {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            showAlert('El número de teléfono debe tener 10 dígitos.');
            return false;
        }
        return true;
    }

    // Validación de coincidencia de contraseñas
    function validatePasswords(password1, password2) {
        if (password1 !== password2) {
            showAlert('Las contraseñas no coinciden.');
            return false;
        }
        return true;
    }

    // Validación de contraseña fuerte
    function validatePasswordStrength(password) {
        // Requiere al menos una letra mayúscula, un número y un carácter especial
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            showAlert('La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.');
            return false;
        }
        return true;
    }

    // Limpiar los campos del formulario
    function clearFields(form) {
        form.reset();
    }

    // Manejar el registro de usuarios
    function handleRegister(event) {
        event.preventDefault();

        const form = event.target;
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('tel').value;
        const contraseña = document.getElementById('contraseña').value;
        const contraseña2 = document.getElementById('contraseña2').value;

        const fields = { Nombre: nombre, Correo: correo, Teléfono: telefono, Contraseña: contraseña, "Repetir Contraseña": contraseña2 };

        if (!validateEmptyFields(fields)) return;
        if (!validateEmail(correo)) return;
        if (!validatePhone(telefono)) return;
        if (!validatePasswords(contraseña, contraseña2)) return;
        if (!validatePasswordStrength(contraseña)) return;

        const usuario = {
            nombre,
            correo,
            telefono,
            contraseña
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        console.log('Usuario registrado:', usuario);
        showAlert('Registro exitoso.');

        // Limpiar los campos del formulario de registro
        clearFields(form);
    }

    // Manejar el inicio de sesión de usuarios
    function handleLogin(event) {
        event.preventDefault();

        const form = event.target;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const fields = { "Nombre de usuario": username, Contraseña: password };

        if (!validateEmptyFields(fields)) return;

        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser && storedUser.correo === username && storedUser.contraseña === password) {
            showAlert('Inicio de sesión exitoso.');
            clearFields(form);  // Limpiar los campos del formulario de inicio de sesión
        } else {
            showAlert('Nombre de usuario o contraseña inválidos.');
        }
    }

    // Configuración de usuario de prueba en localStorage
    function setupTestUser() {
        const testUser = {
            correo: 'usuario@prueba.com',
            contraseña: 'Password123!'
        };
        localStorage.setItem('usuario', JSON.stringify(testUser));
    }

    // Configuración de animaciones de botones
    function setupButtonAnimations() {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    // Inicialización
    function init() {
        setupTestUser();
        setupButtonAnimations();
        showWelcomeAlert();

        document.getElementById('formulario').addEventListener('submit', handleRegister);
        document.getElementById('formulario2').addEventListener('submit', handleLogin);
    }

    // Ejecutar la función de inicialización al cargar el DOM
    init();

