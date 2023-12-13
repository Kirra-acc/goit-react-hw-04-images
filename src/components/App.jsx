import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPhotos } from 'Services/Services';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [imagesData, setImagesData] = useState([]);
  const [userInput, setUserInput] = useState('sakura');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState('');

  // useEffect(() => {
  //   async function getImages() {
  //     try {
  //       setLoader(true);
  //       const images = await getPhotos(userInput, page);
  //       setImagesData(images.hits);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoader(false);
  //     }
  //   }
  //   getImages();
  // }, [page, userInput]);

  useEffect(() => {
    async function addImmages() {
      // if (userInput !== prevState.userInput || prevState.page !== page) {
      try {
        setLoader(true);
        const images = await getPhotos(userInput, page);
        if (page === 1) {
          setImagesData(images.hits);
        } else {
          setImagesData(prevState => [...prevState, ...images.hits]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    // }
    addImmages();
  }, [userInput, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  const onSubmit = event => {
    event.preventDefault();
    setPage(1);
    // setLoader(true);
    const inputResult = event.currentTarget.elements.input.value;
    setUserInput(inputResult);
    setImagesData([]);
  };
  const openModal = imgUrl => {
    setIsOpenedModal(prev => !prev);
    setModalImgUrl(imgUrl);
  };

  const closeModal = () => {
    setIsOpenedModal(prev => !prev);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery imagesData={imagesData} openModal={openModal} />
      {imagesData.length !== 0 ? <Button updatePage={handleLoadMore} /> : null}
      {loader === true ? <Loader /> : null}
      {isOpenedModal && (
        <Modal closeModal={closeModal} modalImgUrl={modalImgUrl} />
      )}
    </div>
  );
};
