import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOnePokemon } from '../helper/GetPokemons';
import DetailPageCard from '../components/Pokemon/DetailPageCard';
import PokemonBio from '../components/Pokemon/PokemonBio';
import Evolution from '../components/Pokemon/Evolution';
import Navigator from '../components/Navigator';
import '../styles/Pokemon.css';

export default function Pokemon() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getPokemon = async (id) => {
      const pokemon = await fetchOnePokemon(id);
      if (isMounted) {
        setCardData(pokemon);
      }
    };

    getPokemon(id);

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <>
      <Navigator />
      <section className="pokemon-container">
        <div className="pokemon-container__left">
          <button
            className="pokemon-container__left__button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          {cardData && <DetailPageCard {...cardData} />}
        </div>
        <div className="pokemon-container__right">
          {cardData && <PokemonBio {...cardData} />}
          {cardData && <Evolution name={cardData.name} id={id} />}
        </div>
      </section>
    </>
  );
}
