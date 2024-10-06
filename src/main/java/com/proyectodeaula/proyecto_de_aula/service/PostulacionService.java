package com.proyectodeaula.proyecto_de_aula.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.proyectodeaula.proyecto_de_aula.interfaceService.IpostulacionService;
import com.proyectodeaula.proyecto_de_aula.interfaces.postulacion.Interfaz_Postulacion;
import com.proyectodeaula.proyecto_de_aula.model.Postulacion;

@Service
public class PostulacionService implements IpostulacionService{

    @Autowired
    private Interfaz_Postulacion data;

    @Override
    public List<Postulacion> listar() {
        return (List<Postulacion>)data.findAll();
    }
    
    @Override
    public Optional<Postulacion> listarId(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'listarId'");
    }

    @Override
    public int save(Postulacion P) {
        int res= 0;
        Postulacion Pos = data.save(P);
        if(!Pos.equals(null)){
            res=1;
        }
        return res;
        
    }

    @Override
    public void delete(int Id) {
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
}