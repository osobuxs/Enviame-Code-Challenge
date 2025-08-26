// src/components/barraBusqueda/barraBusqueda.jsx
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./barraBusqueda.css";
import CardList from "../cardList/cardList";

const BarraBusqueda = () => {
  const [busqueda, setBusqueda] = useState("");

  // Comentario: no hace falta e.persist() en react 18+
  const onChange = (e) => setBusqueda(e.target.value);

  return (
    <>
      <h1 className="titulo">También podés buscar tu héroe por nombre:</h1>
      <div className="margenBusqueda">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Escribí el nombre del héroe a buscar"
            className="margenBusqueda"
            aria-label="Buscar"
            value={busqueda}
            onChange={onChange}
          />
        </Form>
      </div>
      <CardList busqueda={busqueda} />
    </>
  );
};

export default BarraBusqueda;
