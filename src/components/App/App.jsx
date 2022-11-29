import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../../services/image-api';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import css from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [description, setDescription] = useState('');
  const PER_PAGE = 12;

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    setIsLoading(true);

    fetchImages(searchQuery, page)
      .then(data => {
        setImages(images => [...images, ...data.hits]);
        setTotalHits(Math.ceil(data.totalHits / PER_PAGE));
      })
      .catch(error => console.warn(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, searchQuery]);

  const getSearchRequest = query => {
    if (searchQuery !== query) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
    }
  };

  const onNextFetch = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpenModal = (url, alt) => {
    setLargeImage(url);
    setDescription(alt);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const isButtonVisible = images.length > page && !isLoading;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={getSearchRequest} />
      {images && <ImageGallery images={images} openModal={handleOpenModal} />}
      {isLoading && <Loader />}
      {isButtonVisible && page < totalHits && <Button onClick={onNextFetch} />}
      {showModal && (
        <Modal
          largeImage={largeImage}
          description={description}
          onClose={toggleModal}
        />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
