import { Pokemon } from "@/types/pokemon";

export async function getPokemonByType(type: string): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon by type");
  }
  const data = await res.json();

  return data.pokemon.map((p: any) => {
    const id = p.pokemon.url.split("/").filter(Boolean).pop();
    return {
      name: p.pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: [type],
    };
  });
}
