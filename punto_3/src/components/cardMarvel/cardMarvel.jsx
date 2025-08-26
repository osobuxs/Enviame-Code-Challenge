// src/components/cardMarvel/cardMarvel.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import dateFormatter from "../../utils/formatter";
import InformacionEditable from "../informacionEditable/informacionEditable";
import "./cardMarvel.css";

function CardMarvel({ per }) {
  let linkImg;
  if (per.thumbnail && per.thumbnail.path && per.thumbnail.extension) {
    linkImg = `${per.thumbnail.path}.${per.thumbnail.extension}`;
  } else if (per.src) {
    linkImg = `${per.src}`;
  } else {
    linkImg = "https://via.placeholder.com/300x300?text=Sin+Imagen";
  }

  // 🆕 extras mapeados desde la API (o N/D para mock)
  const race = per?._extras?.race || "N/D";
  const height = per?._extras?.height || "N/D";
  const weight = per?._extras?.weight || "N/D";

  return (
    <React.Fragment key={per.id}>
      <div className="centro" style={{ width: "19rem" }}>
        <div>
          <article>
            <Card.Img variant="top" src={linkImg} alt={per.name || "Heroe"} />
          </article>
          <article>
            <Card.Body>
              <div className="editInfoHeroe">
                <Card.Title className="titulo">
                  <InformacionEditable originalValue={per.name || ""} />
                </Card.Title>
              </div>

              <Card.Text className="descripcion">
                <InformacionEditable originalValue={per.description || ""} />
              </Card.Text>

              {/* 🆕 Datos extra */}
              <div className="stats">
                <div>
                  <strong>Altura:</strong> {height}
                </div>
                <div>
                  <strong>Peso:</strong> {weight}
                </div>
                <div>
                  <strong>Raza:</strong> {race}
                </div>
              </div>

              {per.modified && (
                <div className="modified">
                  Modificado: {dateFormatter(new Date(per.modified))}
                </div>
              )}
            </Card.Body>
          </article>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CardMarvel;
