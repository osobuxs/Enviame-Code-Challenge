import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./barraBusqueda.css";
import CardList from "../cardList/cardList";

const BarraBusqueda = () => {
  const [busqueda, setBusqueda] = useState("");

  const onChange = async (e) => {
    e.persist();
    setBusqueda(e.target.value);
  };

  return (
    <><h1 className="titulo">Tambien puedes buscar tu heroe por nombre:</h1>
      <div className="margenBusqueda">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Escriba el nombre de heroe a buscar"
            className="margenBusqueda"
            aria-label="Buscar"
            value={busqueda}
            onChange={onChange}
          />
        </Form>
      </div>
      <CardList busqueda={busqueda}></CardList>
    </>
  );
};

export default BarraBusqueda;
