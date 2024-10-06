package com.proyectodeaula.proyecto_de_aula.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectodeaula.proyecto_de_aula.interfaceService.IofertaService;
import com.proyectodeaula.proyecto_de_aula.interfaces.Ofertas.Interfaz_ofertas;
import com.proyectodeaula.proyecto_de_aula.interfaces.Ofertas.Interfaz_ofertas_buscar;
import com.proyectodeaula.proyecto_de_aula.model.Ofertas;

@Service
public class OfertaService implements IofertaService{

    @Autowired
    private Interfaz_ofertas oferr;

    @Autowired
    private Interfaz_ofertas_buscar offer_buscar;

    @Override
    public List<Ofertas> listar_ofertas() {
       return (List<Ofertas>)oferr.findAll();
    }

    @Override
    public Optional<Ofertas> listarId(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'listarId'");
    }

    @Override
    public int save(Ofertas O) {
        int res= 0;
        Ofertas Usu = oferr.save(O);
        if(!Usu.equals(null)){
            res=1;
        }
        return res;
        
    }

    @Override
    public void delete(int Id) {
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    public List<Ofertas> buscarOfertasPorTermino(String termino) {
        return offer_buscar.findByTituloPuestoContaining(termino);
    }

}
