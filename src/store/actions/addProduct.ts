import { productsActions } from './actions.type';
import { productModel } from '../../types/models.type';

const addProduct = (payload: productModel | productModel[]) => ({
  type: productsActions.ADD_PRODUCT,
  payload,
});
export default addProduct;
