import React from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { usePageNum } from '../helper/PageNumHooks';
import '../styles/Searchbar.css';

export default function Searchbar({ setSearchWord }) {
  const [inputValue, setInputValue] = useState('');
  const { turnToDefaultPage } = usePageNum();

  const submit = (e) => {
    e.preventDefault();
    setSearchWord(inputValue);
    setInputValue('');
    turnToDefaultPage();
  };

  return (
    <div className="searchbar">
      <form onSubmit={submit}>
        <button className="searchbar__button">
          <FaSearch />
        </button>
        <input
          className="searchbar__input"
          value={inputValue}
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
