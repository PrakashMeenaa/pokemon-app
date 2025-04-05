export async function getPokemonTypes(): Promise<string[]> {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon types");
  }
  const data = await res.json();
  return data.results.map((t: any) => t.name);
}
