
document.getElementById('btn-register').addEventListener('click', function (event) {
    // Obtener los valores de los campos de contraseña y confirmar contraseña
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        // Si no coinciden, mostrar un mensaje de alerta y evitar el envío del formulario
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Las contraseñas no coinciden. Por favor, verifica.'
        });
        event.preventDefault(); // Evita que el formulario se envíe
    }
});


