export interface Cocktail {
  name: string;
  image: string;
  placeholder: string;
  description: string;
  ingredients: string[];
  category: string;
  tags: string[];
  price?: string;
  isSignature?: boolean;
}

export interface CocktailCategory {
  name: string;
  cocktails: Cocktail[];
}

export interface CocktailMenu {
  categories: CocktailCategory[];
}
