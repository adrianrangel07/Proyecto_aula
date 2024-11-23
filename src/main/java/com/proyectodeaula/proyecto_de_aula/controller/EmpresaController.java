package com.proyectodeaula.proyecto_de_aula.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyectodeaula.proyecto_de_aula.interfaceService.IofertaService;
import com.proyectodeaula.proyecto_de_aula.interfaces.Empresas.Interfaz_Emp;
import com.proyectodeaula.proyecto_de_aula.interfaces.Empresas.Interfaz_Empresa;
import com.proyectodeaula.proyecto_de_aula.model.Empresas;
import com.proyectodeaula.proyecto_de_aula.model.Ofertas;
import com.proyectodeaula.proyecto_de_aula.service.EmpresaService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping
public class EmpresaController {

    @Autowired
    private Interfaz_Emp u_emp;

    @Autowired
    private Interfaz_Empresa emp;

    @Autowired
    private IofertaService ofertaService;

    @Autowired
    private EmpresaService EmpresaService;

    // Método para mostrar el formulario de registro de la empresa
    @GetMapping("/Registrar/Empresa") // ruta para llevarlo a registrar empresa
    public String agregar(Model model) {
        Empresas empresa = new Empresas();
        model.addAttribute("empresa", empresa); // Añadir la empresa al modelo
        return "html/Registrar_empresa"; // Vista del formulario de registro de empresa
    }

    // Método para guardar una nueva empresa
    @PostMapping("/Registrar/Empresa") // aqui mismo se guarda las empresas
    public String save(@ModelAttribute("empresa") Empresas empresa, Model model) {
        // Guardar la empresa en la base de datos
        emp.save(empresa);

        // Redireccionar a la página de inicio de sesión de empresa
        return "redirect:/login/Empresa";
    }

    // Método para mostrar la página de inicio de sesión de empresa
    @GetMapping("/login/Empresa") // ruta para llevarlo a iniciar sesion las empresas
    public String login_empresa() {
        return "html/inicio_sesion_empresa"; // Vista del login de empresa
    }

    // Método para validar las credenciales del usuario y redirigir a la página de
    // inicio
    @PostMapping("/login/Empresa")
    public String iniciarSesionemp(HttpSession session, Model model, @RequestParam String email,
            @RequestParam String contraseña) {
        Empresas empresa = u_emp.findByEmailAndContraseña(email, contraseña);

        if (empresa != null) {

            model.addAttribute("nombreEmpresa", empresa.getNombreEmp());

            session.setAttribute("email", email);
            session.setAttribute("empresa", empresa);
            session.setAttribute("usuarioId", empresa.getId());

            return "redirect:/empresas/pagina_principal"; // Redirigir a la página de inicio de empresa
        } else {
            model.addAttribute("error", "Credenciales incorrectas o empresa no encontrada");
            return "redirect:/datos_incorrectaemp"; // Vista de error
        }
    }

    @GetMapping("/empresas/pagina_principal")
    public String mostrarPaginaPrincipal(Model model, HttpSession session) {
        Empresas empresa = (Empresas) session.getAttribute("empresa");
        if (empresa != null) {
            List<Ofertas> ofertas = ofertaService.listarOfertasPorEmpresa(empresa);
            model.addAttribute("Ofertas", ofertas); // Asegúrate de que el nombre sea "Ofertas"
            model.addAttribute("nombreEmpresa", empresa.getNombreEmp());
            return "html/pagina_principal_empresa"; // Asegúrate de que esta vista es correcta
        } else {
            return "redirect:/login/Empresa";
        }
    }

    @GetMapping("/datos_incorrectaemp") // ruta para cuando coloque mal los datos
    public String contraseña_incorrecta() {
        return "html/contraseña_incorrectaemp";
    }

    @GetMapping("/empresas/oferta") // para ver las ofertas postuladas
    public String oferta() {
        return "html/Oferta";
    }

    @GetMapping("/Contraseña-olvidada-empresa") // cuando quieren recuperar la contraseña de la cuenta de empresa
    public String olvidar_emp() {
        return "html/contraseña_olvidada_emp";
    }

    @GetMapping("/perfil/empresa") //
    public String myProfile(Model model, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email != null) {
            Empresas empresa = EmpresaService.findByEmail(email);

            if (empresa == null) {
                model.addAttribute("error", "Persona no encontrada.");
                return "html/error";
            }

            // Agregar la persona al modelo
            model.addAttribute("empresa", empresa);
            return "html/Mi_perfilemp"; // Devuelve la vista del perfil
        } else {
            return "redirect:html/error";
        }
    }

    // metodo para actulizar perfil de empresa
    @PostMapping("/actualizar/empresa")
    public String actualizarPerfil(@RequestParam String nombreEmp, @RequestParam String direccion,
            @RequestParam String contraseña, @RequestParam String razon_social, HttpSession session, Model model) {
        try {
            String email = (String) session.getAttribute("email");
            if (email == null) {
                model.addAttribute("error", "Sesión expirada, por favor inicie sesión de nuevo.");
                return "redirect:/login/personas"; // Redirigir si no hay sesión
            }

            // Buscar persona por email
            Empresas empresa = EmpresaService.findByEmail(email);
            if (empresa == null) {
                model.addAttribute("error", "Usuario no encontrado.");
                return "html/error"; // Redirigir si no se encuentra la persona
            }

            // Actualizar los campos de la persona solo si no están vacíos
            if (nombreEmp != null && !nombreEmp.isEmpty()) {
                empresa.setNombreEmp(nombreEmp);
            }
            if (direccion != null && !direccion.isEmpty()) {
                empresa.setDireccion(direccion);
            }
            if (contraseña != null && !contraseña.isEmpty()) {
                empresa.setContraseña(contraseña);
            }
            if (email != null && !email.isEmpty()) {
                empresa.setEmail(email); // Actualizar email
            }
            if (razon_social != null && !razon_social.isEmpty()) {
                empresa.setRazon_social(razon_social);
            }

            // Guardar los cambios
            EmpresaService.actualizarPerfil(empresa);

            model.addAttribute("success", "Perfil actualizado con éxito");
            return "redirect:/perfil/empresa"; // Redirige de vuelta a la vista del perfil
        } catch (Exception e) {
            model.addAttribute("error", "Error al actualizar el perfil: " + e.getMessage());
            e.printStackTrace(); // Imprimir el stack trace para depuración
            return "html/error"; // Mostrar una página de error si algo falla
        }
    }

    @GetMapping("/Estadisticas/empresas")
    public String estadisticaempresa() {
        return "html/Estadisticas_empresas";
    }
}