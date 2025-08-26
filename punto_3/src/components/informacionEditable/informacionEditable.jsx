// src/components/informacionEditable/informacionEditable.jsx
import React, { useState } from "react";

function InformacionEditable({ originalValue }) {
  const [editando, setEditando] = useState(false);
  const [value, setValue] = useState(originalValue || "");

  const toggleEditar = () => setEditando((v) => !v);

  return (
    <>
      {editando ? (
        <span>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ maxWidth: 260 }}
          />
          <button onClick={toggleEditar}>Guardar</button>
        </span>
      ) : (
        <span>
          {value}
          <button onClick={toggleEditar} style={{ marginLeft: 8 }}>
            Editar
          </button>
        </span>
      )}
    </>
  );
}

export default InformacionEditable;
