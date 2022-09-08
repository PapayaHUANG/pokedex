import { useState, useEffect, useReducer, useCallback } from 'react';
import { fetchRandomPokemon } from '../helper/GetPokemons';
import { getPokemonColor } from '../helper/GetColorType';
import { changePokemonNameCase } from '../helper/GlobalFunctions';
import LifeVolHeart from '../components/Game/LifeVolHeart';
import Navigator from '../components/Navigator';
import { FaRedo } from 'react-icons/fa';
import '../styles/Game.css';

export default function Game() {
  const initialState = {
    isRevealed: false,
    isFetch: true,
    score: 0,
    heartNum: 3,
    isGameOver: false,
  };
  const [data, setData] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  function buttonHandler(e) {
    if (e.target.value === data.name) {
      dispatch({ type: 'right' });
    }
    if (e.target.value !== data.name) {
      dispatch({ type: 'wrong' });
    }
  }

  useEffect(() => {
    if (!state.isFetch) {
      return;
    }
    let isMounted = true;
    const fetchData = async () => {
      const data = await fetchRandomPokemon();
      if (isMounted) {
        setData(data);
      }
      return () => {
        isMounted = false;
      };
    };
    fetchData();
  }, [state.isFetch]);

  useEffect(() => {
    if (state.heartNum === 0) {
      dispatch({ type: 'gameover' });
    } else {
      if (!state.isGameOver) {
        setTimeout(() => {
          dispatch({ type: 'next' });
        }, 2000);
      } else {
        return;
      }
    }
  }, [state.isRevealed]);

  function reducer(state, action) {
    switch (action.type) {
      case 'right':
        return {
          ...state,
          isRevealed: true,
          score: state.score + 1,
          isFetch: false,
        };
      case 'wrong':
        return {
          ...state,
          isRevealed: true,
          heartNum: state.heartNum - 1,
          isFetch: false,
        };
      case 'next':
        return {
          ...state,
          isRevealed: false,
          isFetch: true,
        };
      case 'gameover':
        return {
          ...state,
          isGameOver: true,
          isFetch: false,
        };
      case 'restart':
        return initialState;
      default:
        return state;
    }
  }

  // const setBackgroundColor = (option) => {
  //   if (reveal) {
  //     if (answer === data.name) {
  //       if (answer === option) {
  //         return 'rgb(157, 229, 157)';
  //       }
  //       if (answer !== option) {
  //         return 'white';
  //       }
  //     }
  //     if (answer !== data.name) {
  //       if (answer === option) {
  //         return 'rgb(238, 171, 171)';
  //       }
  //       if (option === data.name) {
  //         return 'rgb(157, 229, 157)';
  //       }
  //     } else {
  //       return 'white';
  //     }
  //   }
  // };

  return (
    <>
      <Navigator />
      <div className="game-page-container">
        <h1 className="game-page-title">Who Am I?</h1>
        <section className="game-page-score-board">
          <span className="game-page-score-board__score">
            score:{state.score}
          </span>
          <span className="game-page-score-board__life-vol">
            <LifeVolHeart heartNum={state.heartNum} />
          </span>
        </section>
        {state.isGameOver && (
          <section className="game-page-gameover">
            <h1>Game Over</h1>
            <div>Score: {state.score}</div>

            <div>
              <FaRedo onClick={() => dispatch({ type: 'restart' })} />
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
              style={{ filter: `brightness(${state.isRevealed ? 1 : 0})` }}
            />
          </div>
        </section>
        <section className="game-page-buttons">
          {data?.options.map((option, i) => {
            return (
              <button
                disabled={state.isGameOver ? true : false}
                onClick={(e) => {
                  buttonHandler(e);
                }}
                key={i}
                value={option}
                // style={{ background: setBackgroundColor(option) }}
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
