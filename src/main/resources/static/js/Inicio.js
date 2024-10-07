
//Mostrar las ofertas en la pagina 
document.addEventListener('DOMContentLoaded', function () {
    const offers = document.querySelectorAll('.offer');
    const offerDetails = document.querySelector('.offerDetails');

    offers.forEach(offer => {
        offer.addEventListener('click', function () {
            const tituloPuesto = this.querySelector('h3').innerText;
            const descripcion = this.querySelector('p').innerText;
            offerDetails.querySelector('h3').innerText = tituloPuesto;
            offerDetails.querySelector('p').innerText = descripcion;
            offerDetails.style.display = 'block';
        });
    });

    const closeOfferDetails = document.getElementById('closeOfferDetails');
    if (closeOfferDetails) {
        closeOfferDetails.addEventListener('click', function () {
            offerDetails.style.display = 'none';
        });
    }
});

//filtro de busqueda
document.getElementById('formBusqueda').addEventListener('submit', function (event) {
    event.preventDefault();
    var termino = document.getElementById('termino').value;
    buscarOfertas(termino);
});

// Capturar el evento de submit del formulario
document.getElementById('formBusqueda').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener el valor del término de búsqueda
    var termino = document.getElementById('termino').value;

    // Llamar a la función para buscar ofertas
    buscarOfertas(termino);
});

// Capturar el evento de submit del formulario
document.getElementById('formBusqueda').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Obtener el valor del término de búsqueda
    var termino = document.getElementById('termino').value.toLowerCase(); // Convertir a minúsculas para comparación
    
    // Llamar a la función para buscar ofertas
    buscarOfertas(termino);
});

// Capturar el evento de submit del formulario
document.getElementById('formBusqueda').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Obtener el valor del término de búsqueda
    var termino = document.getElementById('termino').value.toLowerCase(); // Convertir a minúsculas para comparación
    console.log("Término de búsqueda:", termino); // Verifica el término que ingresaste
    
    // Llamar a la función para buscar ofertas
    buscarOfertas(termino);
});

//oferta de detalles
document.addEventListener('DOMContentLoaded', function () {
    const offerDetails = document.querySelector('.offerDetails');

    const resultadoBusqueda = document.getElementById('resultadoBusqueda');

    resultadoBusqueda.addEventListener('click', function (event) {
        const clickedOffer = event.target.closest('.offer');
        if (clickedOffer) { // Check if clicked element or its ancestor is an offer
            const tituloPuesto = clickedOffer.querySelector('h3').innerText;
            const descripcion = clickedOffer.querySelector('p').innerText;

            const salarioElement = clickedOffer.querySelector('.salario span');
            const duracionElement = clickedOffer.querySelector('.duracion span');
            const periodoElement = clickedOffer.querySelector('.periodo span');
            const tipoEmpleoElement = clickedOffer.querySelector('.tipo_empleo span');

            const salario = salarioElement ? salarioElement.innerText : 'No hay información disponible';
            const duracion = duracionElement ? duracionElement.innerText : 'No hay información disponible';
            const periodo = periodoElement ? periodoElement.innerText : 'No hay información disponible';
            const tipoEmpleo = tipoEmpleoElement ? tipoEmpleoElement.innerText : 'No hay información disponible';

            offerDetails.style.display = 'block';
            offerDetails.querySelector('h3').innerText = tituloPuesto;
            offerDetails.querySelector('p').innerText = descripcion;
            offerDetails.querySelector('.salarioSpan').innerText = salario;
            offerDetails.querySelector('.duracionSpan').innerText = duracion;
            offerDetails.querySelector('.periodoSpan').innerText = periodo;
            offerDetails.querySelector('.tipo_empleoSpan').innerText = tipoEmpleo;
        }
    });
});

// no borrar
document.addEventListener('DOMContentLoaded', function () {
    const postularseBtn = document.getElementById('postularseBtn');

    postularseBtn.addEventListener('click', function () {
        Swal.fire({
            icon: 'info',
            title: 'Debes iniciar sesión primero',
            text: 'Por favor, inicia sesión para poder postularte.',
            showConfirmButton: false,
            timerProgressBar: true,
            position: "center",
            color: "#000",
            with: "30%",
            padding: "1 rem",
            toast: true,
            timer: 3000,
        });
    });
});

let openCategory = null;
function toggleFilter() {
    const filterContainer = document.getElementById('filterContainer');
    const filterText = document.getElementById('filterText');
    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
        filterContainer.style.display = 'block';
        filterText.innerHTML = 'Ocultar Filtrador';
    } else {
        filterContainer.style.display = 'none';
        filterText.innerHTML = 'Mostrar Filtrador';
    }
}

// Función para alternar la visibilidad de las categorías
function toggleCategory(categoryId) {
    const filterOptions = document.getElementById(`filter${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`);
    const arrow = document.getElementById(`arrow${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`);

    // Alternar la visibilidad
    if (filterOptions.style.display === 'none') {
        filterOptions.style.display = 'block';
        arrow.textContent = '▲'; // Cambiar el ícono a "arriba"
    } else {
        filterOptions.style.display = 'none';
        arrow.textContent = '▼'; // Cambiar el ícono a "abajo"
    }
}

// Función para aplicar los filtros
function applyFilters() {
    const salarioMin = parseFloat(document.getElementById('salarioMin').value) || 0;
    const salarioMax = parseFloat(document.getElementById('salarioMax').value) || Infinity;
    const sueldo = document.getElementById('sueldo').value;
    const duracion = document.getElementById('duracion').value;

    // Aquí debes implementar la lógica para filtrar los elementos de tu página
    // Por ejemplo, si tienes un arreglo de trabajos, puedes filtrarlos así:
    
    // Suponiendo que `trabajos` es un arreglo de objetos que representan empleos
    const trabajos = [
        { salario: 500, tipo: "Mensual", duracion: "3 meses" },
        { salario: 700, tipo: "Quincenal", duracion: "6 meses" },
        // ... más trabajos
    ];

    const trabajosFiltrados = trabajos.filter(trabajo => {
        const cumpleSalario = trabajo.salario >= salarioMin && trabajo.salario <= salarioMax && trabajo.tipo === sueldo;
        const cumpleDuracion = trabajo.duracion.includes(duracion);
        return cumpleSalario && cumpleDuracion;
    });

    // Aquí puedes mostrar los trabajos filtrados en tu página
    console.log(trabajosFiltrados); // Para ver el resultado en la consola
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//de aqui en adelante la tarjeta
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todas las tarjetas
    const cards = document.querySelectorAll('.offer-content');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-btn');

    // Elementos del modal
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalSalary = document.getElementById('modal-salary');
    const modalDuration = document.getElementById('modal-duration');
    const modalPeriod = document.getElementById('modal-period');
    const modalType = document.getElementById('modal-type');
    const modalModalidad = document.getElementById('modal-modalidad');

    // Función para abrir el modal
    const openModal = (card) => {
        // Obtener los datos de la tarjeta
        const title = card.querySelector('h3').innerText;
        const description = card.querySelector('p').innerText;
        const salary = card.querySelector('.salario span').innerText;
        const duration = card.querySelector('.duracion span').innerText;
        const period = card.querySelector('.periodo span').innerText;
        const type = card.querySelector('.tipo_empleo span').innerText;
        const modalidad = card.querySelector('.modalidad span').innerText;

        // Llenar el modal con los datos de la tarjeta
        modalTitle.innerText = title;
        modalDescription.innerText = description;
        modalSalary.innerHTML = `<strong>Salario:</strong> ${salary}`;
        modalDuration.innerHTML = `<strong>Duración:</strong> ${duration}`;
        modalPeriod.innerHTML = `<strong>Periodo:</strong> ${period}`;
        modalType.innerHTML = `<strong>Tipo de empleo:</strong> ${type}`;
        modalModalidad.innerHTML = `<strong>Modalidad:</strong> ${modalidad}`;

        // Mostrar el modal
        modal.style.display = 'flex';
    };

    // Agregar evento 'click' a cada tarjeta para abrir el modal
    cards.forEach(card => {
        card.addEventListener('click', function () {
            openModal(card);
        });
    });

    // Cerrar el modal al hacer clic en el botón de cierre
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

//codigo para filtrador de busqueda por termino 
document.addEventListener("DOMContentLoaded", function () {
    const formBusqueda = document.getElementById('formBusqueda');
    const terminoInput = document.getElementById('termino');
    const ofertas = document.querySelectorAll('.offer-container .card'); // Selecciona todas las tarjetas de ofertas

    formBusqueda.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario

        const termino = terminoInput.value.toLowerCase(); // Obtiene el término de búsqueda y lo convierte a minúsculas
        let ofertasEncontradas = false; // Variable para verificar si se encontraron ofertas

        // Recorre todas las ofertas y muestra/oculta según el término
        ofertas.forEach(oferta => {
            const titulo = oferta.querySelector('h3').textContent.toLowerCase(); // Obtiene el título de la oferta
            // Verifica si el término está en el título o la descripción
            if (titulo.includes(termino)) {
                oferta.style.display = 'block'; // Muestra la oferta
                ofertasEncontradas = true; // Se encontró al menos una oferta
            } else {
                oferta.style.display = 'none'; // Oculta la oferta si no coincide
            }
        });
        
        // Si no se encontraron ofertas, muestra una alerta y recarga la página después de 2 segundos
        if (!ofertasEncontradas) {
            Swal.fire({
                icon: 'warning',
                title: 'No se encontraron ofertas',
                text: 'Por favor, verifica el término de búsqueda.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                location.reload();
            });
        }

        // Limpiar el campo de búsqueda después de la búsqueda
        terminoInput.value = '';
    });
});


function toggleCategory(category) {
    const filterOptions = document.getElementById(`filter${capitalizeFirstLetter(category)}`);
    const arrow = document.getElementById(`arrow${capitalizeFirstLetter(category)}`);
    
    if (filterOptions.style.display === "none") {
        filterOptions.style.display = "block";
        arrow.textContent = "▲"; // Cambia la flecha a arriba
    } else {
        filterOptions.style.display = "none";
        arrow.textContent = "▼"; // Cambia la flecha a abajo
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function applyFilters() {
    // Obtener valores de los filtros
    const salarioMin = parseFloat(document.getElementById("salarioMin").value) || 0;
    const salarioMax = parseFloat(document.getElementById("salarioMax").value) || Infinity;
    const duracion = document.getElementById("duracion").value.toLowerCase();
    const tipoEmpleo = document.getElementById("tipoEmpleoSelect").value; // Asegúrate de que esto sea el ID correcto

    // Obtener todas las ofertas
    const ofertas = document.querySelectorAll(".offer-container .card");

    // Filtrar ofertas
    ofertas.forEach(oferta => {
        const salario = parseFloat(oferta.querySelector(".salario span").innerText) || 0;
        const duracionOferta = oferta.querySelector(".duracion span").innerText.toLowerCase();
        const tipoEmpleoOferta = oferta.querySelector(".tipo_empleo span").innerText.toLowerCase();
        const modalidadOferta = oferta.querySelector(".modalidad span").innerText.toLowerCase();

        // Lógica de filtrado
        let isVisible = true;

        // Filtrar por salario
        if (salario < salarioMin || salario > salarioMax) isVisible = false;

        // Filtrar por duración
        if (duracion && !duracionOferta.includes(duracion)) isVisible = false;

        // Filtrar por tipo de empleo
        if (tipoEmpleo && tipoEmpleo !== tipoEmpleoOferta) isVisible = false;

        // Filtrar por modalidad
        const checkboxes = document.querySelectorAll('#filterModalidad input[type="checkbox"]');
        const selectedModalities = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        if (selectedModalities.length > 0 && !selectedModalities.includes(modalidadOferta)) isVisible = false;

        // Mostrar u ocultar la oferta
        oferta.style.display = isVisible ? "block" : "none";
    });
}
