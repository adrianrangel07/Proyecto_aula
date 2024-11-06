
document.getElementById('changePhotoBtn').addEventListener('click', function () {
    document.getElementById('uploadForm').style.display = 'block'; // Muestra el formulario
});

document.getElementById('cancelUploadBtn').addEventListener('click', function () {
    document.getElementById('uploadForm').style.display = 'none'; // Oculta el formulario
});


document.querySelector('input[name="photo"]').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById('profileImage').src = e.target.result; // Muestra la nueva imagen
    };

    reader.readAsDataURL(file);
});

