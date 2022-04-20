import React from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';

import { usePageNum } from '../../helper/PageNumHooks';
import '../../styles/PageFlipper.css';

export default function PageFlipper({ length }) {
  const { turnToPrePage, turnToNextPage } = usePageNum();
  return (
    <div className="flipper">
      <button
        className="flipper__button"
        onClick={() => {
          turnToPrePage();
        }}
      >
        <FaRegArrowAltCircleLeft />
      </button>
      <button
        className="flipper__button"
        onClick={() => {
          turnToNextPage(length);
        }}
      >
        <FaRegArrowAltCircleRight />
      </button>
    </div>
  );
}
