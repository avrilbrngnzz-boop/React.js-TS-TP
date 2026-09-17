import { useEffect, useState } from "react";

export function useFetch<T>(url: string | null) {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const urlSafe = url as string; 
    const controleur = new AbortController();

    async function charger() {
      try {
        setChargement(true);
        setErreur(null);
        const r = await fetch(urlSafe, { signal: controleur.signal });
        if (!r.ok) throw new Error(`Erreur HTTP ${r.status}`);
        const json = await r.json();
        setDonnees(json);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    }

    charger();
    return () => controleur.abort();
  }, [url]);

  return { donnees, chargement, erreur };
}
