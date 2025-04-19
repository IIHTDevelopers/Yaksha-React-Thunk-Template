import productReducer from '../../redux/reducers/productReducer';
import { SET_PRODUCTS } from '../../redux/actions/productActions';

describe('boundary', () => {
    const initialState = {
        products: [],
    };

    it('productReducerComponent boundary should return the initial state when an unknown action is passed', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const newState = productReducer(undefined, action);
        expect(newState).toEqual(initialState);
    });

    it('productReducerComponent boundary should set products when SET_PRODUCTS action is passed', () => {
        const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        const action = { type: SET_PRODUCTS, payload: products };
        const expectedState = { ...initialState, products };
        const newState = productReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it('productReducerComponent boundary should not mutate the initial state', () => {
        const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        const action = { type: SET_PRODUCTS, payload: products };
        const stateBefore = { ...initialState };
        productReducer(initialState, action);
        expect(initialState).toEqual(stateBefore);
    });
});
