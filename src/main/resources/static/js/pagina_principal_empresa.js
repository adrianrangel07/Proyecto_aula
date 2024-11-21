
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

        const offerId = card.getAttribute('data-id'); // Obtener el ID de la oferta
        modal.setAttribute('data-offer-id', offerId); // Asignarlo al modal

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

// Unificación de la función applyFilters
function applyFilters() {
    // Cerrar la barra lateral de filtros desmarcando el checkbox
    document.getElementById('btn-menu').checked = false;

    // Capturar valores de los filtros
    const salarioMin = parseFloat(document.getElementById("salarioMin").value) || 0;
    const salarioMax = parseFloat(document.getElementById("salarioMax").value) || Infinity;
    const duracion = document.getElementById("duracion").value.toLowerCase();
    const tipoEmpleo = document.getElementById("tipoEmpleoSelect").value.toLowerCase();

    const ofertas = document.querySelectorAll(".offer-container .card");

    // Capturar modalidades seleccionadas
    const checkboxes = document.querySelectorAll('#filterModalidad input[type="checkbox"]');
    const selectedModalities = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value.toLowerCase());

    let ofertasVisibles = 0; // Contador de ofertas visibles

    // Aplicar los filtros a cada tarjeta de oferta
    ofertas.forEach(oferta => {
        const salario = parseFloat(oferta.querySelector(".salario span").innerText) || 0;
        const duracionOferta = oferta.querySelector(".duracion span").innerText.toLowerCase();
        const tipoEmpleoOferta = oferta.querySelector(".tipo_empleo span").innerText.toLowerCase();
        const modalidadOferta = oferta.querySelector(".modalidad span").innerText.toLowerCase();

        // Lógica para mostrar/ocultar la oferta según los filtros
        let isVisible = true;

        if (salario < salarioMin || salario > salarioMax) isVisible = false;
        if (duracion && !duracionOferta.includes(duracion)) isVisible = false;
        if (tipoEmpleo && tipoEmpleo !== tipoEmpleoOferta) isVisible = false;
        if (selectedModalities.length > 0 && !selectedModalities.includes(modalidadOferta)) isVisible = false;

        // Mostrar u ocultar la oferta
        oferta.style.display = isVisible ? "block" : "none";

        if (isVisible) ofertasVisibles++; // Incrementar si la oferta es visible
    });

    // Mostrar alerta si no se encuentran resultados
    if (ofertasVisibles === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No se encontraron resultados',
            text: 'Ninguna oferta coincide con los filtros aplicados. Intenta con otros criterios.',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            location.reload();
        });
    }
}

function cerrarSesion(event) {
    event.preventDefault(); // Evitar que se ejecute el href del enlace

    Swal.fire({
        icon: 'success',
        title: 'Cerró sesión exitosamente',
        showConfirmButton: true,
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/'; // Redirigir a la página de inicio
        }
    });
}

function openModal(offer) {
    document.getElementById('modal').setAttribute('data-offer-id', offer.id);
    // Configura otros datos
    document.getElementById('modal-title').textContent = offer.title;
    document.getElementById('modal-description').textContent = offer.description;
    document.getElementById('modal').style.display = 'block';
}


document.getElementById('delete-button').addEventListener('click', function () {
    const offerId = document.getElementById('modal').getAttribute('data-offer-id');
    console.log("ID de la oferta a eliminar: ", offerId);  // Agregar esta línea
    if (!offerId || isNaN(offerId)) {
        alert("Error: ID de oferta no encontrado o inválido.");
        return;
    }

    if (confirm("¿Estás seguro de que deseas eliminar esta oferta?")) {
        fetch(`/offers/delete/${offerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    alert("Oferta eliminada con éxito");
                    document.getElementById('modal').style.display = 'none';
                    location.reload();
                } else {
                    alert("Error al eliminar la oferta");
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                alert("Error al eliminar la oferta");
            });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.offer-content');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalSalary = document.getElementById('modal-salary');
    const modalDuration = document.getElementById('modal-duration');
    const modalPeriod = document.getElementById('modal-period');
    const modalType = document.getElementById('modal-type');
    const modalModalidad = document.getElementById('modal-modalidad');

    const editForm = document.getElementById('edit-form');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');

    const editTitle = document.getElementById('edit-title');
    const editDescription = document.getElementById('edit-description');
    const editSalary = document.getElementById('edit-salary');
    const editDuration = document.getElementById('edit-duration');
    const editPeriod = document.getElementById('edit-period');
    const editModalidad = document.getElementById('edit-modalidad');
    const editType = document.getElementById('edit-type');

    let currentOfferId = null;

    // Función para abrir el modal con la oferta
    const openModal = (card) => {
        currentOfferId = card.getAttribute('data-id'); // Obtener el ID de la oferta

        // Llenar el modal con los datos actuales
        modalTitle.innerText = card.querySelector('h3').innerText;
        modalDescription.innerText = card.querySelector('p').innerText;
        modalSalary.innerHTML = `<strong>Salario:</strong> ${card.querySelector('.salario span').innerText}`;
        modalDuration.innerHTML = `<strong>Duración:</strong> ${card.querySelector('.duracion span').innerText}`;
        modalPeriod.innerHTML = `<strong>Periodo:</strong> ${card.querySelector('.periodo span').innerText}`;
        modalType.innerHTML = `<strong>Tipo de empleo:</strong> ${card.querySelector('.tipo_empleo span').innerText}`;
        modalModalidad.innerHTML = `<strong>Modalidad:</strong> ${card.querySelector('.modalidad span').innerText}`;

        // Mostrar el modal
        modal.style.display = 'flex';
    };

    // Agregar evento 'click' a cada tarjeta para abrir el modal
    cards.forEach(card => {
        card.addEventListener('click', function () {
            openModal(card);
        });
    });

    // Cerrar el modal
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    editButton.addEventListener('click', function () {
        // Mostrar el formulario de edición y ocultar la vista original
        modalTitle.style.display = 'none';
        modalDescription.style.display = 'none';
        modalSalary.style.display = 'none';
        modalDuration.style.display = 'none';
        modalPeriod.style.display = 'none';
        modalType.style.display = 'none';
        modalModalidad.style.display = 'none';

        editForm.style.display = 'block';

        // Pre-llenar el formulario con los datos actuales
        editTitle.value = modalTitle.textContent;
        editDescription.value = modalDescription.textContent;
        editSalary.value = modalSalary.textContent.replace('Salario: ', '');
        editDuration.value = modalDuration.textContent.replace('Duración: ', '');
        editPeriod.value = modalPeriod.textContent.replace('Periodo: ', '');
        editModalidad.value = modalModalidad.textContent.replace('Modalidad: ', '');
        editType.value = modalType.textContent.replace('Tipo de empleo: ', '');
    });

    // Guardar los cambios
    saveButton.addEventListener('click', function () {
        const updatedOffer = {
            id: currentOfferId,
            titulo_puesto: editTitle.value,
            descripcion: editDescription.value,
            salario: parseInt(editSalary.value),
            duracion: editDuration.value,
            periodo: editPeriod.value,
            modalidad: editModalidad.value,
            tipo_contrato: editType.value
        };
    
        fetch(`/offers/edit/${currentOfferId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOffer)
        })
        .then(response => {
            if (response.ok) {
                alert("Oferta actualizada con éxito");
                modal.style.display = 'none';
                location.reload();
            } else {
                alert("Error al actualizar la oferta");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            alert("Error al actualizar la oferta");
        });
    });

});



