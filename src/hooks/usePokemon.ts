import { useState, useEffect } from "react";
import { Pokemon } from "@/types/pokemon";

export function usePokemon(initialList: Pokemon[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(initialList);

  useEffect(() => {
    const filtered = initialList.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPokemons(filtered);
  }, [searchTerm, initialList]);

  return { filteredPokemons, searchTerm, setSearchTerm };
}
