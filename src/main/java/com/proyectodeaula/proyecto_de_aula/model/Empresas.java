package com.proyectodeaula.proyecto_de_aula.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;

@Entity
@Table(name = "Empresas")
public class Empresas {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Id autoincrementable
	int id;
	// columna de nombre de la empresa
	@Column(name = "NombreEmp", columnDefinition = "varchar(45)", nullable = false)
	String nombreEmp;
	// Columna de direccion de la empresa
	@Column(name = "Direccion", columnDefinition = "varchar(45)", nullable = false)
	String direccion;
	// Columna de Razon_social de la empresa
	@Column(name = "Razon_social", columnDefinition = "varchar(45)", nullable = false)
	String razon_social;
	// Columna de nit de la empresa
	@Column(name = "nit", columnDefinition = "int", nullable = false)
	int nit;
	// Columna correo electronico para iniciar sesion la empresa
	@Column(name = "email", columnDefinition = "VARCHAR(45)", nullable = false)
	String email;
	// Columna contraseña para iniciar sesion la empresa
	@Column(name = "contraseña", columnDefinition = "VARCHAR(45)", nullable = false)
	String contraseña;

	public Empresas() {
	}

	public Empresas(int id, String nombreEmp, String direccion, String razon_social, int nit, String email,
			String contraseña) {
		this.id = id;
		this.nombreEmp = nombreEmp;
		this.direccion = direccion;
		this.razon_social = razon_social;
		this.nit = nit;
		this.email = email;
		this.contraseña = contraseña;
	}

	// Getter and Setter
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombreEmp() {
		return nombreEmp;
	}

	public void setNombreEmp(String nombreEmp) {
		this.nombreEmp = nombreEmp;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getRazon_social() {
		return razon_social;
	}

	public void setRazon_social(String razon_social) {
		this.razon_social = razon_social;
	}

	public int getnit() {
		return nit;
	}

	public void setnit(int nit) {
		this.nit = nit;
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

}