package com.proyectodeaula.proyecto_de_aula.interfaces.postulacion;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectodeaula.proyecto_de_aula.model.Postulacion;


public interface Interfaz_Pos extends JpaRepository<Postulacion, Integer>{
    Postulacion findById(int id);
}
