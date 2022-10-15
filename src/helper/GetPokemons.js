import axios from 'axios';
import { getPokemonSprite } from './GlobalFunctions';

const URL = 'https://pokeapi.co/api/v2/';

export const fetchPokemonData = async (preNum, nextNum) => {
  const data = await axios
    .get(`${URL}pokemon?limit=100000`)
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

export const fetchPokemonEvolution = async (name, id) => {
  const data = await axios
    .get(`${URL}evolution-chain/?limit=468`)
    .then((res) => res.data);
  const left = Math.floor(id / 3 - 1);
  const right = Math.floor(id / 2);

  const evo_list = await Promise.all(
    data.results.slice(left, right).map(async (item) => {
      const evo_chain = await axios.get(item.url).then((res) => res.data.chain);
      return [evo_chain];
    })
  );

  const allResults = [];
  evo_list.map((list) => {
    const result = [];
    const getEvo = (treeData, arr) => {
      treeData.map((element) => {
        arr.push(element.species.name);
        if (element.evolves_to && element.evolves_to.length > 0) {
          getEvo(element.evolves_to, arr);
        }
      });
    };
    getEvo(list, result);
    allResults.push(result);
  });
  console.log(allResults);

  const list = allResults.filter((list) => list.includes(name));
  console.log(list);
  return list;
};

export const fetchPokemonButtons = async (pokemonList) => {
  const button = Promise.all(
    pokemonList.map(async (pokemon) => {
      const data = await axios
        .get(`${URL}pokemon/${pokemon}`)
        .then((res) => res.data);
      return {
        id: data.id,
        name: data.name,
        sprite: getPokemonSprite(data.id),
        types: data.types.map((type) => type.type.name),
      };
    })
  ).then((res) => {
    return res;
  });

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
