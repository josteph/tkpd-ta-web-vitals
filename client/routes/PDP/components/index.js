import React from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import { useData } from 'react-isomorphic-data';
import moment from 'moment';
import Header from '../../../components/Header';
import RatingReview from '../../../components/RatingReview';
import Footer from '../../../components/Footer';

const containerStyle = {
  width: '100%',
	margin: '1em auto',
}

const breadcrumbStyle = {
	color: '#fff',
	textDecoration: 'none',
	paddingRight: '5px',
};

const productCard = {
  width: '100%',
  position: 'relative',
  marginBottom: '10px',
  boxShadow: '0 1px 6px 0 rgb(255 255 255 / 0.32)',
};

const productImg = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const productInfo = {
  padding: '10px',
  textAlign: 'left',
};

const productName = {
  fontWeight: 'bold',
};

const productPrice = {
  color: '#ff5722',
  fontSize: '14px',
  marginTop: '5px',
};

const actionWrapper = {
  position: 'fixed',
  bottom: '0',
	left: 'initial',
	width: '100%',
	height: '65px',
	display: 'flex',
	alignItems: 'center'
};

const btnBuy = {
  backgroundColor: '#ff5722',
	color: '#fff',
	padding: '12px',
	fontSize: '14px',
	fontWeight: 'bold',
  margin: '0 10px',
	width: '100%',
	border: 0,
	outline: 'none',
	cursor: 'pointer',
	borderRadius: '4px',
};

const productTimestamp = {
  paddingLeft: '1em',
  marginBottom: 0
};

const { API_URL } = process.env;

function PdpComponent({ match }) {
  const id = match.params.id;

  const { data, loading } = useData(`${API_URL}/product/${id}`, {}, { method: 'GET' }, { ssr: true });

  return (
    <div className="App" data-testid="pdp-container">
      <Header />
      <main style={containerStyle}>
				<div style={{ marginBottom: '1em', paddingLeft: '1em' }}>
					<Link to="/" style={breadcrumbStyle}>Beranda</Link>
					<span>&nbsp;&gt;&nbsp;</span>
					<Link to={`/${id}`} style={breadcrumbStyle}>Product Detail</Link>
				</div>
        {!loading && data && data.data && (
					<div className="pdp" style={productCard}>
            <img
              src={data.data.image} alt={data.data.name}
              style={productImg}
            />
						<div style={productInfo}>
							<div style={productName}>{data.data.name}</div>
							<div style={productPrice}>{data.data.price}</div>
							<RatingReview ratingCount={data.data.rating} reviewCount={data.data.review} />
						</div>
					</div>
        )}

        <p style={productTimestamp}>Last Updated: {moment().format('DD MMMM YYYY')}.</p>
      </main>

			<div style={actionWrapper}>
				<button style={btnBuy} onClick={() => { alert('Thank you...') }}>Beli</button>
			</div>

      <Footer />
    </div>
  );
}

PdpComponent.propTypes = {
  match: object.isRequired,
};

export default PdpComponent;
