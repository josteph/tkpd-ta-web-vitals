/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { number } from 'prop-types';

const ratingStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '12px',
  marginTop: '10px',
};

const reviewSpanStyle = {
  marginLeft: '5px',
};

const createArray = n => {
  const res = [];
  for (let index = 0; index < n; index++) {
    res.push(index);
  }
  return res;
};

const RatingAndReview = ({ ratingCount, reviewCount }) => {
  const ratingArray = createArray(ratingCount);

  return (
    <div style={ratingStyle}>
      {ratingArray.map((i, index) => (
        <span key={index}>⭐️</span>
      ))}
      <span style={reviewSpanStyle}>({reviewCount} review)</span>
    </div>
  );
};

RatingAndReview.propTypes = {
  ratingCount: number.isRequired,
  reviewCount: number.isRequired,
};

export default RatingAndReview;
