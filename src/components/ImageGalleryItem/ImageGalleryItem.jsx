import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ alt, src, largeImageURL, onClick }) {
  return (
    <li className={css.item}>
      <img
        alt={alt}
        src={src}
        onClick={() => onClick(largeImageURL, alt)}
        className={css.image}
      />
    </li>
  );
}

ImageGalleryItem.prototype = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
