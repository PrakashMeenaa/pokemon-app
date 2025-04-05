export interface Sprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  image: string;
  sprites: Sprites;
  abilities: Ability[];
  types: string[];
  stats: Stat[];
  moves: Move[];
}
