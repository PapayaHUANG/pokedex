import React from 'react';
import { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { usePageNum } from '../helper/PageNumHooks';
import Debounce from '../helper/useDebounce';
import '../styles/Searchbar.css';

export default function Searchbar({ setSearchWord }) {
  const [value, setValue] = useState('');

  const { turnToDefaultPage } = usePageNum();

  // const submit = (e) => {
  //   e.preventDefault();
  //   setSearchWord(inputValue);
  //   setInputValue('');
  //   turnToDefaultPage();
  // };

  const debouncedSave = useCallback(
    Debounce((nextValue) => setSearchWord(nextValue), 1000),
    []
  );

  const handleChange = (e) => {
    const { value: nextValue } = e.target;
    setValue(nextValue);
    if (nextValue === '') {
      turnToDefaultPage();
    }
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
