package com.proyectodeaula.proyecto_de_aula.interfaces.Ofertas;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.proyectodeaula.proyecto_de_aula.model.Ofertas;

@Repository
public interface Interfaz_ofertas extends CrudRepository <Ofertas, Integer>{
    
}
