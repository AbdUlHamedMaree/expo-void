import { render } from '@testing-library/react-native';
import React from 'react';

import { App } from './app';

test('renders correctly', () => {
  const { getByTestId } = render(<App />);
  // expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
