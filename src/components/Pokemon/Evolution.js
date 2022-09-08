import PokemonButton from './PokemonButton';
import { useState, useEffect } from 'react';
import {
  fetchPokemonEvolution,
  fetchPokemonButtons,
} from '../../helper/GetPokemons';

export default function Evolution({ name }) {
  const [chain, setChain] = useState([]);
  const [buttons, setButtons] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getEvolutionChain = async (name) => {
      const pokemon = await fetchPokemonEvolution(name);
      if (isMounted) {
        setChain(pokemon[0]);
      }
    };

    getEvolutionChain(name);

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(chain);

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

  console.log(buttons);

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
