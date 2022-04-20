import Navigator from '../components/Navigator';
import '../styles/NotFound.css';
export default function () {
  return (
    <>
      <Navigator />
      <section className="notFound">
        <img
          className="notFound__img"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10083.png"
          alt="Pokemon"
        />
        <h1 className="notFound__Description__title">Oops! Page Not Found. </h1>
      </section>
    </>
  );
}
