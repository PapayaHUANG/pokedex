export const getPokemonSprite = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const changePokemonNameCase = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

export const changeIdFormat = (id) => {
  if (id < 10) {
    return `00${id}`;
  } else if (id >= 10 && id < 100) {
    return `0${id}`;
  } else {
    return id;
  }
};
