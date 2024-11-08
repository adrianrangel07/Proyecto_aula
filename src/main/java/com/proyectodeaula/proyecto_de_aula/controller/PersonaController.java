package com.proyectodeaula.proyecto_de_aula.controller;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.proyectodeaula.proyecto_de_aula.service.PersonaService;

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
            model.addAttribute("nombreUsuario", persona.getnombre());

            // Guardar el email y el usuarioId en la sesión
            session.setAttribute("email", email);
            session.setAttribute("usuarioId", persona.getId()); // Guarda el usuarioId en la sesión como Long

            return "redirect:/personas/pagina_principal"; // Redirige a la página principal
        } else {
            model.addAttribute("error", "Credenciales incorrectas");
            return "redirect:/datos_incorrectos"; // Si las credenciales son incorrectas
        }
    }

    // Método para mostrar el perfil
    @GetMapping("/perfil/persona") // Ruta para ver el perfil
    public String myProfile(Model model, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email != null) {
            // Buscar la persona por email
            Personas persona = personaService.findByEmail(email);

            if (persona == null) {
                // Manejar el caso en que no se encuentra la persona
                model.addAttribute("error", "Persona no encontrada.");
                return "html/error"; // Redirigir a una página de error o similar
            }

            // Verificar si la foto no es nula
            if (persona.getFoto() != null) {
                String base64Image = Base64.getEncoder().encodeToString(persona.getFoto());
                model.addAttribute("base64Image", "data:image/png;base64," + base64Image); // Pasar la cadena Base64 al
                                                                                           // modelo
            } else {
                model.addAttribute("base64Image", ""); // Manejo para caso de imagen nula
            }

            // Agregar la persona al modelo
            model.addAttribute("persona", persona);
            return "html/Mi_perfil"; // Devuelve la vista del perfil
        } else {
            return "redirect:/login/personas"; // Redirigir si no hay sesión
        }
    }

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
