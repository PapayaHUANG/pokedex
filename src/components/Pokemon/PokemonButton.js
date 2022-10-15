import {
  changeIdFormat,
  changePokemonNameCase,
} from '../../helper/GlobalFunctions';
import { getPokemonColor } from '../../helper/GetColorType';
import { useNavigate } from 'react-router-dom';

export default function PokemonButton({ button }) {
  let navigate = useNavigate();

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
        <div
          id={button?.id}
          onClick={(e) => {
            console.log(e.target);
            navigate(`/pokemon/${e.target.id}`);
          }}
        ></div>
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
