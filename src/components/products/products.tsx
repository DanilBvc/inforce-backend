import { useEffect, useState } from 'react';
import { unauthorizedRequest } from '../../utils/queries';
import { productById, products } from '../../utils/network';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import ProductsComponent from '../productComponent/productComponent';
import setProducts from '../../store/actions/setProducts';
import './products.scss';
import Modal from '../generall/modal/modal';
import SubmitButton from '../generall/submitButton/submitButton';
import { productModel } from '../../types/models.type';
import deleteProductAction from '../../store/actions/deleteProduct';
const Products = () => {
  const dispatch = useAppDispatch();
  const productsData = useAppSelector((state) => state.productsReducer);
  const [dispayModal, setDispayModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<null | productModel>(null);
  const handleModal = () => setDispayModal(!dispayModal);
  const handleModalProduct = (product: productModel | null) => {
    setDeleteProductId(product);
    setDispayModal(!dispayModal);
  };
  useEffect(() => {
    unauthorizedRequest(products, 'GET')
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteProduct = async () => {
    if (deleteProductId) {
      await unauthorizedRequest(productById(deleteProductId.id), 'DELETE');
      dispatch(deleteProductAction(deleteProductId));
      handleModalProduct(null);
    }
  };
  return (
    <>
      <Modal closeModal={handleModal} open={dispayModal} additionalClass={''}>
        <div className="delete-product-wrapper">
          <p>You sure?</p>
          <div className="buttons-wrapper">
            <SubmitButton text={'Yes'} onClick={deleteProduct} />
            <SubmitButton text={'No'} onClick={handleModal} />
          </div>
        </div>
      </Modal>
      <div className="products-wrapper">
        {productsData.map((product) => (
          <ProductsComponent key={product.id} product={product} close={handleModalProduct} />
        ))}
      </div>
    </>
  );
};
export default Products;
