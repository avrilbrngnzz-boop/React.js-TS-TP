import { Navigate } from "react-router-dom";
import { useAuth } from "../contextes/AuthContext";

export function RouteProtegee({ children }: { children: React.ReactNode }) {
  const { pseudo } = useAuth();
  if (!pseudo) return <Navigate to="/connexion" replace />;
  return <>{children}</>;
}
