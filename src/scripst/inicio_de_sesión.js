

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

