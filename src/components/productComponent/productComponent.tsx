import { FC } from 'react';
import { commentIcon } from '../../assets/global';
import { productComponentProps } from './productComponentType';
import SubmitButton from '../generall/submitButton/submitButton';
import './productComponent.scss';
import { useNavigate } from 'react-router-dom';
const ProductsComponent: FC<productComponentProps> = ({ product, close }) => {
  const { imageUrl, name, size, comments, count, weight } = product;
  const navigate = useNavigate();

  return (
    <div className="product-items">
      <img src={imageUrl} alt={name} />
      <div className="product-item-info">
        <div className="product-item-name">{name}</div>
        <div className="product-item-count">quantity in stock :{count}</div>
        <div className="product-item-size">
          sizes: {size.height}height, {size.width}width
        </div>
        <div className="product-item-weight">product weight {weight}</div>
        <div className="product-item-comments">
          {commentIcon}
          {comments.length}
        </div>
      </div>
      <div className="buttons-wrapper">
        <SubmitButton
          text={'delete'}
          onClick={() => {
            close(product);
          }}
        />
        <SubmitButton
          text={'descriptiion'}
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
        />
      </div>
    </div>
  );
};
export default ProductsComponent;
