import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChangeInput = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const onSubmitForm = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter a search term.');
      return;
    }

    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <header className={css.bar}>
      <form className={css.form} onSubmit={onSubmitForm}>
        <button className={css.button} type="submit">
          <FaSearch size={20} />
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};

export default Searchbar;
