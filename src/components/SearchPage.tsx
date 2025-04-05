"use client";

import { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import { Pokemon } from "@/types/pokemon";
import { getPokemonTypes } from "@/lib/getPokemonTypes";
import { getPokemonList } from "@/lib/getPokemonList";
import { getPokemonByType } from "@/lib/getPokemonByType";

export default function SearchPage() {
  const [types, setTypes] = useState<string[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [displayPokemons, setDisplayPokemons] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [pendingSearchTerm, setPendingSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  
  useEffect(() => {
    (async () => {
      try {
        const typesData = await getPokemonTypes();
        setTypes(typesData);
        const pokemonData = await getPokemonList();
        setAllPokemons(pokemonData);
        setDisplayPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

 
  useEffect(() => {
    (async () => {
      if (selectedType) {
        try {
          const pokemonsByType = await getPokemonByType(selectedType);
          setDisplayPokemons(pokemonsByType);
        } catch (error) {
          console.error("Error fetching pokémons by type:", error);
        }
      } else {
        setDisplayPokemons(allPokemons);
      }
    })();
  }, [selectedType, allPokemons]);

 
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppliedSearchTerm(pendingSearchTerm);
  };

  
  const filteredPokemons = displayPokemons.filter((p) => {
    const searchQuery = appliedSearchTerm;
    const trimmedSearchQuery = searchQuery.trim().toLowerCase();

    
    if (searchQuery.endsWith(" ")) {
      return p.name.toLowerCase() === trimmedSearchQuery;
    }
    
    return p.name.toLowerCase().includes(trimmedSearchQuery);
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border p-2 rounded bg-white"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="&#x1F50D; Search Pokémon"
            value={pendingSearchTerm}
            onChange={(e) => setPendingSearchTerm(e.target.value)}
            className="border p-2 rounded-l flex-1 bg-white"
          />
          <button
            type="submit"
            className="bg-[#004368] text-white font-semibold py-2 px-4 rounded-r hover:bg-[#243b47] transition"
          >
            Search
          </button>
        </div>
      </form>
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
}
