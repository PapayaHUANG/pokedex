import { changePokemonNameCase } from '../../helper/GlobalFunctions';

export default function PokemonBio({
  bio,
  abilities,
  height,
  weight,
  name,
  types,
}) {
  return (
    <div className="bio">
      <h2 className="bio__title">Bio</h2>
      <div className="bio__general-description">
        <span>{changePokemonNameCase(name)}, </span>
        <span>
          {types.length < 2 ? `${types[0]}` : `${types.join(' and ')}`} type of
          Pokemon.
        </span>
        <span> {bio}</span>
      </div>

      <div className="bio__height">
        <div className="bio__height__title">Height: </div>
        <div>{height / 10}m</div>
      </div>
      <div className="bio__weight">
        <div className="bio__weight__title">Weight: </div>
        <div>{weight / 10}kg</div>
      </div>
      <div className="bio__abilities">
        <div className="bio__abilities__title">Abilities: </div>
        <div>
          {abilities.map((ability, i) => {
            return (
              <div key={i}>
                {ability.is_hidden
                  ? `${ability.name}(Hidden ability)`
                  : `${ability.name}`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
