import { render, screen } from '@testing-library/react';
import Greeting from '../src/components/Greeting';

describe('Greeting component', () => {
  it('renders greeting message', () => {
    render(<Greeting name="Alice" />);
    expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
  });
});
