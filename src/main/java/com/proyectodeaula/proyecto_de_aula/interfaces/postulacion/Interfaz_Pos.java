package com.proyectodeaula.proyecto_de_aula.interfaces.postulacion;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectodeaula.proyecto_de_aula.model.Ofertas;
import com.proyectodeaula.proyecto_de_aula.model.Personas;
import com.proyectodeaula.proyecto_de_aula.model.Postulacion;


public interface Interfaz_Pos extends JpaRepository<Postulacion, Long>{
    Postulacion findById(int id);
    Postulacion findByPersonas(Personas persona);
    public Postulacion findByPersonasAndOfertas(Personas persona, Ofertas oferta);

}


