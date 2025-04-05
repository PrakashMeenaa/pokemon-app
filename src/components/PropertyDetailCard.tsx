import { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface PropertyDetailCardProps {
  data: Pokemon;
}

export default function PropertyDetailCard({ data }: PropertyDetailCardProps) {
  const name = data.name;
  const types = data.types.length ? data.types.join(", ") : "N/A";
  const stats = data.stats.map((s) => s.stat.name).join(", ");
  const abilities = data.abilities.map((a) => a.ability.name).join(", ");
  const someMoves = data.moves.slice(0, 4).map((m) => m.move.name).join(", ");

  return (
    <div className="max-w-96 mx-auto shadow-lg">
      <div className="bg-[#60e2c9] p-4 flex justify-center items-center">
        <Image
          src={data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default || ""}
          alt={name}
          width={0}
          height={0}
          sizes="100%"
          className="w-40 h-40 object-contain"
        />
      </div>
      <div className="bg-[#fdc666] p-4">
        <h2 className="text-2xl font-bold capitalize mb-2">Name: {name}</h2>
        <p className="mb-2">
          <span className="font-semibold">Type:</span> {types}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Stats:</span> {stats}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Abilities:</span> {abilities}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Some Moves:</span> {someMoves}
        </p>
      </div>
    </div>
  );
}
