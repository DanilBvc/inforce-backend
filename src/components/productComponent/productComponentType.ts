import { productModel } from '../../types/models.type';

export type productComponentProps = {
  product: productModel;
  close: (id: productModel) => void;
};
