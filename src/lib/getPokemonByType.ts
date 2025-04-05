import { Pokemon } from "@/types/pokemon";

interface PokemonByTypeItem {
  pokemon: {
    name: string;
    url: string;
  };
}

interface PokemonByTypeResponse {
  pokemon: PokemonByTypeItem[];
}

export async function getPokemonByType(type: string): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon by type");
  }
  const data: PokemonByTypeResponse = await res.json();

  return data.pokemon.map((p) => {
    const id = p.pokemon.url.split("/").filter(Boolean).pop();
    return {
      name: p.pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: [type],
      sprites: { front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` },
      abilities: [],
      stats: [],
      moves: [],
    };
  });
}
