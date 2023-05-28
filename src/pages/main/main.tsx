import { useState } from 'react';
import DropDownMenu from '../../components/dropDownMenu/dropDownMenu';
import SubmitButton from '../../components/generall/submitButton/submitButton';
import Products from '../../components/products/products';
import './main.scss';
import CreateProductModal from '../../components/createProductModal/createProductModal';
const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <CreateProductModal open={modalOpen} close={handleModal} />
      <div className="main-wrapper">
        <div className="header">
          <DropDownMenu />
          <SubmitButton text={'Create product'} onClick={handleModal} />
        </div>
        <Products />
      </div>
    </>
  );
};
export default Main;
