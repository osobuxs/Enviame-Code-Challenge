import "./App.css";
import BarraBusqueda from "./components/barraBusqueda/barraBusqueda";
import NavbarMarvel from "./components/navbarMarvel/navbarMarvel";

function App() {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <div className="colorAf">
      <div className="App centre">
        <NavbarMarvel></NavbarMarvel>
        <BarraBusqueda></BarraBusqueda>
      </div>
    </div>
  );
}

export default App;
