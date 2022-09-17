# Pokedex: a database of pokemon info and pictures

## Project description

### Overview

Thanks to [pokeapi](https://pokeapi.co/), you can use this app to view, search and filter pokemons. You can also see the bio, evolution of one specific pokemon by clicking the up right info button on every pokemon card.
If you want to challenge your capacity of memorizing pokemons, you can play the "Guess who I am" game.

![Homepage](https://raw.githubusercontent.com/PapayaHUANG/images/main/img/%E6%88%AA%E5%B1%8F2022-09-17%2016.10.54.png)
Homepage of the app

![Detail of one Pokemon](https://raw.githubusercontent.com/PapayaHUANG/images/main/img/%E6%88%AA%E5%B1%8F2022-09-17%2016.12.51.png)
Detail Page of One Pokemon

![Guess who i am](https://raw.githubusercontent.com/PapayaHUANG/images/main/img/%E6%88%AA%E5%B1%8F2022-09-17%2016.14.43.png)
Mini Game

### Technologies Used

1. Data-fetching

- **Axios** is used to fetch data from _pokeapi_, when encounter tree data structure, I used recursive function to get the exact data i want(see the evolution part).
- **Debounce** technique is used when implementing the search bar. The aim is to limit unnecessary API calls.

2. React hooks

- **Custom Hook**
  I created a custom pagination hook to implement module mindset. In this case, the homepage(_explore.js_) won't be too complicated.

- **useEffect Hook**
  Navigating to a different router while the data is fetching may cause a memory leak due to the lifecycle of React component. So I added a `isMounted` flag for every `useEffect` fetch, to avoid rendering conflicts.

- **useReducer Hook**
  In the mini-game part, whenever a button is clicked, multiple states change would be triggered, so I use `useReducer` to implement the Action-Dispatch-Store-View pattern.

3. Performance

- I set the width and height of `<img>` to avoid CLS problem.

4. Styling

- **BEM** methodology is used when naming the class.

## Update Schedule

- Responsive to mobile to be done

## Live demo

Please check [here](http://shaoyahuang.site/pokedex/)!
