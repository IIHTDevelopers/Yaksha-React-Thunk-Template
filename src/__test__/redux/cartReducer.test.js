import cartReducer from '../../redux/reducers/cartReducer';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM } from '../../redux/actions/cartActions';

describe('boundary', () => {
    const initialState = {
        items: [],
    };

    it('cartReducerComponent boundary should return the initial state when an unknown action is passed', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const newState = cartReducer(undefined, action);
        expect(newState).toEqual(initialState);
    });

    it('cartReducerComponent boundary should add a product to the cart when ADD_TO_CART action is passed', () => {
        const product = { id: 1, name: 'Product 1' };
        const action = { type: ADD_TO_CART, payload: product };
        const expectedState = { ...initialState, items: [{ ...product, quantity: 1 }] };
        const newState = cartReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it('cartReducerComponent boundary should increase the quantity of an existing product when ADD_TO_CART action is passed', () => {
        const initialStateWithProducts = { items: [{ id: 1, name: 'Product 1', quantity: 1 }] };
        const product = { id: 1, name: 'Product 1' };
        const action = { type: ADD_TO_CART, payload: product };
        const expectedState = { items: [{ id: 1, name: 'Product 1', quantity: 2 }] };
        const newState = cartReducer(initialStateWithProducts, action);
        expect(newState).toEqual(expectedState);
    });

    it('cartReducerComponent boundary should remove a product from the cart when REMOVE_FROM_CART action is passed', () => {
        const initialStateWithProducts = { items: [{ id: 1, name: 'Product 1', quantity: 1 }] };
        const action = { type: REMOVE_FROM_CART, payload: 1 };
        const expectedState = { items: [] };
        const newState = cartReducer(initialStateWithProducts, action);
        expect(newState).toEqual(expectedState);
    });

    it('cartReducerComponent boundary should update the quantity of a product when UPDATE_CART_ITEM action is passed', () => {
        const initialStateWithProducts = { items: [{ id: 1, name: 'Product 1', quantity: 1 }] };
        const action = { type: UPDATE_CART_ITEM, payload: { productId: 1, quantity: 5 } };
        const expectedState = { items: [{ id: 1, name: 'Product 1', quantity: 5 }] };
        const newState = cartReducer(initialStateWithProducts, action);
        expect(newState).toEqual(expectedState);
    });

    it('cartReducerComponent boundary should not mutate the initial state', () => {
        const initialStateBefore = { items: [] };
        const product = { id: 1, name: 'Product 1' };
        const action = { type: ADD_TO_CART, payload: product };
        cartReducer(initialState, action);
        expect(initialState).toEqual(initialStateBefore);
    });
});
