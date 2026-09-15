import "./App.css";
import { RechercheFilms } from "./composants/RechercheFilms";

export default function App() {
  return (
    <main className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Recherche de films</h1>
      <RechercheFilms />
    </main>
  );
}
