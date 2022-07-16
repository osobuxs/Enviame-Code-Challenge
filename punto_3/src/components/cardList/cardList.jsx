import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import "./cardList.css";
import InfiniteScroll from "react-infinite-scroll-component";
import CardMarvel from "../cardMarvel/cardMarvel";

function CardList({ busqueda }) {
  const [personajes, setPersonajes] = useState([]);
  const [limit, setLimit] = useState(5);
  const [nuevoHeroe, setNuevoHeroe] = useState({});

  const crearHeroe = () => {
    let p2 = [nuevoHeroe, ...personajes];
    setPersonajes(p2);
    console.log(nuevoHeroe);
  };

  const handleInfiniteScroll = () => {
    const newLimit = limit + 5;
    getData(newLimit);
    setLimit(newLimit);
  };

  const getData = useCallback(
    (limit = 5) => {
      axios
        .get("https://gateway.marvel.com/v1/public/characters", {
          params: {
            ts: 3,
            apikey: process.env.REACT_APP_API_KEY,
            hash: process.env.REACT_APP_API_HASH,
            offset: 0,
            limit: limit,
            ...(busqueda ? { nameStartsWith: busqueda } : {}),
          },
        })
        .then((res) => {
          setPersonajes(res.data.data.results);
        })
        .catch((error) => console.log(error));
    },
    [busqueda]
  );
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="animar">
      <InfiniteScroll
        dataLength={personajes.length}
        next={handleInfiniteScroll}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div>
          <h3 className="titulo">Crea tu propio Heroe:</h3>
          <div className="crearHeroe">
            {" "}
            <input
              type="text"
              placeholder="nombre..."
              onChange={(e) => {
                setNuevoHeroe({ ...nuevoHeroe, name: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="descripcion..."
              onChange={(e) => {
                setNuevoHeroe({ ...nuevoHeroe, description: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="url de imagen..."
              onChange={(e) => {
                setNuevoHeroe({ ...nuevoHeroe, src: e.target.value });
              }}
            />
          </div>

          <button onClick={crearHeroe} className="botonCrearHeroe">Crear Heroe</button>
        </div>
        {personajes.map((per) => (
          <CardMarvel per={per} key={per.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default CardList;
