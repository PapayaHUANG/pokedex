import React from 'react';

import Card from './Card';

export default function Deck({ data }) {
  return (
    <>
      {data.map((item) => {
        return <Card key={item.id} {...item} />;
      })}
    </>
  );
}
