import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChampTexte } from "./ChampTexte";
import { Bouton } from "./Bouton";
import {
  valeursInitiales,
  type Inscription,
  type Erreurs,
  valider,
} from "../lib/inscription";

export interface FormulaireInscriptionProps {
  onInscription: (donnees: Inscription) => void;
}

export function FormulaireInscription({ onInscription }: FormulaireInscriptionProps) {
  const [donnees, setDonnees] = useState<Inscription>(valeursInitiales);

  const [erreurs, setErreurs] = useState<Erreurs>({});

  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const valeurFinale = type === "checkbox" ? checked : value;

    setDonnees((d) => ({
      ...d,
      [name]: valeurFinale,
    }));
  };

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trouvees = valider(donnees);
    setErreurs(trouvees);

    if (Object.keys(trouvees).length > 0) return;

    setEnvoiEnCours(true);

    window.setTimeout(() => {
      onInscription(donnees);
      setDonnees(valeursInitiales);
      setEnvoiEnCours(false);
    }, 600);
  };

  return (
    <form onSubmit={gererEnvoi} noValidate className="space-y-4">
      <ChampTexte
        nom="prenom"
        label="Prénom"
        valeur={donnees.prenom}
        onChange={gererSaisie}
        erreur={erreurs.prenom}
      />

      <ChampTexte
        nom="email"
        label="Email"
        type="email"
        valeur={donnees.email}
        onChange={gererSaisie}
        erreur={erreurs.email}
      />

      <ChampTexte
        nom="motDePasse"
        label="Mot de passe"
        type="password"
        valeur={donnees.motDePasse}
        onChange={gererSaisie}
        erreur={erreurs.motDePasse}
      />

      <ChampTexte
        nom="confirmation"
        label="Confirmation"
        type="password"
        valeur={donnees.confirmation}
        onChange={gererSaisie}
        erreur={erreurs.confirmation}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="cgv" className="font-medium">
          J’accepte les CGV
        </label>

        <input
          id="cgv"
          name="cgv"
          type="checkbox"
          checked={donnees.cgv}
          onChange={gererSaisie}
          aria-invalid={!!erreurs.cgv}
          aria-describedby={erreurs.cgv ? "cgv-erreur" : undefined}
          className={`w-4 h-4 ${erreurs.cgv ? "outline outline-red-500" : ""}`}
        />

        {erreurs.cgv && (
          <p id="cgv-erreur" className="text-red-600 text-sm">
            {erreurs.cgv}
          </p>
        )}
      </div>

      <Bouton
        libelle={envoiEnCours ? "Envoi en cours…" : "S’inscrire"}
        type="submit"
        desactive={envoiEnCours}
        variante="primaire"
      />
    </form>
  );
}
