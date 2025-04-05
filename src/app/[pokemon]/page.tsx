import Link from "next/link";
import PropertyDetailCard from "@/components/PropertyDetailCard";
import { Pokemon } from "@/types/pokemon";

type PageProps = {
  params: Promise<{ pokemon: string }>;
};

async function getPokemonData(pokemon: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon data");
  }
  const data = await res.json();
  return {
    name: data.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    sprites: data.sprites,
    abilities: data.abilities,
    stats: data.stats,
    moves: data.moves,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { pokemon } = await params; // Await the params promise
  const data = await getPokemonData(pokemon);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <Link href="/" className="text-[#0dc5a2] font-semibold hover:underline">
          &larr; Back
        </Link>
      </div>
      <PropertyDetailCard data={data} />
    </div>
  );
}
