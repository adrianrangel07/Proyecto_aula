document.addEventListener("DOMContentLoaded", function () {
    fetch('/login_inicio') 
      .then(response => response.json())
      .then(persona => {
        if (persona && persona.nombreUsuario) {
          Swal.fire({
            icon: "success",
            title: "Bienvenido, " + persona.nombreUsuario,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: "top",
            with: "30%",
            padding: "1 rem",
            toast: true,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching username:', error);
        Swal.fire({
          icon: "info",
          title: "BIENVENID@",
          showConfirmButton: false,
          
          timer: 3000,
          timerProgressBar: true,
          position: "top",
          toast: true,
        });
      });
  });

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

function buscarOfertas(termino) {
    fetch('/buscar_ofertas?termino=' + termino)
        .then(response => response.json())
        .then(data => {
            var resultadoBusqueda = document.getElementById('resultadoBusqueda');
            resultadoBusqueda.innerHTML = ''; // Limpiar el contenido anterior

            if (data.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'No hay ofertas disponibles',
                    text: 'Por favor, intenta con otro término de búsqueda.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); // Recargar la página
                    }
                });
            } else {
                data.forEach(function (oferta) {
                    var div = document.createElement('div');
                    div.classList.add('offer');
                    div.innerHTML = '<h3>' + oferta.titulo_puesto + '</h3><p>' + oferta.descripcion + '</p>' +
                        '<p style="display: none;" class="salario"><span>' + oferta.salario + '</span></p>' +
                        '<p style="display: none;" class="duracion"><span>' + oferta.duracion + '</span></p>' +
                        '<p style="display: none;" class="periodo"><span>' + oferta.periodo + '</span></p>' +
                        '<p style="display: none;" class="tipo_empleo"><span>' + oferta.tipo_empleo + '</span></p>';
                    resultadoBusqueda.appendChild(div);
                });
            }

            // Mover el footer al final del cuerpo de la página
            const footer = document.querySelector('.footer');
            if (footer.style.position === 'relative') {
                footer.style.position = 'fixed';
            } else {
                footer.style.position = 'relative';
            }
        });
}

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

document.addEventListener('DOMContentLoaded', function () {
    const offerContainers = document.querySelectorAll('.offer');
    const footer = document.querySelector('.footer');

    function checkOfferPresence() {
        if (offerContainers.length === 0) {
            footer.style.position = 'fixed';
        } else {
            footer.style.position = 'relative';
        }
    }

    checkOfferPresence();

    window.addEventListener('resize', checkOfferPresence);
});

//cuando le dan clic a una oferta se mantenga el borde  
document.addEventListener('DOMContentLoaded', function () {
    const offers = document.querySelectorAll('.offer');

    offers.forEach(offer => {
        offer.addEventListener('click', function () {
            // Eliminar la clase 'pressed' de todas las ofertas
            offers.forEach(otherOffer => {
                if (otherOffer !== this) {
                    otherOffer.classList.remove('pressed');
                }
            });

            // Agregar la clase 'pressed' a la oferta actual
            this.classList.add('pressed');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const offerDetails = document.querySelector('.offerDetails');
    const footer = document.querySelector('.footer');

    function adjustOfferPosition() {
        const lastOffer = document.querySelector('.offer:last-of-type');
        const lastOfferRect = lastOffer.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();

        const distanceToFooter = footerRect.top - lastOfferRect.bottom;

        if (distanceToFooter < 20) {
            offerDetails.style.bottom = (distanceToFooter - 20) + 'px'; // Ajustar la posición
        } else {
            offerDetails.style.bottom = '117px'; // Margen normal
        }
    }

    window.addEventListener('scroll', adjustOfferPosition);
    window.addEventListener('resize', adjustOfferPosition);

    adjustOfferPosition(); // Llamar a la función al cargar la página
});

document.addEventListener('DOMContentLoaded', function () {
    const offerDetails = document.querySelector('.offerDetails');
    const imagen = document.querySelector('.imagen');

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

            // Ocultar la imagen
            imagen.style.display = 'none';
        }
    });

    const closeOfferDetails = document.getElementById('closeOfferDetails');
    if (closeOfferDetails) {
        closeOfferDetails.addEventListener('click', function () {
            offerDetails.style.display = 'none';

            // Mostrar la imagen al cerrar offerDetails
            imagen.style.display = 'block';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const offers = document.querySelectorAll('.offer');
    const offerDetails = document.querySelector('.offerDetails');
    const imagen = document.querySelector('.imagen');

    offers.forEach(offer => {
        offer.addEventListener('click', function () {
            const tituloPuesto = this.querySelector('h3').innerText;
            const descripcion = this.querySelector('p').innerText;
            offerDetails.querySelector('h3').innerText = tituloPuesto;
            offerDetails.querySelector('p').innerText = descripcion;
            offerDetails.style.display = 'block';
            if (window.innerWidth <= 991) {
                imagen.style.display = 'none';
            }
        });
    });

    const closeOfferDetails = document.getElementById('closeOfferDetails');
    if (closeOfferDetails) {
        closeOfferDetails.addEventListener('click', function () {
            offerDetails.style.display = 'none';
            if (window.innerWidth <= 991) {
                imagen.style.display = 'block';
            }
        });
    }

    // Ocultar la imagen en dispositivos móviles y tablets al cargar la página
    if (window.innerWidth <= 991) {
        imagen.style.display = 'none';
    }

    // Agrega este código para manejar la redimensión de la ventana
    window.addEventListener('resize', function () {
        // Ocultar la imagen si el ancho de la ventana es menor o igual a 991px
        if (window.innerWidth <= 991) {
            imagen.style.display = 'none';
        } else {
            imagen.style.display = 'block'; // Mostrar la imagen en otros casos
        }
    });

    // Agrega este código después de tu evento closeOfferDetails
    closeOfferDetails.addEventListener('click', function () {
        offerDetails.style.display = 'none';
        if (window.innerWidth <= 991) {
            imagen.style.display = 'none';
        }
    });
});

//mensaje de cerrar sesion
document.addEventListener('DOMContentLoaded', function () {
    const cerrarSesion = document.querySelector('.nav-rp');
    if (cerrarSesion) {
        cerrarSesion.addEventListener('click', function (event) {
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
        });
    }
});
