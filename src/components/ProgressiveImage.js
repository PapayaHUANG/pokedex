import React, { memo, useState, useCallback } from 'react';

import Preloader from './Preloader';

const ProgressiveImage = ({ imgSrc, alt }) => {
  const [imageLoaded, setImageLoading] = useState('');

  const handleLoad = useCallback(() => setImageLoading(true), []);
  const handleError = useCallback(() => setImageLoading(false), []);

  const showImage = !imageLoaded ? { display: 'none' } : {};

  const ImageToRender = (
    <img
      alt={alt}
      src={imgSrc}
      onLoad={handleLoad}
      onError={handleError}
      style={showImage}
      className="card__sprite"
      width="80%"
      height="70%"
    />
  );

  if (!imageLoaded) {
    return <Preloader>{ImageToRender}</Preloader>;
  }

  return ImageToRender;
};

export default memo(ProgressiveImage);
