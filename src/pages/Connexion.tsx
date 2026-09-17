import { useState } from "react";
import { useAuth } from "../contextes/AuthContext";

export function Connexion() {
  const { connecter } = useAuth();
  const [pseudo, setPseudo] = useState("");

  function valider() {
    if (pseudo.trim() !== "") {
      connecter(pseudo.trim());
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Connexion</h1>
      <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Votre pseudo" className="border p-2 rounded"/>
      <button onClick={valider} className="bg-blue-600 text-white p-2 rounded">Se connecter</button>
    </div>
  );
}
