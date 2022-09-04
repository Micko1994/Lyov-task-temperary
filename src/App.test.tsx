import { screen } from '@testing-library/react';

import { render } from 'utils/unit-test';

import App from './App';

describe('App', () => {
  it('renders App correctly', async () => {
    render(<App />);

    expect(await screen.findByTestId('app-root')).toBeInTheDocument();
  });
});
