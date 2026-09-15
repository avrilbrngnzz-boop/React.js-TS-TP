import { Carte } from "./Carte";
import { Badge } from "./Badge";
import type { FilmOmdb } from "../lib/omdb";

export interface CarteFilmProps {
  film: FilmOmdb;
}

export function CarteFilm({ film }: CarteFilmProps) {
  const typeLibelle: Record<string, string> = {
    movie: "Film",
    series: "Série",
    game: "Jeu",
  };

  return (
    <Carte titre={film.Title} sousTitre={film.Year}>
      {film.Poster === "N/A" ? (
        <div className="bg-slate-200 text-center p-4 rounded">
          Pas d’affiche
        </div>
      ) : (
        <img
          src={film.Poster}
          alt={`Affiche de ${film.Title}`}
          className="w-full rounded"
        />
      )}

      <Badge texte={typeLibelle[film.Type] ?? film.Type} ton="info" />
    </Carte>
  );
}
