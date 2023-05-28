import { productModel } from '../../types/models.type';
import { productsActions } from '../actions/actions.type';
import { initialState } from '../initialState/initialState';

const productsReducer = (
  state = initialState,
  action: {
    type: string;
    payload: productModel[] | productModel;
  }
): typeof initialState => {
  switch (action.type) {
    case productsActions.SET_PRODUCTS: {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        return [...payload];
      }
      return [payload];
    }
    case productsActions.ADD_PRODUCT: {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        return [...state, ...payload];
      }
      return [...state, payload];
    }
    case productsActions.DELETE_PRODUCT: {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        return state;
      }
      return state.filter((product) => product !== payload);
    }

    default:
      return state;
  }
};

export default productsReducer;
