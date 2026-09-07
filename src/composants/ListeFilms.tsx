import type { film, statut } from "../lib/utils";
import { Carte } from "./Carte";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";

export interface ListeFilmsProps {
  films: film[];
  messageVide?: string;
  onSelection?: (film: film) => void;
}

const statutInfo: Record<
  statut,
  { texte: string; ton: "neutre" | "succes" | "info" | "attention" }
> = {
  vu: { texte: "Déjà vu", ton: "succes" },
  a_voir: { texte: "À voir", ton: "info" },
  abandonne: { texte: "Abandonné", ton: "neutre" },
};

export function ListeFilms({
  films,
  messageVide = "Aucun film trouvé.",
  onSelection,
}: ListeFilmsProps) {
  if (films.length === 0) {
    return <p className="text-center text-gray-600">{messageVide}</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {films.map((film) => {
        const info = statutInfo[film.statut];

        return (
          <li key={film.id}>
            <Carte
              titre={film.titre}
              sousTitre={`${film.annee} — ${film.note}/10`}
              actions={
                onSelection ? (
                  <Bouton
                    libelle="Détails"
                    onClick={() => onSelection(film)}
                  />
                ) : undefined
              }
            >
              <div className="flex gap-2 flex-wrap">
                <Badge texte={info.texte} ton={info.ton} />

                {film.genres.map((genre) => (
                  <Badge key={genre} texte={genre} />
                ))}
              </div>
            </Carte>
          </li>
        );
      })}
    </ul>
  );
}
