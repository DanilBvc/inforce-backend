import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { unauthorizedRequest } from '../../utils/queries';
import { productById } from '../../utils/network';
import setProducts from '../../store/actions/setProducts';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { commentIcon } from '../../assets/global';
import Loading from '../../components/generall/loading/loading';

const Product = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const productData = useAppSelector((state) => state.productsReducer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const splittedUrl = location.pathname.split('/');
    const id = splittedUrl[splittedUrl.length - 1];
    setLoading(true);
    unauthorizedRequest(productById(id), 'GET')
      .then((data) => {
        if (typeof data !== 'number') {
          dispatch(setProducts(data));
        }
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [location.pathname]);
  console.log(productData);
  return (
    <>
      {loading && <Loading />}{' '}
      {productData.length !== 0 && !loading ? (
        <div className="product-items">
          <img src={productData[0].imageUrl} alt={productData[0].name} />
          <div className="product-item-info">
            <div className="product-item-name">{productData[0].name}</div>
            <div className="product-item-count">quantity in stock :{productData[0].count}</div>
            <div className="product-item-size">
              sizes: {productData[0].size.height}height, {productData[0].size.width}width
            </div>
            <div className="product-item-weight">product weight {productData[0].weight}</div>
            <div className="product-item-comments">
              {commentIcon}
              {productData[0].comments.length}
            </div>
          </div>
        </div>
      ) : (
        <div>Nothing found</div>
      )}
    </>
  );
};
export default Product;
