import { render, screen } from '@testing-library/react';
import App from './App';

test('renders intro section', () => {
  render(<App />);
  const linkElement = screen.getByText(/Introduction/i);
  expect(linkElement).toBeInTheDocument();
});
