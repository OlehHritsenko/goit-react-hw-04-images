// import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          alt={image.tags}
          src={image.webformatURL}
          largeImageURL={image.largeImageURL}
          onClick={openModal}
        />
      ))}
    </ul>
  );
}

// ImageGallery.prototype = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       tags: PropTypes.string,
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

export default ImageGallery;
