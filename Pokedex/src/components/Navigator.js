import { Link } from 'react-router-dom';
import '../styles/Navigator.css';
export default function () {
  return (
    <div className="navigator">
      <div className="navigator__title">Pokedex</div>
      <nav className="navigator__nav">
        <Link className="navigator__nav__link" to="/">
          Home
        </Link>
        <Link className="navigator__nav__link" to="/Game">
          Game
        </Link>
      </nav>
    </div>
  );
}
