package com.proyectodeaula.proyecto_de_aula.interfaces.Empresas;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyectodeaula.proyecto_de_aula.model.Empresas;

public interface Interfaz_Emp extends JpaRepository<Empresas, Integer>{
    Empresas findByEmailAndContraseña(String email, String contraseña);
}