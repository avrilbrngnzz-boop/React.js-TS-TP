import { useState } from "react";
import { FormulaireInscription } from "./composants/FormulaireInscription";
import { ListeInscriptions } from "./composants/ListeInscriptions";
import type { Inscription } from "./lib/inscription";

export type InscriptionEnregistree =
  Omit<Inscription, "motDePasse" | "confirmation"> & { id: number };

function App() {
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);
  const ajouterInscription = (donnees: Inscription) => {
    const nouvelle: InscriptionEnregistree = {
      id: Date.now(),
      prenom: donnees.prenom,
      email: donnees.email,
      cgv: donnees.cgv,
    };
    setInscriptions((liste) => [nouvelle, ...liste]);
  };
  const supprimerInscription = (id: number) => {
    setInscriptions((liste) => liste.filter((i) => i.id !== id));
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>
        <FormulaireInscription onInscription={ajouterInscription} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Inscrits ({inscriptions.length})
        </h2>
        <ListeInscriptions
          inscriptions={inscriptions}
          onSuppression={supprimerInscription}
        />
      </div>
    </main>
  );
}

export default App;
