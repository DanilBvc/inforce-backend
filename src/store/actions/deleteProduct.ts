import { productsActions } from './actions.type';
import { productModel } from '../../types/models.type';

const deleteProductAction = (payload: productModel | productModel[]) => ({
  type: productsActions.DELETE_PRODUCT,
  payload,
});
export default deleteProductAction;
