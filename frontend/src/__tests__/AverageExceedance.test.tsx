import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import AverageExceedance from '../components/AverageExceedance';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

beforeEach(() => {
  jest.restoreAllMocks();
});

test('renders loading state', () => {
  render(<AverageExceedance />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders error state', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Failed to fetch'))
  ) as jest.Mock;

  render(<AverageExceedance />);
  expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
});

test('handles empty data gracefully', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
      headers: { get: () => 'application/json' },
    })
  ) as jest.Mock;

  render(<AverageExceedance />);

  await waitFor(() => {
    expect(
      screen.getByText
      (/Top 10 Average Sewage Exceedances per Contaminant Type/i)).toBeInTheDocument();
  });

  // Expect no bars to be rendered if data is empty
  const bars = document.querySelectorAll('rect');
  expect(bars.length).toBe(0);
});