import { Pokemon } from "@/types/pokemon";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

export async function getPokemonList(): Promise<Pokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }
  const data: PokemonListResponse = await res.json();

  return data.results.map((p) => {
    const id = p.url.split("/").filter(Boolean).pop();
    return {
      name: p.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: [],
      sprites: { front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` },
      abilities: [],
      stats: [],
      moves: [],
    };
  });
}
