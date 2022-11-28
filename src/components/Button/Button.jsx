import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ onClick }) {
  return (
    <button className={css.button_load} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
