import React from 'react';
import { useData } from 'react-isomorphic-data';

const Footer = () => {
  const { data, loading } = useData('http://localhost:3000/api/footer', {});

  return (
    <div className="footer">
      {!loading && data && <div className="seo-text" dangerouslySetInnerHTML={{ __html: data.data.content }}></div>}
    </div>
  );
};

export default Footer;
