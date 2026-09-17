import { useFavoris } from "../contextes/FavorisContext";
import { CarteFilm } from "../composants/CarteFilm";

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return <p>Aucun favori pour le moment.</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {favoris.map((film) => (
        <li key={film.imdbID} className="flex flex-col gap-2">
          <CarteFilm film={film} />

          <button onClick={() => dispatch({ type: "retirer", id: film.imdbID })} className="bg-red-600 text-white p-2 rounded">
            Retirer
          </button>
        </li>
      ))}
    </ul>
  );
}
