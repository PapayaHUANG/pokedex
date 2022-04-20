import axios from 'axios';
import { getPokemonSprite } from './GlobalFunctions';

const URL = 'https://pokeapi.co/api/v2/';

export const fetchPokemonData = async (preNum, nextNum) => {
  const data = await axios
    .get(`${URL}pokemon?limit=1126`)
    .then((res) => res.data);

  const list = Promise.all(
    data.results.slice(preNum, nextNum).map(async (item) => {
      const pokemon = await axios.get(item.url).then((res) => res.data);
      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => type.type.name),
        sprite: getPokemonSprite(pokemon.id),
      };
    })
  ).then((res) => {
    return res;
  });

  return list;
};

export const fetchPokemonByName = async (preNum, nextNum, word) => {
  const data = await axios
    .get(`${URL}pokemon?limit=1126`)
    .then((res) => res.data.results);

  const names = data.map((item) => item.name);

  const filteredNames = names.filter((name) => name.includes(word));

  const list = Promise.all(
    filteredNames.slice(preNum, nextNum).map(async (name) => {
      const pokemon = await axios
        .get(`${URL}pokemon/${name}`)
        .then((res) => res.data);
      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => type.type.name),
        sprite: getPokemonSprite(pokemon.id),
      };
    })
  ).then((res) => {
    return res;
  });
  return list;
};

export const fetchPokemonType = async (preNum, nextNum, type) => {
  const data = await axios.get(`${URL}type`).then((res) => res.data);
  const list = data.results.filter((item) => item.name == type);
  const pokemons = await axios.get(list[0].url).then((res) => res.data.pokemon);

  const select = Promise.all(
    pokemons.slice(preNum, nextNum).map(async (item) => {
      const pokemon = await axios.get(item.pokemon.url).then((res) => res.data);
      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => type.type.name),
        sprite: getPokemonSprite(pokemon.id),
      };
    })
  ).then((res) => {
    return res;
  });
  return select;
};

export const fetchOnePokemon = async (id) => {
  const data = await axios.get(`${URL}pokemon/${id}`).then((res) => res.data);
  const description = await axios
    .get(`${URL}pokemon-species/${id}`)
    .then((res) => res.data);

  const pokemon = {
    id: data.id,
    name: data.name,
    types: data.types.map((type) => type.type.name),
    sprite: getPokemonSprite(data.id),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((ability) => ({
      name: ability.ability.name,
      is_hidden: ability.is_hidden,
    })),
    bio: description.flavor_text_entries[0].flavor_text,
  };
  return pokemon;
};

export const fetchPokemonEvolution = async (name) => {
  const data = await axios
    .get(`${URL}evolution-chain/?limit=468`)
    .then((res) => res.data);

  const evo_list = Promise.all(
    data.results.map(async (item) => {
      const evo_chain = await axios.get(item.url).then((res) => res.data);

      return [evo_chain.chain];
    })
  )
    .then((res) => {
      const allResults = [];
      res.map((item) => {
        const result = [];
        const getEvo = (treeData, arr) => {
          treeData.map((element) => {
            arr.push(element.species.name);
            if (element.evolves_to && element.evolves_to.length > 0) {
              getEvo(element.evolves_to, arr);
            }
          });
        };
        getEvo(item, result);
        allResults.push(result);
      });
      return allResults;
    })
    .then((res) => {
      const list = res.filter((list) => list.includes(name));
      return list;
    });

  return evo_list;
};

export const fetchPokemonButton = async (pokemon) => {
  const data = await axios
    .get(`${URL}pokemon/${pokemon}`)
    .then((res) => res.data);

  const button = {
    id: data.id,
    name: data.name,
    sprite: getPokemonSprite(data.id),
    types: data.types.map((type) => type.type.name),
  };
  return button;
};

export const fetchRandomPokemon = async () => {
  const data = await axios
    .get(`${URL}generation/1`)
    .then((res) => res.data.pokemon_species);
  const nameList = data.map((item) => item.name);

  const randomPokemonName =
    nameList[Math.floor(Math.random() * (nameList.length - 1))];

  const option = nameList
    .filter((name) => name !== randomPokemonName)
    .sort((a, b) => {
      return Math.random() > 0.5 ? -1 : 1;
    })
    .slice(0, 2);

  const pokemonDetail = await axios
    .get(`${URL}pokemon/${randomPokemonName}`)
    .then((res) => res.data);

  const pokemon = {
    id: pokemonDetail.id,
    name: pokemonDetail.name,
    types: pokemonDetail.types.map((type) => type.type.name),
    sprite: getPokemonSprite(pokemonDetail.id),
    options: [pokemonDetail.name, ...option].sort((a, b) => {
      return Math.random() > 0.5 ? -1 : 1;
    }),
  };
  return pokemon;
};
