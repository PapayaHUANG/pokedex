import { useState, useEffect } from 'react';
import { fetchRandomPokemon } from '../helper/GetPokemons';
import { getPokemonColor } from '../helper/GetColorType';
import { changePokemonNameCase } from '../helper/GlobalFunctions';
import LifeVolHeart from '../components/Game/LifeVolHeart';
import Navigator from '../components/Navigator';
import { FaRedo } from 'react-icons/fa';
import '../styles/Game.css';

export default function Game() {
  const [data, setData] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [heartNum, setHeartNum] = useState(3);
  const [fetch, setFetch] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const setBackgroundColor = (option) => {
    if (reveal) {
      if (answer === data.name) {
        if (answer === option) {
          return 'rgb(157, 229, 157)';
        }
        if (answer !== option) {
          return 'white';
        }
      }
      if (answer !== data.name) {
        if (answer === option) {
          return 'rgb(238, 171, 171)';
        }
        if (option === data.name) {
          return 'rgb(157, 229, 157)';
        }
      } else {
        return 'white';
      }
    }
  };

  const buttonHandler = (e) => {
    setReveal(true);
    setAnswer(e.target.value);
    if (e.target.value === data.name) {
      setScore((score) => score + 1);
    }
    if (e.target.value !== data.name) {
      setHeartNum((heartNum) => heartNum - 1);
    }

    setTimeout(() => {
      setReveal(false);
      setFetch(!fetch);
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRandomPokemon();
      setData(data);
    };
    fetchData();
  }, [fetch]);

  useEffect(() => {
    if (heartNum === 0) {
      setIsGameOver(true);
    }
  }, [heartNum]);

  return (
    <>
      <Navigator />
      <div className="game-page-container">
        <h1 className="game-page-title">Who Am I?</h1>
        <section className="game-page-score-board">
          <span className="game-page-score-board__score">score:{score}</span>
          <span className="game-page-score-board__life-vol">
            <LifeVolHeart heartNum={heartNum} />
          </span>
        </section>
        {isGameOver && (
          <section className="game-page-gameover">
            <h1>Game Over</h1>
            <div>Score: {score}</div>

            <div>
              <FaRedo
                onClick={() => {
                  setIsGameOver(false);
                  setScore(0);
                  setHeartNum(3);
                }}
              />
            </div>
          </section>
        )}
        <section className="game-page-card">
          <div
            className="game-page-card-container"
            style={{
              background: `linear-gradient(0deg, rgba(255,255,255,0) 5%,
        ${getPokemonColor(data?.types[0])}`,
            }}
          >
            <img
              src={data?.sprite}
              alt="guess the pokemon"
              style={{ filter: `brightness(${reveal ? 1 : 0})` }}
            />
          </div>
        </section>
        <section className="game-page-buttons">
          {data?.options.map((option, i) => {
            return (
              <button
                disabled={isGameOver ? true : false}
                onClick={(e) => {
                  buttonHandler(e);
                }}
                key={i}
                value={option}
                style={{ background: setBackgroundColor(option) }}
              >
                {changePokemonNameCase(option)}
              </button>
            );
          })}
        </section>
      </div>
    </>
  );
}
