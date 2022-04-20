import React from 'react';
import { Link } from 'react-router-dom';
import { getPokemonColor, getPokemonIcon } from '../../helper/GetColorType';
import {
  changeIdFormat,
  changePokemonNameCase,
} from '../../helper/GlobalFunctions';
import '../../styles/Card.css';
import { FaInfoCircle } from 'react-icons/fa';

export default function Card({ id, name, types, sprite }) {
  return (
    <div className="card__container">
      <div
        className="card"
        style={{
          background: `linear-gradient(0deg, rgba(255,255,255,0) 5%,
        ${getPokemonColor(types[0])}`,
        }}
      >
        <Link to={`pokemon/${id}`}>
          <FaInfoCircle className="card__info-button" />
        </Link>
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
                style={{ maxWidth: '170px' }}
              ></img>
            );
          })}
        </div>
        <h3 className="card__name">{changePokemonNameCase(name)} </h3>
      </div>
    </div>
  );
}
