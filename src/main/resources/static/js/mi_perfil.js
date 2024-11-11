document.addEventListener('DOMContentLoaded', function () {
    // Mostrar el formulario al hacer clic en "Change Photo"
    document.getElementById('changePhotoBtn').addEventListener('click', function () {
        document.getElementById('uploadForm').style.display = 'block'; // Muestra el formulario
        document.getElementById('cancelUploadBtn').style.display = 'inline-block'; // Muestra el botón de cancelar
    });

    // Ocultar el formulario al hacer clic en "Cancel"
    document.getElementById('cancelUploadBtn').addEventListener('click', function () {
        document.getElementById('uploadForm').style.display = 'none'; // Oculta el formulario
        document.getElementById('cancelUploadBtn').style.display = 'none'; // Oculta el botón de cancelar
    });

    // Mostrar la nueva imagen al cambiar la foto
    document.querySelector('input[name="file"]').addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('profileImage').src = e.target.result; // Muestra la nueva imagen
        };

        reader.readAsDataURL(file);
    });

    // Interceptar el submit del formulario
    document.getElementById('uploadForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario para mostrar SweetAlert primero

        // Mostrar SweetAlert con el mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Foto cambiada',
            text: 'Tu foto de perfil ha sido actualizada exitosamente!',
            showConfirmButton: true,
            confirmButtonText: 'Ok'
        }).then((result) => {
            // Después de que el usuario haga clic en "Ok", se puede enviar el formulario
            if (result.isConfirmed) {
                this.submit(); // Enviar el formulario después de mostrar el mensaje
            }
        });
    });
});

// boton cambio de datos
document.getElementById('change_btn').addEventListener('click', function () {
    // Selecciona todos los inputs del formulario
    document.querySelectorAll('input').forEach(input => {
        // Verifica si el input no es el de fecha
        if (input.id !== 'birthdate') {
            input.disabled = false; // Habilita el campo
        }
    });
});

// Función para manejar el clic en el botón de eliminar
function eliminarPostulacion(button) {
    var postulacionId = button.getAttribute('data-id');
    
    fetch(`/postulacion/eliminar/${postulacionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Eliminar la postulación del DOM
            button.closest('.card').remove();
            alert('Postulación eliminada con éxito');
        } else {
            alert('Hubo un problema al eliminar la postulación');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al realizar la solicitud');
    });
}

