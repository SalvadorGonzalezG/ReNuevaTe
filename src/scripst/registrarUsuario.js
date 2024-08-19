document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('InputContraseña');
    const confirmarContraseñaInput = document.getElementById('InputCContraseña');
    const buttonCuenta = document.getElementById('button-cuenta');
    const alertContainer = document.getElementById('alertContainer');
    const passwordChecklist = document.getElementById('passwordChecklist');

    const nombreInput = document.getElementById('InputNombre');
    const emailInput = document.getElementById('InputEmail1');
    const telefonoInput = document.getElementById('InputTelefono');
    
    // Expresiones regulares para validación
    const nombreCompletoRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){2,3}$/;
    const emailValRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoValRegex = /^\+?[1-9]\d{1,14}$/;
    const contraseñaValRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    function validatePassword() {
        const password = passwordInput.value;

        const minLength = password.length >= 8;
        const uppercase = /[A-Z]/.test(password);
        const lowercase = /[a-z]/.test(password);
        const number = /\d/.test(password);
        const specialChar = /[@$!%*?&]/.test(password);

        document.getElementById('checkLength').checked = minLength;
        document.getElementById('checkUppercase').checked = uppercase;
        document.getElementById('checkLowercase').checked = lowercase;
        document.getElementById('checkNumber').checked = number;
        document.getElementById('checkSpecialChar').checked = specialChar;

    }

    // Mostrar la checklist al enfocar el campo de contraseña
    passwordInput.addEventListener('focus', function() {
        passwordChecklist.style.display = 'block';
    });

    // Mostrar la checklist al enfocar el campo de contraseña
    passwordInput.addEventListener('focus', function() {
        if (passwordInput.value.length > 0) {
            passwordChecklist.style.display = 'block';
        }
    });

    // Ocultar la checklist cuando se pierde el enfoque
    passwordInput.addEventListener('blur', function() {
        // Un pequeño retraso para permitir la pérdida del foco en caso de clic en el checkbox
        setTimeout(() => {
            passwordChecklist.style.display = 'none';
        }, 200);
    });
    // Actualizar la checklist mientras se escribe la contraseña
    passwordInput.addEventListener('input', validatePassword);

    buttonCuenta.addEventListener('click', function() {
        
        const nombre = nombreInput.value;
        const email = emailInput.value;
        const telefono = telefonoInput.value;
        const contraseña = passwordInput.value;
        const confirmarContraseña = confirmarContraseñaInput.value;

        alertContainer.innerHTML = '';

        // Validaciones
        if (!nombreCompletoRegex.test(nombre)) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-error';
            errorAlert.textContent = 'El nombre completo debe tener al menos un nombre y dos apellidos, cada uno comenzando con una letra mayúscula.';
            alertContainer.appendChild(errorAlert);
            return;
        }

        if (contraseña !== confirmarContraseña) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-error';
            errorAlert.textContent = 'Las contraseñas no coinciden.';
            alertContainer.appendChild(errorAlert);
            return;
        }

        if (!nombre || !email || !telefono || !contraseña) {
            const warningAlert = document.createElement('div');
            warningAlert.className = 'alert alert-warning';
            warningAlert.textContent = 'Por favor, complete todos los campos.';
            alertContainer.appendChild(warningAlert);
            return;
        }

        if (!emailValRegex.test(email)) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-error';
            errorAlert.textContent = 'El formato del correo electrónico no es válido.';
            alertContainer.appendChild(errorAlert);
            return;
        }

        if (!telefonoValRegex.test(telefono)) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-error';
            errorAlert.textContent = 'El número de teléfono no es válido.';
            alertContainer.appendChild(errorAlert);
            return;
        }

        if (!contraseñaValRegex.test(contraseña)) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-error';
            errorAlert.textContent = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.';
            alertContainer.appendChild(errorAlert);
            return;
        }

        const datos = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            contraseña: contraseña
        };

        const json = JSON.stringify(datos, null, 4);
        console.log(json);
    });
});

