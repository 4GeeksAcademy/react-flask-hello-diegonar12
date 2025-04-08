import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const MySpace = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.getMySpace();
        setUserData(data);
      } catch (error) {
        console.error("Error en MySpace:", error);
        setError("No tienes acceso a esta página. Por favor, inicia sesión.");
        navigate("/login");
      }
    };

    fetchData();
  }, [actions, navigate]);

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Mi Espacio</h1>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Información del Usuario</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Nombre de usuario:</strong> {userData.username}
            </li>
            <li className="list-group-item">
              <strong>Correo electrónico:</strong> {userData.email}
            </li>
            <li className="list-group-item">
              <strong>Estado:</strong> {userData.is_active ? "Activo" : "Inactivo"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MySpace;