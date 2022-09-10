import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

import Debounce from '../helper/useDebounce';
import '../styles/Searchbar.css';

export default function Searchbar({ setSearchWord }) {
  const [value, setValue] = useState('');

  const debouncedSave = useCallback(
    Debounce((nextValue) => setSearchWord(nextValue), 3000),
    []
  );

  const handleChange = (e) => {
    const { value: nextValue } = e.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };

  return (
    <div className="searchbar">
      <form>
        <button className="searchbar__button">
          <FaSearch />
        </button>
        <input
          className="searchbar__input"
          type="text"
          placeholder="Enter Name"
          onChange={(e) => handleChange(e)}
          required
        />
      </form>
    </div>
  );
}
