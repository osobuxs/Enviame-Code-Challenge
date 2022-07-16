import React from "react";
import Card from "react-bootstrap/Card";
import dateFormatter from "../../utils/formatter";
import InformacionEditable from "../informacionEditable/informacionEditable";
import './cardMarvel.css';

function CardMarvel({ per }) {
  let linkImg;
  if (per.thumbnail !== undefined) {
    linkImg = `${per.thumbnail.path}.${per.thumbnail.extension}`;
  } else {
    linkImg = `${per.src}`;
  }
  return (
    <React.Fragment key={per.id}>
      <div className="centro" style={{ width: "19rem" }}>
        <div>
          <article className="">
            <Card.Img variant="top" src={`${linkImg}`} />
          </article>
          <article className="">
            <Card.Body>
              <div className="editInfoHeroe">
                <Card.Title className="titulo">
                  <InformacionEditable originalValue={per.name} />
                </Card.Title>
              </div>

              <Card.Text className="descripcion">
                <InformacionEditable originalValue={per.description} />
              </Card.Text>
              {per.modified && (
                <div>Modificado: {dateFormatter(new Date(per.modified))}</div>
              )}
            </Card.Body>
          </article>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CardMarvel;
