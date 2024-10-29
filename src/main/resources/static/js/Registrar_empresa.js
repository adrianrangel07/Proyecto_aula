document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso de la empresa!',
        confirmButtonText: 'Aceptar'
    }).then(function (result) {
        if (result.isConfirmed) {
            document.getElementById('registerForm').submit();
        }
    });
});