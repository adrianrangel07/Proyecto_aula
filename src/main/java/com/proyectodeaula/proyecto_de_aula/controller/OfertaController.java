package com.proyectodeaula.proyecto_de_aula.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.proyectodeaula.proyecto_de_aula.interfaceService.IofertaService;
import com.proyectodeaula.proyecto_de_aula.model.Ofertas;
import com.proyectodeaula.proyecto_de_aula.service.OfertaService;

import org.springframework.ui.Model;

@Controller
@RequestMapping
public class OfertaController {

	@Autowired
	private IofertaService offerService;

	@Autowired
	private OfertaService offerta;

	@GetMapping("/personas/pagina_principal")
	public String listar_ofertas_1(Model model) {
		List<Ofertas> ofertas = offerService.listar_ofertas();
		model.addAttribute("Ofertas", ofertas); 
		return "html/pagina_principal_personas";
	}

	@GetMapping("/")
	public String listar_ofertas(Model model) {
		List<Ofertas> Ofertas = offerService.listar_ofertas();
		model.addAttribute("Ofertas", Ofertas);
		return "html/pagina_principal";
	}

	@GetMapping("/buscar_ofertas")
	@ResponseBody
	public List<Ofertas> buscarOfertas(@RequestParam("termino") String termino) {
		return offerta.buscarOfertasPorTermino(termino);
	}
}
