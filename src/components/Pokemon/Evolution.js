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
    const getEvolutionChain = async (name) => {
      const pokemon = await fetchPokemonEvolution(name);
      setChain(pokemon[0]);
    };
    getEvolutionChain(name);
  }, []);

  console.log(chain);

  useEffect(() => {
    const getButton = async (chain) => {
      const data = await fetchPokemonButtons(chain);
      setButtons(data);
    };
    getButton(chain);
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
