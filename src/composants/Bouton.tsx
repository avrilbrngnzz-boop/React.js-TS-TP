export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton;   // "primaire" par défaut
  desactive?: boolean;         // false par défaut
  onClick?: () => void;
}

const styles: Record<VarianteBouton, string> = {
  primaire: "bg-blue-500 text-white",
  secondaire: "bg-gray-300 text-black",
  danger: "bg-red-500 text-white",
};

export function Bouton({libelle, variante = "primaire", desactive = false, onClick,}: BoutonProps) {
  return (
    <button
      className={`px-3 py-2 rounded ${styles[variante]} ${
        desactive ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={desactive}
      onClick={onClick}
    >
      {libelle}
    </button>
  );
}