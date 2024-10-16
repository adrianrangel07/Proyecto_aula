
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

//mostrar y ocultar filtro 
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
    const ofertas = document.querySelectorAll('.offer-container .card');

    // Función para normalizar el texto y quitar tildes
    function normalizeText(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    formBusqueda.addEventListener('submit', function (event) {
        event.preventDefault();

        const termino = normalizeText(terminoInput.value); // Normaliza el término de búsqueda
        let ofertasEncontradas = false;

        ofertas.forEach(oferta => {
            const titulo = normalizeText(oferta.querySelector('h3').textContent); // Normaliza el título de la oferta
            if (titulo.includes(termino)) {
                oferta.style.display = 'block';
                ofertasEncontradas = true;
            } else {
                oferta.style.display = 'none';
            }
        });

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

        terminoInput.value = '';
    });
});


// Función para alternar la visibilidad de las categorías

const filtersToggle = document.getElementById('filtersToggle');
const filtersDropdown = document.getElementById('filtersDropdown');

filtersToggle.addEventListener('click', function (event) {
    event.preventDefault();
    filtersDropdown.classList.toggle('show'); // Alternar la visibilidad del menú
});

document.addEventListener('click', function (event) {
    if (!filtersToggle.contains(event.target) && !filtersDropdown.contains(event.target)) {
        filtersDropdown.classList.remove('show');
    }
});

function applyFilters() {
    const salarioMin = parseFloat(document.getElementById("salarioMin").value) || 0;
    const salarioMax = parseFloat(document.getElementById("salarioMax").value) || Infinity;
    const duracion = document.getElementById("duracion").value.toLowerCase();
    const tipoEmpleo = document.getElementById("tipoEmpleoSelect").value.toLowerCase();

    const ofertas = document.querySelectorAll(".offer-container .card");

    ofertas.forEach(oferta => {
        const salario = parseFloat(oferta.querySelector(".salario span").innerText) || 0;
        const duracionOferta = oferta.querySelector(".duracion span").innerText.toLowerCase();
        const tipoEmpleoOferta = oferta.querySelector(".tipo_empleo span").innerText.toLowerCase();
        const modalidadOferta = oferta.querySelector(".modalidad span").innerText.toLowerCase();

        let isVisible = true;

        if (salario < salarioMin || salario > salarioMax) isVisible = false;
        if (duracion && !duracionOferta.includes(duracion)) isVisible = false;
        if (tipoEmpleo && tipoEmpleo !== tipoEmpleoOferta) isVisible = false;

        const checkboxes = document.querySelectorAll('#filterModalidad input[type="checkbox"]');
        const selectedModalities = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        if (selectedModalities.length > 0 && !selectedModalities.includes(modalidadOferta)) isVisible = false;

        oferta.style.display = isVisible ? "block" : "none";
    });
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
}

