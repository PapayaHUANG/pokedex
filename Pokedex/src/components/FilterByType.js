import React from 'react';
import { types } from '../helper/GetColorType';

import { usePageNum } from '../helper/PageNumHooks';
import { FaFilter } from 'react-icons/fa';
import '../styles/FilterByType.css';
export default function FilterByType({ setType }) {
  const { turnToDefaultPage } = usePageNum();
  return (
    <div className="filter">
      <button className="filter__icon">
        <FaFilter />
      </button>
      <form>
        <select
          className="filter__select"
          onChange={(e) => {
            if (e.target.value == types[0]) {
              setType(null);
            } else {
              setType(e.target.value);
            }
            turnToDefaultPage();
          }}
        >
          {types.map((type, i) => {
            return (
              <option value={type} key={i}>
                {type}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}
