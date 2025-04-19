import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import ProductList from '../../src/components/ProductList';
import Cart from '../components/Cart';
import '@testing-library/jest-dom';

jest.mock('../../src/components/ProductList');
jest.mock('../components/Cart');

describe('boundary', () => {
  beforeEach(() => {
    ProductList.mockImplementation(() => <div>ProductList Component</div>);
    Cart.mockImplementation(() => <div>Cart Component</div>);
  });

  test('AppComponent boundary renders the App component with correct content', () => {
    const { getByText } = render(<App />);

    // Check if the heading is rendered
    expect(getByText('Product Inventory')).toBeInTheDocument();

    // Check if the ProductList component is rendered
    expect(getByText('ProductList Component')).toBeInTheDocument();

    // Check if the Cart component is rendered
    expect(getByText('Cart Component')).toBeInTheDocument();
  });
});
