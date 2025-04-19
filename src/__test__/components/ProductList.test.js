import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductList from '../../components/ProductList';
import { fetchProducts } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';
import '@testing-library/jest-dom';

jest.mock('../../redux/actions/productActions');
jest.mock('../../redux/actions/cartActions');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('boundary', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            products: { products: [] },
        });
        fetchProducts.mockImplementation(() => ({ type: 'FETCH_PRODUCTS' }));
        addToCart.mockImplementation(() => ({ type: 'ADD_TO_CART' }));
    });

    it('ProductListComponent boundary should display loading message initially', () => {
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
        expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    it('ProductListComponent boundary should display products when fetched', () => {
        store = mockStore({
            products: { products: [{ id: 1, title: 'Product 1', price: 100 }] },
        });
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
    });

    it('ProductListComponent boundary should dispatch addToCart action when Add to Cart button is clicked', () => {
        store = mockStore({
            products: { products: [{ id: 1, title: 'Product 1', price: 100 }] },
        });
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
        fireEvent.click(screen.getByText('Add to Cart'));
        expect(addToCart).toHaveBeenCalledWith({ id: 1, title: 'Product 1', price: 100 });
    });
});
