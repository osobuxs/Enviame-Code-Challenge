// src/App.jsx (solo ejemplo; no es obligatorio tocarlo)
import "./App.css";
import BarraBusqueda from "./components/barraBusqueda/barraBusqueda";
import NavbarMarvel from "./components/navbarMarvel/navbarMarvel";

function App() {
  console.log("PUBLIC:", process.env.REACT_APP_MARVEL_PUBLIC_KEY);
  return (
    <div className="colorAf">
      <div className="App centre">
        <NavbarMarvel />
        <BarraBusqueda />
      </div>
    </div>
  );
}
export default App;
