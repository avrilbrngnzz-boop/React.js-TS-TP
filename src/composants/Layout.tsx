import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";
import { useFavoris } from "../contextes/FavorisContext";

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();

  return (
    <div className="p-4 flex flex-col gap-6">
      <header className="flex gap-4 items-center">
        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold" : ""}>Accueil</NavLink>
        <NavLink to="/recherche" className={({ isActive }) => isActive ? "font-bold" : ""}>Recherche</NavLink>
        <NavLink to="/favoris" className={({ isActive }) => isActive ? "font-bold" : ""}>Favoris ({favoris.length})</NavLink>

        {pseudo ? (
          <>
            <span>Connecté en tant que {pseudo}</span>
            <button onClick={deconnecter} className="bg-red-600 text-white p-1 rounded">Déconnexion</button>
          </>
        ) : (
          <NavLink to="/connexion" className={({ isActive }) => isActive ? "font-bold" : ""}>Connexion</NavLink>
        )}
      </header>
      <Outlet />

      <footer className="text-sm text-slate-500">TP5 — React Router</footer>
    </div>
  );
}
