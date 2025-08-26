// src/helpers/marvel/api.js
// Hotfix: dataset público mientras Marvel API devuelve InvalidCredentials.
// Mantengo interfaz fetchCharacters({limit, offset, nameStartsWith})
import axios from "axios";

const DATA_URL = "https://akabab.github.io/superhero-api/api/all.json";

let CACHE = null;

// 🔧 helper: intenta tomar el 2do valor "cm"/"kg" si existe
function pickUnit(arr = []) {
  if (!Array.isArray(arr)) return "";
  if (arr[1]) return arr[1]; // ej: "203 cm" o "441 kg"
  if (arr[0]) return arr[0]; // fallback
  return "";
}

function mapToMarvelLike(hero) {
  const desc =
    hero?.biography?.fullName ||
    hero?.biography?.publisher ||
    hero?.biography?.alignment ||
    "";
  const imageUrl = hero?.images?.lg || hero?.images?.md || hero?.images?.sm;

  // Marvel usa path + extension; lo simulo para no tocar CardMarvel
  let path = "";
  let extension = "jpg";
  if (imageUrl) {
    const lastDot = imageUrl.lastIndexOf(".");
    if (lastDot > -1) {
      path = imageUrl.slice(0, lastDot);
      extension = imageUrl.slice(lastDot + 1);
    } else {
      path = imageUrl;
    }
  }

  // 🆕 Campos extra para la card
  const race = hero?.appearance?.race || "";
  const height = pickUnit(hero?.appearance?.height);
  const weight = pickUnit(hero?.appearance?.weight);

  return {
    id: hero?.id,
    name: hero?.name || "",
    description: desc || "",
    modified: null,
    thumbnail: imageUrl
      ? { path, extension }
      : {
          path: "https://via.placeholder.com/300x300?text=Sin+Imagen",
          extension: "jpg",
        },
    // extras
    _extras: {
      race,
      height,
      weight,
    },
  };
}

export async function fetchCharacters({
  limit = 5,
  offset = 0,
  nameStartsWith = "",
}) {
  if (!CACHE) {
    const { data } = await axios.get(DATA_URL, { timeout: 20000 });
    CACHE = Array.isArray(data) ? data : [];
  }

  let filtered = CACHE;
  const q = (nameStartsWith || "").trim().toLowerCase();
  if (q) {
    filtered = filtered.filter((h) =>
      (h?.name || "").toLowerCase().startsWith(q)
    );
  }

  const total = filtered.length;
  const slice = filtered.slice(offset, offset + limit).map(mapToMarvelLike);

  return {
    results: slice,
    total,
    count: slice.length,
    offset,
  };
}
