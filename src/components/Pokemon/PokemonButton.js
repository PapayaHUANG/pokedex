import { useState, useEffect } from 'react';
import { fetchPokemonButton } from '../../helper/GetPokemons';
import {
  changeIdFormat,
  changePokemonNameCase,
} from '../../helper/GlobalFunctions';
import { getPokemonColor } from '../../helper/GetColorType';
import { useNavigate } from 'react-router-dom';
export default function PokemonButton({ pokemon }) {
  const [button, setButton] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getButton = async (pokemon) => {
      const data = await fetchPokemonButton(pokemon);
      setButton(data);
    };
    getButton(pokemon);
  }, []);
  return (
    <div className="pokemon-buttons">
      <h4 className="pokemon-buttons__id">#{changeIdFormat(button?.id)}</h4>

      <div
        className="pokemon-buttons__container"
        style={{
          background: `linear-gradient(0deg, rgba(255,255,255,0) 5%,
        ${getPokemonColor(button?.types[0])}`,
        }}
      >
        <img
          className="pokemon-buttons__sprites"
          src={button?.sprite}
          alt={`${button?.name}'s image`}
          id={button?.id}
          onClick={(e) => {
            navigate(`/pokemon/${e.target.id}`);
          }}
        />
      </div>

      <h4 className="pokemon-buttons__title">
        {changePokemonNameCase(button?.name)}
      </h4>
    </div>
  );
}
