import PokemonButton from './PokemonButton';
import { useState, useEffect } from 'react';
import { fetchPokemonEvolution } from '../../helper/GetPokemons';

export default function Evolution({ name }) {
  // console.log(name);
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const getEvolutionChain = async (name) => {
      const pokemon = await fetchPokemonEvolution(name);
      setChain(pokemon[0]);
    };
    getEvolutionChain(name);
  }, []);
  // console.log(chain);
  return (
    <div className="evolution">
      <h2 className="evolution__title">Evolution</h2>
      <div className="evolution__container">
        {chain?.map((pokemon, i) => {
          return <PokemonButton key={i} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}
