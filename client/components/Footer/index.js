/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { useData } from 'react-isomorphic-data';

const footerWrapper = {
  padding: '2em',
};

const footerContent = {
	display: 'inline-block',
}

const { API_URL } = process.env;

const Footer = () => {
	const [showAll, setShowAll] = useState(false);
	const [showData, setShowData] = useState('');
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
		setShowAll(!showAll)
	}

  return (
    <div className="footer" style={footerWrapper}>
      {!loading && data && (
				<>
					<div style={footerContent} dangerouslySetInnerHTML={{ __html: showData }}></div>
					<a onClick={handleToogleShow} style={{ color: '#61dafb', textDecoration: 'none' }}>{showAll ? 'Tampilkan lebih sedikit' : 'Tampilkan selengkapya'}</a>
				</>
			)}
    </div>
  );
};

export default Footer;
