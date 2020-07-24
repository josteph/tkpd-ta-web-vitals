import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '@routes/Home/components';
import '@testing-library/jest-dom/extend-expect';

describe('[Home] - Test', () => {
  let _getByTestId;

  beforeEach(() => {
    const { getByTestId } = render(<Home />);
    _getByTestId = getByTestId;
  });

  afterEach(cleanup);

  test('Should be able to render', () => {
    expect(_getByTestId('home-container')).toBeInTheDocument();
  });
});
