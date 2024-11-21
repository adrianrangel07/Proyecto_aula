package com.proyectodeaula.proyecto_de_aula.controller;

import java.io.IOException;
// import java.net.http.HttpHeaders;
import org.springframework.http.HttpHeaders;
import java.util.Base64;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.proyectodeaula.proyecto_de_aula.interfaces.Personas.Interfaz_Per;
import com.proyectodeaula.proyecto_de_aula.interfaces.Personas.Interfaz_Persona;
import com.proyectodeaula.proyecto_de_aula.model.Personas;
import com.proyectodeaula.proyecto_de_aula.model.Postulacion;
import com.proyectodeaula.proyecto_de_aula.service.PersonaService;
import com.proyectodeaula.proyecto_de_aula.service.PostulacionService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping
public class PersonaController {

    @Autowired
    private Interfaz_Per user;

    @Autowired
    private Interfaz_Persona per;

    @Autowired
    private PersonaService personaService;

    @Autowired
    private PostulacionService postulacionService;

    // Esto te lleva a que las personas se registren
    @GetMapping("/Register/personas") // recuerda colocar esta ruta para que te lleve a registrar personas
    public String agregar(Model model) {
        Personas persona = new Personas();
        model.addAttribute("new_persona", persona);
        return "html/Registrar_persona"; // html de pagina de registro personas
    }

    // Método para guardar una nueva persona
    @PostMapping("/Register/personas") // aqui mismo se guarda las personas
    public String save(@ModelAttribute("new_persona") Personas persona, Model model) {
        // Guardar la persona en la base de datos
        per.save(persona);

        // Redireccionar a la página de inicio de sesión
        return "html/inicio_sesion_persona";
    }

    // Método para mostrar la página de inicio de sesión
    @GetMapping("/login/personas") // recuerda colocar la ruta para iniciar sesion
    public String iniciar_sesion() {
        return "html/inicio_sesion_persona"; // Vista de iniciar sesion personas
    }

    // Método para validar las credenciales del usuario
    @PostMapping("/login/personas")
    public String iniciarSesion(HttpSession session, Model model, @RequestParam String email,
            @RequestParam String contraseña) {
        // Buscar a la persona por email y contraseña
        Personas persona = user.findByEmailAndContraseña(email, contraseña);

        if (persona != null) {
            model.addAttribute("nombreUsuario", persona.getNombre());

            // Guardar el email y el usuarioId en la sesión
            session.setAttribute("email", email);
            session.setAttribute("usuarioId", persona.getId()); // Guarda el usuarioId en la sesión como Long

            return "redirect:/personas/pagina_principal"; // Redirige a la página principal
        } else {
            model.addAttribute("error", "Credenciales incorrectas");
            return "redirect:/datos_incorrectos"; // Si las credenciales son incorrectas
        }
    }

    @GetMapping("/perfil/persona")
    public String myProfile(Model model, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email != null) {
            // Buscar la persona por email
            Personas persona = personaService.findByEmail(email);

            if (persona == null) {
                model.addAttribute("error", "Persona no encontrada.");
                return "html/error";
            }

            // Obtener las postulaciones de esta persona
            List<Postulacion> postulaciones = postulacionService.obtenerPostulacionesPorUsuario(persona.getId());
            model.addAttribute("postulaciones", postulaciones);

            // Verificar si la foto no es nula
            if (persona.getFoto() != null) {
                String base64Image = Base64.getEncoder().encodeToString(persona.getFoto());
                model.addAttribute("base64Image", "data:image/png;base64," + base64Image);
            } else {
                model.addAttribute("base64Image", "");
            }

            // Agregar la persona al modelo
            model.addAttribute("persona", persona);
            return "html/Mi_perfil"; // Devuelve la vista del perfil
        } else {
            return "redirect:/login/personas";
        }
    }

    @PostMapping("/actualizar")
    public String actualizarPerfil(@RequestParam String nombre, @RequestParam String apellido,
            @RequestParam String contraseña, @RequestParam String genero, HttpSession session, Model model) {
        try {
            String email = (String) session.getAttribute("email");
            if (email == null) {
                model.addAttribute("error", "Sesión expirada, por favor inicie sesión de nuevo.");
                return "redirect:/login/personas"; // Redirigir si no hay sesión
            }

            // Buscar persona por email
            Personas persona = personaService.findByEmail(email);
            if (persona == null) {
                model.addAttribute("error", "Usuario no encontrado.");
                return "html/error"; // Redirigir si no se encuentra la persona
            }

            // Actualizar los campos de la persona solo si no están vacíos
            if (nombre != null && !nombre.isEmpty()) {
                persona.setNombre(nombre);
            }
            if (apellido != null && !apellido.isEmpty()) {
                persona.setApellido(apellido);
            }
            if (contraseña != null && !contraseña.isEmpty()) {
                persona.setContraseña(contraseña);
            }
            if (email != null && !email.isEmpty()) {
                persona.setEmail(email); // Actualizar email
            }
            if (genero != null && !genero.isEmpty()) {
                persona.setGenero(genero);
            }

            // Guardar los cambios
            personaService.actualizarPerfil(persona);

            model.addAttribute("success", "Perfil actualizado con éxito");
            return "redirect:/perfil/persona"; // Redirige de vuelta a la vista del perfil
        } catch (Exception e) {
            model.addAttribute("error", "Error al actualizar el perfil: " + e.getMessage());
            e.printStackTrace(); // Imprimir el stack trace para depuración
            return "html/error"; // Mostrar una página de error si algo falla
        }
    }

    // metodo para subir la foto
    @PostMapping("/upload/photo")
    public String uploadPhoto(@RequestParam("file") MultipartFile file, HttpSession session) {

        String email = (String) session.getAttribute("email"); // Obtener el email del usuario en sesión
        Personas persona = personaService.findByEmail(email); // Buscar a la persona

        if (persona != null) {
            try {
                byte[] foto = file.getBytes(); // Obtener los bytes de la imagen
                persona.setFoto(foto); // Establecer la foto en el objeto persona
                per.save(persona); // Guardar los cambios en la base de datos
            } catch (IOException e) {
                e.printStackTrace(); // Manejo de excepción
            }
        }

        return "redirect:/perfil/persona"; // Redirecciona a la página principal o donde necesites
    }

    // metodo para subir la hoja de vida
    @PostMapping("/uploadHDV")
    public String uploadHDV(@RequestParam("file") MultipartFile file, Model model, HttpSession session) {
        try {
            if (file.isEmpty() || !file.getContentType().equals("application/pdf")) {
                model.addAttribute("error", "Por favor, seleccione un archivo PDF válido.");
                return "redirect:/perfil/persona";  
            }

            String email = (String) session.getAttribute("email"); // Obtener el email de la sesión
            Personas persona = personaService.findByEmail(email);
            if (persona == null) {
                model.addAttribute("error", "Usuario no encontrado.");
                return "html/error"; // Redirige a la página de error
            }

            // Convertir el archivo en un arreglo de bytes y asignarlo al campo correspondiente
            byte[] pdfBytes = file.getBytes();
            persona.setCv(pdfBytes);  // campo "pdf" debe estar en la entidad Personas

            personaService.actualizarPerfil(persona); // Guardar cambios en la base de datos
            model.addAttribute("success", "PDF cargado con éxito.");
            return "redirect:/perfil/persona"; // Redirige a la vista del perfil
        } catch (Exception e) {
            model.addAttribute("error", "Error al cargar el PDF: " + e.getMessage());
            e.printStackTrace();
            return "html/error"; // Redirige a la página de error en caso de fallo
        }
    }
    // fin del metodo para subir la HDV

    // obtener la HDV
    @GetMapping("/perfil/verHDV")
    public ResponseEntity<byte[]> verHDV(HttpSession session) {
        String email = (String) session.getAttribute("email");
        Personas persona = personaService.findByEmail(email);

        if (persona == null || persona.getCv() == null) {
            return ResponseEntity.notFound().build();
        }

        // Crear encabezados para el contenido PDF
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.inline().filename("HDV.pdf").build());

        return ResponseEntity.ok().headers(headers).body(persona.getCv());
    }
    // fin medoto para obtener la HDV

    // borrar hoja de vida
   @PostMapping("/eliminarHDV") // Si usas POST
    public String eliminarHojaDeVida(HttpSession session, Model model) {
        try {
            String email = (String) session.getAttribute("email");
            if (email == null) {
                model.addAttribute("error", "Sesión expirada, por favor inicie sesión.");
                return "redirect:/login/personas"; // Redirigir si no hay sesión
            }

            // Llamar al servicio para eliminar el archivo
            personaService.eliminarHojaDeVida(email); // Asegúrate de que este método existe y elimina el archivo correctamente.

            model.addAttribute("success", "Hoja de vida eliminada con éxito.");
            return "redirect:/perfil/persona"; // Redirigir al perfil
        } catch (Exception e) {
            model.addAttribute("error", "Error al eliminar la hoja de vida: " + e.getMessage());
            e.printStackTrace(); // Mostrar detalles del error para depuración
            return "html/error"; // Mostrar una página de error si algo falla
        }
    }


    // fin borrar hoja de vida



    // metodo para actualizar el perfil
    @GetMapping("/update/perfil")
    public String mostrarPerfil(@RequestParam String email, Model model) {
        Personas usuario = personaService.findByEmail(email);
        model.addAttribute("usuario", usuario);
        return "html/update_per";
    }

    @GetMapping("/Nosotros") // ruta para enviar a nosotros (informacion sobre la pagina )
    public String Nosotros() {
        return "html/Nosotros";
    }

    @GetMapping("/datos_incorrectos") // ruta para cuando se equivoquen al iniciar sesion
    public String contraseña_incorrecta() {
        return "html/contraseña_incorrectauser";
    }

    @GetMapping("/Estadisticas") // ruta para llevarlo a estadisticas sobre lo que podemos mostrar
    public String estadistica() {
        return "html/Estadisticas";
    }

    @GetMapping("/Estadisticas/personas") // ruta para llevarlo a estadisticas sobre lo que podemos mostrar
    public String estadistica_persona() {
        return "html/Estadisticas_persona";
    }

    @GetMapping("/Contraseña-olvidada") // ruta para cuando quieren volver a recordar la contraseña
    public String olvidar() {
        return "html/contraseña_olvidada_per";
    }

    @GetMapping("/configuracion/persona") // ruta para configuracion de las personas
    public String configuracion() {
        return "html/Configuracion";
    }

}
