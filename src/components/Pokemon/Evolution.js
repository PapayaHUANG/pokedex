import PokemonButton from './PokemonButton';
import { useState, useEffect } from 'react';
import {
  fetchPokemonEvolution,
  fetchPokemonButtons,
} from '../../helper/GetPokemons';

export default function Evolution({ name, id }) {
  const [chain, setChain] = useState([]);
  const [buttons, setButtons] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getEvolutionChain = async (name, id) => {
      const pokemon = await fetchPokemonEvolution(name, id);
      if (isMounted) {
        setChain(pokemon[0]);
      }
    };

    getEvolutionChain(name, id);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const getButton = async (chain) => {
      const data = await fetchPokemonButtons(chain);
      if (isMounted) {
        setButtons(data);
      }
    };
    getButton(chain);
    return () => {
      isMounted = false;
    };
  }, [chain]);

  return (
    <div className="evolution">
      <h2 className="evolution__title">Evolution</h2>
      <div className="evolution__container">
        {buttons?.map((button, i) => {
          return <PokemonButton key={i} button={button} />;
        })}
      </div>
    </div>
  );
}
