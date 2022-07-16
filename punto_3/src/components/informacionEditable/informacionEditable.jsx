import React, { useState } from "react";

function InformacionEditable({ originalValue }) {
  const [editando, setEditando] = useState(false);
  const [value, setValue] = useState(originalValue)
  const toggleEditar = () => {
    setEditando(!editando);
  };
  debugger
  return (
    <>
      {editando ? (
        <span>
          <input onChange={(e) => {
            setValue(e.target.value)
          }} 
          value={value}/>
          <button onClick={toggleEditar}>Guardar</button>
        </span>
      ) : (
        <span>
          {value}
          <button onClick={toggleEditar}>Editar</button>
        </span>
      )}
    </>
  );
}

export default InformacionEditable;
