import FormError from '../generall/formError/formError';
import InputField from '../generall/inputField/inputField';
import Modal from '../generall/modal/modal';
import SubmitButton from '../generall/submitButton/submitButton';
import { FC, useState } from 'react';
import { unauthorizedRequest } from '../../utils/queries';
import { createProductModalProps } from './createProduct.type';
import { baseUrl, products, uploadImg } from '../../utils/network';
import './createProduct.scss';
import { useAppDispatch } from '../../store/hooks/hooks';
import addProduct from '../../store/actions/addProduct';
import BrowseFileModal from '../generall/browseFileModal/browseFileModal';
import axios from 'axios';
const CreateProductModal: FC<createProductModalProps> = ({ open, close }) => {
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [modalData, setModalData] = useState({
    imageUrl: '',
    name: '',
    count: 0,
    size: {
      width: '',
      height: '',
    },
    weight: '',
    comments: [],
  });
  const dispatch = useAppDispatch();
  const submitProduct = async () => {
    try {
      const data = await unauthorizedRequest(products, 'POST', modalData);
      console.log(data);
      dispatch(addProduct(data));
      close();
    } catch (err) {
      setError(true);
      setErrorText(`${err}`);
    }
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    formData.append('image', file as File);
    try {
      const { data } = await axios.post(uploadImg, formData);
      setModalData({ ...modalData, imageUrl: `${baseUrl}${data.url}` });
    } catch (err) {
      setError(true);
      setErrorText('Only .png, .jpg and .jpeg format allowed!');
    }
    setUploadImageModal(false);
  };
  const onImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('image', file as File);
    try {
      const { data } = await axios.post(uploadImg, formData);
      setModalData({ ...modalData, imageUrl: `${baseUrl}${data.url}` });
    } catch (err) {
      setError(true);
      setErrorText('Only .png, .jpg and .jpeg format allowed!');
    }
    setUploadImageModal(false);
  };

  return (
    <>
      <Modal closeModal={close} open={open} additionalClass={'modal-product'}>
        <FormError errorText={errorText} appear={error} />
        <div className="create-product-content">
          <SubmitButton
            text={'upload product img'}
            onClick={() => {
              setUploadImageModal(!uploadImageModal);
            }}
          />
          <InputField
            type={'text'}
            name={'name'}
            value={modalData.name}
            isSearch={false}
            placeholder={'name'}
            label={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setModalData({ ...modalData, name: e.target.value });
            }}
          />
          <InputField
            type={'number'}
            name={'count'}
            value={modalData.count}
            isSearch={false}
            placeholder={'count'}
            label={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setModalData({ ...modalData, count: +e.target.value });
            }}
          />
          <InputField
            type={'text'}
            name={'width'}
            value={modalData.size.width}
            isSearch={false}
            placeholder={'width'}
            label={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setModalData({
                ...modalData,
                size: { width: e.target.value, height: modalData.size.height },
              });
            }}
          />
          <InputField
            type={'text'}
            name={'height'}
            value={modalData.size.height}
            isSearch={false}
            placeholder={'height'}
            label={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setModalData({
                ...modalData,
                size: { height: e.target.value, width: modalData.size.width },
              });
            }}
          />
          <InputField
            type={'text'}
            name={'weight'}
            value={modalData.weight}
            isSearch={false}
            placeholder={'weight'}
            label={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setModalData({ ...modalData, weight: e.target.value });
            }}
          />
          <div className="modal-buttons">
            <SubmitButton
              text={'Send'}
              onClick={() => {
                submitProduct();
              }}
            />
            <SubmitButton
              text={'Cancel'}
              onClick={() => {
                close();
              }}
            />
          </div>
        </div>
      </Modal>
      <BrowseFileModal
        inputFileOnChange={onImageChange}
        inputOnDropEvent={onImageDrop}
        closeModal={() => setUploadImageModal(!uploadImageModal)}
        open={uploadImageModal}
        inputText={'add product image'}
        multiple={false}
      />
    </>
  );
};
export default CreateProductModal;
