import React from 'react';
import { useData } from 'react-isomorphic-data';

const footerWrapper = {
  padding: '2em',
};

const { API_URL } = process.env;

const Footer = () => {
  const { data, loading } = useData(`${API_URL}/footer`, {}, { method: 'GET' }, { ssr: false });

  return (
    <div className="footer">
      {!loading && data && <div style={footerWrapper} dangerouslySetInnerHTML={{ __html: data.data.content }}></div>}
    </div>
  );
};

export default Footer;
