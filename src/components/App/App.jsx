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
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const PER_PAGE = 12;

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    setIsLoading(true);

    fetchImages(searchQuery, page)
      .then(({ hits, totalHits }) => {
        setImages(prevState => [...prevState, ...imagesArray]);
        setTotalImages(Math.ceil(totalHits / PER_PAGE));
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          description: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));
      })
      .catch(() => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, page, error]);

  const getSearchRequest = query => {
    if (searchQuery !== query) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
    }
  };

  const onNextFetch = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  const handleOpenModal = largeImage => {
    setShowModal(true);
    setLargeImage(largeImage);
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
      {isButtonVisible && page < totalImages && (
        <Button onClick={onNextFetch} />
      )}
      {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
