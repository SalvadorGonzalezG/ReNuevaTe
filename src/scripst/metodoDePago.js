document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('mostrarCupon').addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById('inputCupon').style.display = "block";
    });
});