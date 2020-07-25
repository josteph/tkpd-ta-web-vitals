import React from 'react';
import { useData } from 'react-isomorphic-data';

import Header from '@components/Header';
import Footer from '@components/Footer';

function Home() {
  const { data, loading } = useData('http://localhost:3000/api/products', {});
  console.log(data);

  return (
    <div className="App" data-testid="home-container">
      <Header />
      <main className="App-header">
        {!loading && data && (
          <div className="products">
            {data.data.map(item => (
              <div className="product" key={item.id}>
                <img className="product__img" src={item.image} alt={item.name}></img>
                <span className="product__name">{item.name}</span>
                <span className="product__price">{item.price}</span>
                <span className="product__review">{item.review}</span>
                <span className="product__rating">{item.rating}</span>
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
