import React from 'react';

import { getPokemonColor, getPokemonIcon } from '../../helper/GetColorType';
import {
  changeIdFormat,
  changePokemonNameCase,
} from '../../helper/GlobalFunctions';
import '../../styles/Card.css';

export default function DetailPageCard({ id, name, types, sprite }) {
  return (
    <div className="card__container">
      <div
        className="card"
        style={{
          background: `linear-gradient(0deg, rgba(255,255,255,0) 0%,
        ${getPokemonColor(types[0])}`,
        }}
      >
        <h3 className="card__id"># {changeIdFormat(id)}</h3>

        <img src={sprite} alt={name} className="card__sprite"></img>
        <div className="card__type-wrapper">
          {types.map((type) => {
            return (
              <img
                src={getPokemonIcon(type)}
                alt={type}
                className="card__type-wrapper__type-icon"
                key={type}
              ></img>
            );
          })}
        </div>
        <h3 className="card__name">{changePokemonNameCase(name)} </h3>
      </div>
    </div>
  );
}
