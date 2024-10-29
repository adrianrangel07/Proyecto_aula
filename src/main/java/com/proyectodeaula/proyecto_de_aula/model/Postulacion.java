package com.proyectodeaula.proyecto_de_aula.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.sql.*;

@Entity
@Table(name = "Postulacion")
public class Postulacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "N_personas", columnDefinition = "Int", nullable = false)
    int N_personas;
    @Column(name = "Fecha__postulacion", columnDefinition = "date", nullable = false)
    Date fecha_postulacion;
    @Column(name = "Hora_postulacion", columnDefinition = "date", nullable = false)
    Date hora_postulacion;

    @OneToOne(mappedBy = "postulacion", cascade = CascadeType.ALL)
    private Ofertas ofertas;

    @OneToOne
    @JoinColumn(name = "personas_id", nullable = false) 
    private Personas personas;

    public Postulacion() {
    }

    // Getter and Setter
    public Postulacion(int id, int N_personas, Date fecha_postulacion, Date hora_postulacion) {
        this.id = id;
        this.N_personas = N_personas;
        this.fecha_postulacion = fecha_postulacion;
        this.hora_postulacion = hora_postulacion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getN_personas() {
        return N_personas;
    }

    public void setN_personas(int n_personas) {
        N_personas = n_personas;
    }

    public Date getFecha_postulacion() {
        return fecha_postulacion;
    }

    public void setFecha_postulacion(Date fecha_postulacion) {
        this.fecha_postulacion = fecha_postulacion;
    }

    public Date getHora_postulacion() {
        return hora_postulacion;
    }

    public void setHora_postulacion(Date hora_postulacion) {
        this.hora_postulacion = hora_postulacion;
    }

}
