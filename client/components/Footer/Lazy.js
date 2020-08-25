import React, { useState } from 'react';
import loadable from '@loadable/component';
import useIntersect from '@jackyef/use-intersect';

const LazyFooterComponent = loadable(() => import(/* webpackChunkName: "footer" */ './index'));

const FooterLoader = () => {
  return (
    <div style={{ padding: '2em', minHeight: '330px' }}>
      <h2>Sedang memuat...</h2>
    </div>
  );
};

const optionsData = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0, 0, 0],
};

const FooterWrapper = () => {
  const [loaded, setLoaded] = useState(false);

  const onIntersect = () => {
		console.debug('Footer is intersecting!');
    setLoaded(true);
  };

  const targetRef = useIntersect(onIntersect, optionsData, true);

  return <div ref={targetRef}>{loaded ? <LazyFooterComponent /> : <FooterLoader />}</div>;
};

export default FooterWrapper;