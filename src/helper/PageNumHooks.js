import { useState, createContext, useContext } from 'react';

const PageContext = createContext();

export const usePageNum = () => useContext(PageContext);
export function PageNumProvider({ children }) {
  const [prePage, setPrePage] = useState(0);
  const [nextPage, setNextPage] = useState(3);

  const turnToPrePage = () => {
    if (prePage === 0) return;
    setPrePage((prePage) => prePage - 3);
    setNextPage((nextPage) => nextPage - 3);
  };

  const turnToNextPage = () => {
    setPrePage((prePage) => prePage + 3);
    setNextPage((nextPage) => nextPage + 3);
  };

  const turnToDefaultPage = () => {
    setPrePage(0);
    setNextPage(3);
  };

  return (
    <PageContext.Provider
      value={{
        turnToNextPage,
        turnToPrePage,
        prePage,
        nextPage,
        turnToDefaultPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
