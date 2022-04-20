import { FaHeart } from 'react-icons/fa';

const createArr = (length) => [...Array(length)];

export default function LifeVolHeart({ heartNum }) {
  return (
    <>
      {createArr(heartNum).map((heart, i) => {
        return <FaHeart key={i} style={{ color: `red` }} />;
      })}
    </>
  );
}
