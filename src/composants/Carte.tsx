import type { ReactNode } from "react";

export interface CarteProps {
  titre: string;
  sousTitre?: string;
  children: ReactNode;
  actions?: ReactNode;   // pied de carte, optionnel
}

export function Carte({ titre, sousTitre, children, actions }: CarteProps) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold text-lg">{titre}</h3>
      {sousTitre && (<p className="text-sm text-gray-600 mb-2">{sousTitre}</p>)}
      <div className="mb-3">
        {children}
      </div>
      {actions && (
        <div className="mt-3">
          {actions}
        </div>
      )}
    </div>
  );
}

