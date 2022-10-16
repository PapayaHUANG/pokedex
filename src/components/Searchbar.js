import React from 'react';
import { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { usePageNum } from '../helper/PageNumHooks';
import Debounce from '../helper/useDebounce';
import '../styles/Searchbar.css';

export default function Searchbar({ setSearchWord }) {
  const [value, setValue] = useState('');
  const { turnToDefaultPage } = usePageNum();
  const debouncedSave = useCallback(
    Debounce((nextValue) => setSearchWord(nextValue), 3000),
    []
  );

  const debouncedTurnToDefaultPage = useCallback(
    Debounce(() => turnToDefaultPage(), 3000)
  );
  const handleChange = (e) => {
    const { value: nextValue } = e.target;
    setValue(nextValue);
    debouncedSave(nextValue);
    debouncedTurnToDefaultPage();
  };

  console.log(value);
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
