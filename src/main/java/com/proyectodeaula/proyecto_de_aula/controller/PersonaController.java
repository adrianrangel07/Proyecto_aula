package com.proyectodeaula.proyecto_de_aula.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyectodeaula.proyecto_de_aula.interfaces.Personas.Interfaz_Per;
import com.proyectodeaula.proyecto_de_aula.interfaces.Personas.Interfaz_Persona;
import com.proyectodeaula.proyecto_de_aula.model.Personas;

@Controller
@RequestMapping
public class PersonaController {

    @Autowired
    private Interfaz_Per user;

    @Autowired
    private Interfaz_Persona per;

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
        return "redirect:/login/personas";
    }

    // Método para mostrar la página de inicio de sesión
    @GetMapping("/login/personas") // recuerda colocar la ruta para iniciar sesion
    public String iniciar_sesion() {
        return "html/inicio_sesion_persona"; // Vista de iniciar sesion personas
    }

    // Método para validar las credenciales del usuario
    @PostMapping("/login/personas") // con esto se valida si esta bien o mal la contraseña
    public String iniciarSesion(Model model, @RequestParam String email, @RequestParam String contraseña) {

        // Buscar persona por email y contraseña
        Personas persona = user.findByEmailAndContraseña(email, contraseña); // metodo de busqueda de persona (correo y
                                                                             // contraseña)

        // Validar si la persona existe
        if (persona != null) {
            model.addAttribute("nombreUsuario", persona.getnombre()); // si es correcto
            return "redirect:/login_inicio"; // Redirigir a la ruta de inicio de persona registrada
        } else {
            model.addAttribute("error", "Credenciales incorrectas"); // si hay algun error
            return "redirect:/datos_incorrectos"; // Vista de error
        }
    }

    @GetMapping("/login_inicio")
    public String pagina_principal() {
        return "redirect:/personas/pagina_principal";
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

    @GetMapping("/Contraseña-olvidada") // ruta para cuando quieren volver a recordar la contraseña
    public String olvidar() {
        return "html/contraseña_olvidada_per";
    }

    @GetMapping("/perfil/persona") // ruta para el perfil de las personas, cuando quieran dirigirse a ella
    public String Myperfil() {
        return "html/Mi_perfil";
    }

    @GetMapping("/configuracion/persona") // ruta para configuracion de las personas
    public String configuracion() {
        return "html/Configuracion";
    }

}