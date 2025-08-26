// src/components/cardList/cardList.jsx
import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./cardList.css";
import CardMarvel from "../cardMarvel/cardMarvel";
import { fetchCharacters } from "../../helpers/marvel/api";

// Genera URL de imagen con Pollinations (gratis, sin API key)
function buildHeroImageURL(name, description) {
  const prompt = `Héroe estilo Marvel, cuerpo entero, cómic, iluminación dramática, 4k. Nombre: ${name}. Descripción: ${description}.`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=512&height=512&nologo=true`;
  return url;
}

// Pre-carga de imagen para cerrar el modal cuando esté lista
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
}

function CardList({ busqueda }) {
  // Resultados + paginación
  const [personajes, setPersonajes] = useState([]);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Form “Crear tu Héroe”
  const [nuevoHeroe, setNuevoHeroe] = useState({ name: "", description: "" });
  const nameOk = nuevoHeroe.name.trim().length > 0;
  const descOk = nuevoHeroe.description.trim().length > 0;
  const canCreate = nameOk && descOk;

  // Modal de generación
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  // Botón volver arriba
  const [showBackTop, setShowBackTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      // Mostrar botón al bajar ~300px
      setShowBackTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // estado inicial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBackTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const crearHeroe = async () => {
    if (!canCreate) return;
    setGenError("");
    setGenerating(true);

    try {
      const imgUrl = buildHeroImageURL(
        nuevoHeroe.name.trim(),
        nuevoHeroe.description.trim()
      );
      await preloadImage(imgUrl);

      const mock = {
        id: `mock-${Date.now()}`,
        name: nuevoHeroe.name.trim(),
        description: nuevoHeroe.description.trim(),
        src: imgUrl, // usamos per.src en la Card
        thumbnail: undefined, // fuerza uso de src
        modified: new Date().toISOString(),
        _extras: {
          race: "N/D",
          height: "N/D",
          weight: "N/D",
        },
      };

      setPersonajes((prev) => [mock, ...prev]);
      setNuevoHeroe({ name: "", description: "" });
    } catch (e) {
      console.error("Error generando imagen:", e);
      setGenError("No se pudo generar la imagen. Intentá de nuevo.");
    } finally {
      setGenerating(false);
    }
  };

  // Carga inicial / cambio de búsqueda
  const loadInitial = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCharacters({
        limit,
        offset: 0,
        nameStartsWith: busqueda,
      });
      setPersonajes(data.results || []);
      setTotal(data.total || 0);
      setOffset(data.count || 0); // siguiente offset
    } catch (e) {
      console.error("Error fetch initial:", e);
      setPersonajes([]);
      setTotal(0);
      setOffset(0);
    } finally {
      setLoading(false);
    }
  }, [busqueda, limit]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  // Carga incremental para scroll infinito (window)
  const handleInfiniteScroll = async () => {
    if (personajes.length >= total) return;
    try {
      const data = await fetchCharacters({
        limit,
        offset,
        nameStartsWith: busqueda,
      });
      setPersonajes((prev) => [...prev, ...(data.results || [])]);
      setOffset((prev) => prev + (data.count || 0));
      setTotal((prev) => data.total ?? prev);
    } catch (e) {
      console.error("Error fetch more:", e);
    }
  };

  const noResults = !loading && total === 0;

  return (
    <div className="animar">
      {/* Modal “Generando imagen…” */}
      {generating && (
        <div className="overlay">
          <div className="modalBox">
            <div className="spinner" />
            <p className="modalText">Generando imagen…</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="titulo">Crea tu propio Héroe:</h3>

        <div className="crearHeroe">
          <input
            type="text"
            placeholder="Nombre (obligatorio)"
            value={nuevoHeroe.name}
            onChange={(e) =>
              setNuevoHeroe({ ...nuevoHeroe, name: e.target.value })
            }
          />
          <textarea
            placeholder="Descripción (obligatoria)"
            rows={3}
            value={nuevoHeroe.description}
            onChange={(e) =>
              setNuevoHeroe({ ...nuevoHeroe, description: e.target.value })
            }
          />
        </div>

        <button
          onClick={crearHeroe}
          className="botonCrearHeroe"
          disabled={!canCreate || generating}
          title={!canCreate ? "Completá nombre y descripción" : "Crear Héroe"}
        >
          Crear Héroe (con imagen generada)
        </button>

        {genError && <div className="errorMsg">{genError}</div>}
      </div>

      {/* Scroll infinito usando el window (scroll global de la app) */}
      <InfiniteScroll
        dataLength={personajes.length}
        next={handleInfiniteScroll}
        hasMore={personajes.length < total}
        loader={<h4 className="loaderText">Cargando…</h4>}
        scrollThreshold={0.9} // carga cuando estás cerca del fondo
        style={{ overflow: "visible" }}
      >
        {loading && personajes.length === 0 ? (
          <h4 className="loaderText">Cargando…</h4>
        ) : noResults ? (
          <div className="emptyState">
            No existen resultados con lo que buscás
            {busqueda ? `: “${busqueda}”` : ""}.
          </div>
        ) : (
          personajes.map((per) => <CardMarvel per={per} key={per.id} />)
        )}
      </InfiniteScroll>

      {/* Botón “Volver arriba” (solo visible al bajar) */}
      {showBackTop && (
        <button
          className="backTopBtn"
          onClick={handleBackTop}
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          ▲
        </button>
      )}
    </div>
  );
}

export default CardList;
