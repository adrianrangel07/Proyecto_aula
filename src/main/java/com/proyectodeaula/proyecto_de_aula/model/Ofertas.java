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

@Entity
@Table(name="Ofertas")
public class Ofertas {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name = "Titulo_puesto", columnDefinition = "Varchar(45)", nullable = false)
    String titulo_puesto;

    @Column(name = "Descripcion", columnDefinition = "Varchar(255)", nullable = false)
    String descripcion;

    @Column(name = "Duracion", columnDefinition = "Varchar(45)", nullable = false)
    String duracion;

    @Column(name = "Tipo_empleo", columnDefinition = "Varchar(45)", nullable = false)
    String tipo_empleo;

    @Column(name = "Salario", columnDefinition = "int", nullable = false)
    int salario;

    @Column(name = "Periodo", columnDefinition = "Varchar(45)", nullable = false)
    String periodo;

    @Column(name = "modalidad", columnDefinition = "varchar(45)", nullable = false)
    String modalidad;

    @OneToOne(mappedBy = "Ofertas", cascade = CascadeType.ALL)
    private Empresas empresa;

    @OneToOne
    @JoinColumn(name = "postulacion_id") 
    private Postulacion postulacion;
    
    public Ofertas(){
    }

    public Ofertas(int id, String titulo_puesto, String descripcion, String duracion, String tipo_empleo, int salario,
            String periodo, String modalidad) {
        this.id = id;
        this.titulo_puesto = titulo_puesto;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.tipo_empleo = tipo_empleo;
        this.salario = salario;
        this.periodo = periodo;
        this.modalidad = modalidad;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo_puesto() {
        return titulo_puesto;
    }

    public void setTitulo_puesto(String titulo_puesto) {
        this.titulo_puesto = titulo_puesto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getTipo_empleo() {
        return tipo_empleo;
    }

    public void setTipo_empleo(String tipo_empleo) {
        this.tipo_empleo = tipo_empleo;
    }

    public int getSalario() {
        return salario;
    }

    public void setSalario(int salario) {
        this.salario = salario;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setModalidad(String modalidad) {
        this.modalidad = modalidad;
    }

}
