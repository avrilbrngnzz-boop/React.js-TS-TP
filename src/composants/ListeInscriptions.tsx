import { Carte } from "./Carte";
import { Badge } from "./Badge";
import { Bouton } from "./Bouton";
import type { InscriptionEnregistree } from "../App";

export interface ListeInscriptionsProps {
  inscriptions: InscriptionEnregistree[];
  onSuppression?: (id: number) => void;
}

export function ListeInscriptions({ inscriptions, onSuppression }: ListeInscriptionsProps) {
  if (inscriptions.length === 0) {
    return <p>Aucune inscription pour le moment.</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inscriptions.map((i) => (
        <li key={i.id}>
          <Carte
            titre={i.prenom}
            sousTitre={i.email}
            actions={
              onSuppression ? (
                <Bouton
                  libelle="Supprimer"
                  variante="danger"
                  onClick={() => onSuppression(i.id)}
                />
              ) : undefined
            }
          >
            <Badge texte="CGV acceptées" />
          </Carte>
        </li>
      ))}
    </ul>
  );
}
