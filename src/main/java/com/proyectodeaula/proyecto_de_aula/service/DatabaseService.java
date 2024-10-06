package com.proyectodeaula.proyecto_de_aula.service;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {

    public boolean connectToDatabase() {
        String url = "jdbc:mysql://localhost:3306/proyecto_aula";
        String user = "root";
        String password = "root";

        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            return true; // Conexión exitosa
        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos: " + e.getMessage());
            return false; // Error al conectar
        }
    }
}


