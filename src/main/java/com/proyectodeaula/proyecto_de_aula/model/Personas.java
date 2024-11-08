package com.proyectodeaula.proyecto_de_aula.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Personas")
public class Personas {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "Nombre", columnDefinition = "VARCHAR(45)", nullable = false)
	private String nombre;

	@Column(name = "Apellido", columnDefinition = "VARCHAR(45)", nullable = false)
	private String apellido;

	@Column(name = "email", columnDefinition = "VARCHAR(45)", nullable = false)
	private String email;

	@Column(name = "contraseña", columnDefinition = "VARCHAR(255)", nullable = false)
	private String contraseña;

	@Column(name = "Cedula", columnDefinition = "VARCHAR(20)", nullable = false)
	private String identificacion;

	@Column(name = "tipo_identificacion", columnDefinition = "VARCHAR(20)", nullable = false)
	private String tipoIdentificacion;

	@Column(name = "fecha_nacimiento", columnDefinition = "date", nullable = false)
	private Date fecha_nacimiento;

	@Column(name = "genero", columnDefinition = "VARCHAR(20)", nullable = false)
	private String genero;

	@Lob
	@Column(name = "foto", columnDefinition = "LONGBLOB")
	private byte[] foto;

	@OneToOne
	@JoinColumn(name = "HvD_id")
	private HvD hvd;

	@OneToMany(mappedBy = "personas", cascade = CascadeType.ALL)
    private List<Postulacion> postulaciones;

	public Personas() {
	}


	public Personas(long id, String nombre, String apellido, String email, String contraseña, String identificacion,
			String tipoIdentificacion, Date fecha_nacimiento, String genero, byte[] foto, HvD hvd,
			List<Postulacion> postulaciones) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.contraseña = contraseña;
		this.identificacion = identificacion;
		this.tipoIdentificacion = tipoIdentificacion;
		this.fecha_nacimiento = fecha_nacimiento;
		this.genero = genero;
		this.foto = foto;
		this.hvd = hvd;
		this.postulaciones = postulaciones;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFecha_nacimiento() {
		return fecha_nacimiento;
	}

	public void setFecha_nacimiento(Date fecha_nacimiento) {
		this.fecha_nacimiento = fecha_nacimiento;
	}

	public String getnombre() {
		return nombre;
	}

	public void setnombre(String nombrePer) {
		this.nombre = nombrePer;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}

	public String getIdentificacion() {
		return identificacion;
	}

	public void setIdentificacion(String identificacion) {
		this.identificacion = identificacion;
	}

	public String getTipoIdentificacion() {
		return tipoIdentificacion;
	}

	public void setTipoIdentificacion(String tipoIdentificacion) {
		this.tipoIdentificacion = tipoIdentificacion;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public byte[] getFoto() {
		return foto;
	}

	public void setFoto(byte[] foto) {
		this.foto = foto;
	}

	public HvD getHvd() {
		return hvd;
	}

	public void setHvd(HvD hvd) {
		this.hvd = hvd;
	}

	public List<Postulacion> getPostulaciones() {
		return postulaciones;
	}

	public void setPostulaciones(List<Postulacion> postulaciones) {
		this.postulaciones = postulaciones;
	}

	// Método para agregar una postulación a la lista
    public void addPostulacion(Postulacion postulacion) {
        this.postulaciones.add(postulacion);
    }


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}

}
