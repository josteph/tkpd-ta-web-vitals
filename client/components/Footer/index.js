/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef, useState, useEffect } from 'react';
import { useData } from 'react-isomorphic-data';

const footerWrapper = {
  padding: '2em',
};

const footerContent = {
	display: 'inline-block',
};

const disqusStyles = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '2em',
  borderLeft: '1px solid rgb(255, 255, 255)',
  borderRight: '1px solid rgb(255, 255, 255',
};

const { API_URL } = process.env;

const Footer = () => {
	const [showAll, setShowAll] = useState(false);
  const [showData, setShowData] = useState('');
  const disqusInit = useRef();
  const { data, loading } = useData(`${API_URL}/footer`, {}, { method: 'GET' }, { ssr: true });

	useEffect(() => {
		if (!loading && data) {
			setShowData(data.data.content.substring(0, 500) + '...')
		}
	}, [data, loading]);

	const handleToogleShow = (e) => {
		e.preventDefault();
		if (!showAll) {
			setShowData(data.data.content)
		} else {
			setShowData(data.data.content.substring(0, 500) + '...')
		}
		setShowAll(!showAll);
  };

  useEffect(() => {
    if (disqusInit.current) return;

    const initDisqus = () => {
      var d = document, s = d.createElement('script'), count = d.createElement('script');
      s.src = 'https://test-disqus-13.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());

      count.src = 'https://test-disqus-13.disqus.com/count.js';
      count.async = true;
      count.setAttribute('id', 'dsq-count-scr');

      (d.head || d.body).appendChild(s);
      (d.head || d.body).appendChild(count);

      disqusInit.current = true;
    };

    initDisqus();
  }, [])

  return (
    <>
      <div className="footer" style={footerWrapper}>
        {!loading && data && (
          <>
            <div style={footerContent} dangerouslySetInnerHTML={{ __html: showData || data.data.content.substring(0, 500) + '...' }}></div>
            <a onClick={handleToogleShow} style={{ color: '#61dafb', textDecoration: 'none' }}>{showAll ? 'Tampilkan lebih sedikit' : 'Tampilkan selengkapnya'}</a>
          </>
        )}
      </div>
      <div id="disqus_thread" style={disqusStyles}></div>
    </>
  );
};

export default Footer;
