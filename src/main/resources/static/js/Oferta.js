// Función para manejar la selección de botones
function toggleButtonGroup(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Eliminar la clase 'active' de todos los botones en el mismo grupo
            buttons.forEach(btn => btn.classList.remove('active'));
            // Añadir la clase 'active' al botón que fue clickeado
            button.classList.add('active');
        });
    });
}

// Selecciona todos los grupos de botones
const salaryButtons = document.querySelectorAll('.salary-buttons button');
const jobTypeButtons = document.querySelectorAll('.job-type-buttons button');
const durationButtons = document.querySelectorAll('.duration-buttons button');

// Asigna la función a cada grupo de botones
toggleButtonGroup(salaryButtons);
toggleButtonGroup(jobTypeButtons);
toggleButtonGroup(durationButtons);


// JavaScript para manejar la selección de tipo de trabajo y duración
function setJobType(type) {
    document.getElementById('jobType').value = type;
}

function setDuration(duration) {
    document.getElementById('jobDuration').value = duration;
}