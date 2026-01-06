import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


jest.mock('react-tech-radar', () => () => <div data-testid="radar" />, { virtual: true } );
describe('App (Tech Radar)', () => {
  test('renders the Tech Radar header', () => {
    render(<App />);
    expect(screen.getByText(/CBG Tech Radar/i)).toBeInTheDocument();
  });

  test('renders the Radar component (mocked)', () => {
    render(<App />);
    expect(screen.getByTestId('radar')).toBeInTheDocument();
  });
});
