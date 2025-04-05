import { Pokemon } from "@/types/pokemon";

export async function getPokemonList(): Promise<Pokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }
  const data = await res.json();

  return data.results.map((p: any) => {
    const id = p.url.split("/").filter(Boolean).pop();
    return {
      name: p.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: [],
    };
  });
}
