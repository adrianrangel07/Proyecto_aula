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
            session.setAttribute("empresa", empresa); // Guardar la empresa en la sesión
            model.addAttribute("nombreEmpresa", empresa.getNombreEmp());
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
}