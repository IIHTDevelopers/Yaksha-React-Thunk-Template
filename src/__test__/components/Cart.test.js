import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from '../../components/Cart';
import { updateCartItem, removeFromCart } from '../../redux/actions/cartActions';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

jest.mock('../../redux/actions/cartActions', () => ({
    updateCartItem: jest.fn(),
    removeFromCart: jest.fn(),
}));

describe('boundary', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: {
                items: [
                    { id: 1, title: 'Product 1', price: 100, quantity: 2 },
                    { id: 2, title: 'Product 2', price: 200, quantity: 1 },
                ],
            },
        });
    });

    test('CartComponent boundary renders the Cart component with correct content', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(getByText('Your Cart')).toBeInTheDocument();
        expect(getByText('Product 1')).toBeInTheDocument();
        expect(getByText('$100')).toBeInTheDocument();
        expect(getByText('Quantity: 2')).toBeInTheDocument();
        expect(getByText('Product 2')).toBeInTheDocument();
        expect(getByText('$200')).toBeInTheDocument();
        expect(getByText('Quantity: 1')).toBeInTheDocument();
    });

    test('CartComponent boundary handles empty cart correctly', () => {
        store = mockStore({
            cart: {
                items: [],
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(getByText('Your Cart')).toBeInTheDocument();
        expect(getByText('Your cart is empty.')).toBeInTheDocument();
    });
});
