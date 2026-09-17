import { useEffect, useState } from "react";
import { urlRecherche, type FilmOmdb, type ReponseRecherche } from "../lib/omdb";
import { CarteFilm } from "./CarteFilm";
import { Link } from "react-router-dom";

export function RechercheFilms() {
  const [terme, setTerme] = useState("");
  const [films, setFilms] = useState<FilmOmdb[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!terme) {
      setFilms([]);
      setErreur(null);
      return;
    }
    const controleur = new AbortController();
    async function charger() {
      try {
        setChargement(true);
        setErreur(null);

        const url = urlRecherche(terme);
        const r = await fetch(url, { signal: controleur.signal });

        if (!r.ok) {
          throw new Error(`Erreur HTTP ${r.status}`);
        }

        const d: ReponseRecherche = await r.json();
        if (d.Response === "False") {
          setFilms([]);
          setErreur(d.Error ?? "Erreur inconnue");
          return;
        }
        setFilms(d.Search ?? []);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    }

    charger();
    return () => controleur.abort();
  }, [terme]);

  return (
    <div className="flex flex-col gap-4">
      <input type="text" value={terme} onChange={(e) => setTerme(e.target.value)} placeholder="Rechercher un film…" className="border p-2 rounded"/>

      {!terme && <p>Tapez un titre pour lancer la recherche.</p>}
      {chargement && <p>Chargement…</p>}
      {erreur && <p className="text-red-600">{erreur}</p>}
      {terme && !chargement && !erreur && films.length === 0 && (
        <p>Aucun film ne correspond à « {terme} ».</p>
      )}

      {films.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {films.map((film) => (
            <li key={film.imdbID}>
              <Link to={`/films/${film.imdbID}`}>
                <CarteFilm film={film} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
