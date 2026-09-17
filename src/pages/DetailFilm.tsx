import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { urlDetail, type FilmDetailOmdb } from "../lib/omdb";
import { useFavoris } from "../contextes/FavorisContext";

export function DetailFilm() {
  const { id } = useParams();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(
    id ? urlDetail(id) : null
  );

  const { dispatch } = useFavoris();

  if (!id) return <p>Identifiant manquant.</p>;
  if (chargement) return <p>Chargement…</p>;
  if (erreur) return <p className="text-red-600">{erreur}</p>;
  if (!donnees || donnees.Response === "False")
    return <p>Film introuvable.</p>;

  const filmPourFavoris = {
    imdbID: donnees.imdbID,
    Title: donnees.Title,
    Year: donnees.Year,
    Type: "movie",
    Poster: donnees.Poster,
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>{donnees.Title}</h1>
      <p>{donnees.Year}</p>
      <p>{donnees.Genre}</p>
      <p>{donnees.Runtime}</p>
      <p>{donnees.Plot}</p>

      <button onClick={() => dispatch({ type: "ajouter", film: filmPourFavoris })} className="bg-green-600 text-white p-2 rounded"> Ajouter aux favoris </button>
    </div>
  );
}
