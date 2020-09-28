import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders bootstrap button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("My Button");
  expect(linkElement).toBeInTheDocument();
});
