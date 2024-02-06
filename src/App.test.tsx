import { render, screen } from '@testing-library/react';
import App from './App';

test('Checks the powered by logo appears on the splash screen', () => {
  render(<App />);
  const linkElement = screen.getByText("POWERED BY");
  expect(linkElement).toBeInTheDocument();
});
