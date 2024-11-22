package com.proyectodeaula.proyecto_de_aula.interfaces.Empresas;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyectodeaula.proyecto_de_aula.model.Empresas;

import java.util.Optional;

public interface Interfaz_Emp extends JpaRepository<Empresas, Integer>{
    Empresas findByEmailAndContraseña(String email, String contraseña);
    Empresas findByEmail(String email);
    Optional<Empresas> findById(Long empresaId);
}
