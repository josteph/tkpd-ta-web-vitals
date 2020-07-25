import React from 'react';
import { useData } from 'react-isomorphic-data';

import Header from '@components/Header';
import RatingReview from '@components/RatingReview';
import Footer from '@components/Footer';

const productWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
  margin: '1em 0',
};

const productCard = {
  width: '40%',
  position: 'relative',
  marginRight: '10px',
  marginBottom: '10px',
  boxShadow: '0 1px 6px 0 rgb(255 255 255 / 0.32)',
  borderRadius: '0 0 8px 8px',
};

const productImg = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
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
};

function Home() {
  const { data, loading } = useData('http://localhost:3000/api/products', {});
  console.log(data);

  return (
    <div className="App" data-testid="home-container">
      <Header />
      <main className="main">
        {!loading && data && (
          <div className="products" style={productWrapper}>
            {data.data.map(item => (
              <div className="product" style={productCard} key={item.id}>
                <img className="product__img" style={productImg} src={item.image} alt={item.name}></img>
                <div style={productInfo}>
                  <div style={productName}>{item.name}</div>
                  <div style={productPrice}>{item.price}</div>
                  <RatingReview ratingCount={item.rating} reviewCount={item.review} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
