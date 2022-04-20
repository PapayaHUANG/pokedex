import Explore from './routes/Explore';
import './styles/App.css';
import Navigator from './components/Navigator';
import Searchbar from './components/Searchbar';
import FilterByType from './components/FilterByType';
import { useState } from 'react';
import { PageNumProvider } from './helper/PageNumHooks';

function App() {
  const [searchWord, setSearchWord] = useState(null);
  const [type, setType] = useState(null);

  return (
    <>
      <Navigator />
      <PageNumProvider>
        <section className="home__main">
          <section className="menu">
            <Searchbar setSearchWord={setSearchWord} />
            <FilterByType setType={setType} />
          </section>
          <Explore searchWord={searchWord} type={type} />
        </section>
      </PageNumProvider>
    </>
  );
}

export default App;
