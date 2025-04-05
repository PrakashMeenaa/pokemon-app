import Link from "next/link";
import PropertyDetailCard from "@/components/PropertyDetailCard";

type PageProps = {
  params: { pokemon: string };
};

async function getPokemonData(pokemon: string): Promise<any> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon data");
  }
  return res.json();
}

export default async function PropertyDetailPage({ params }: PageProps) {
    const pokemon = params.pokemon;
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
