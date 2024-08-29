// Ejecuta la función cuando el contenido del DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el contenedor donde se mostrarán los comentarios
    const commentSection = document.querySelector('.comments-section');
    
    // Obtiene los comentarios almacenados en localStorage y los convierte en un array de objetos
    // Si no hay comentarios almacenados, se inicializa como un array vacío
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];

    // Recorre los comentarios almacenados y los inserta en la sección de comentarios
    storedComments.forEach(comment => {
        const newComment = document.createElement('div');  // Crea un nuevo div para el comentario
        newComment.classList.add('comment');  // Asigna la clase 'comment' al nuevo div
        newComment.innerHTML = `
            <div class="user-avatar">
                <i class="material-icons">person</i>
            </div>
            <div class="comment-content">
                <div class="user-info">
                    <span class="username">${comment.username}</span>
                    <div class="rating">${'★'.repeat(comment.rating)}${'☆'.repeat(5 - comment.rating)}</div>
                </div>
                <div class="comment-text">${comment.commentText}</div>
            </div>
        `;
        // Inserta el nuevo comentario en la sección de comentarios antes del input
        commentSection.insertBefore(newComment, document.querySelector('input'));
    });

    // Agrega un event listener al botón para capturar el evento 'click'
    document.querySelector('button').addEventListener('click', function() {
        // Obtiene los valores de los campos de entrada y los recorta para eliminar espacios en blanco
        const username = document.querySelector('#username').value.trim();
        const commentText = document.querySelector('#commentText').value.trim();
        const rating = document.querySelector('#rating').value;

        // Verifica si los campos de nombre de usuario y comentario no están vacíos
        if (username && commentText) {
            // Crea un objeto para el nuevo comentario
            const newComment = {
                username: username,
                commentText: commentText,
                rating: rating
            };

            // Agrega el nuevo comentario al array de comentarios almacenados
            storedComments.push(newComment);
            // Almacena el array actualizado de comentarios en localStorage como una cadena JSON
            localStorage.setItem('comments', JSON.stringify(storedComments));

            // Crea un nuevo div para mostrar el comentario en la página
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');  // Asigna la clase 'comment' al nuevo div
            commentDiv.innerHTML = `
                <div class="user-avatar">
                    <i class="material-icons">person</i>
                </div>
                <div class="comment-content">
                    <div class="user-info">
                        <span class="username">${username}</span>
                        <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                    </div>
                    <div class="comment-text">${commentText}</div>
                </div>
            `;
            // Inserta el nuevo comentario en la sección de comentarios antes del input
            commentSection.insertBefore(commentDiv, document.querySelector('input'));

            // Limpia los campos del formulario después de agregar el comentario
            document.querySelector('#username').value = '';
            document.querySelector('#commentText').value = '';
            document.querySelector('#rating').value = '5';
        } else {
            // Muestra una alerta si alguno de los campos obligatorios está vacío
            alert('Por favor, completa todos los campos.');
        }
    });
});
