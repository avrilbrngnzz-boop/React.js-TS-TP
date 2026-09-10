import type { ChangeEvent } from "react";

export interface ChampTexteProps {
  nom: string;                                     
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";            
  erreur?: string;
  placeholder?: string;
}

export function ChampTexte({
  nom,
  label,
  valeur,
  onChange,
  type = "text",
  erreur,
  placeholder,
    }: ChampTexteProps) {
        const idErreur = erreur ? `${nom}-erreur` : undefined;
        return (
            <div className="flex flex-col gap-1">
            <label htmlFor={nom} className="font-medium">
                {label}
            </label>
             <input
                id={nom}
                name={nom}
                type={type}
                value={valeur}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={!!erreur}
                aria-describedby={idErreur}
                className={`border rounded px-3 py-2 ${
                  erreur ? "border-red-500" : "border-gray-300"
                }`}/>
                {erreur && (
                    <p id={idErreur} className="text-red-600 text-sm">
                        {erreur}
                    </p>
                )}
            </div>
  );
}