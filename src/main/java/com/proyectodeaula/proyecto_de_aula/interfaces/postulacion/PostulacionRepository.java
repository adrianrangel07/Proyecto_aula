package com.proyectodeaula.proyecto_de_aula.interfaces.postulacion;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectodeaula.proyecto_de_aula.model.Postulacion;

@Repository
public interface PostulacionRepository extends JpaRepository<Postulacion, Long> {

    Optional<Postulacion> findByOfertasIdAndPersonasId(Long ofertaId, Long usuarioId);
    List<Postulacion> findByPersonasId(Long personaId);
}
