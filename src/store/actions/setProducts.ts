import { productsActions } from './actions.type';
import { productModel } from '../../types/models.type';

const setProducts = (payload: productModel | productModel[]) => ({
  type: productsActions.SET_PRODUCTS,
  payload,
});
export default setProducts;
