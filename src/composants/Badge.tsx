export type TonBadge = "neutre" | "succes" | "info" | "attention";

export interface BadgeProps {
  texte: string;
  ton?: TonBadge;   // "neutre" par défaut
}

const styles: Record<TonBadge, string> = {
  neutre: "bg-gray-300 text-black",
  succes: "bg-green-500 text-white",
  info: "bg-blue-500 text-white",
  attention: "bg-yellow-400 text-black",
};

export function Badge({ texte, ton = "neutre" }: BadgeProps) {
  return (
    <span className={`px-2 py-1 rounded text-sm ${styles[ton]}`}>
      {texte}
    </span>
  );
}