import Link from "next/link";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="flex flex-col border rounded p-4 gap-10 shadow hover:shadow-md transition bg-white">
      <div className="flex flex-col gap-5">
        {pokemon.image && (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={0}
            height={0}
            sizes="100%"
            className="w-32 h-32 mx-auto mb-4"
          />
        )}
        <h3 className="text-lg font-semibold capitalize mb-2">
          {pokemon.name}
        </h3>
      </div>
      <Link href={`/${pokemon.name}`} className="w-max">
        <button className="text-blue-500 py-1 rounded cursor-pointer transition">
          Details &rarr;
        </button>
      </Link>
    </div>
  );
}
