import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';

export default class Searchbar extends React.Component {
    state = {
        searchName: '',
    };
    // метод, який при введенні в інпут інформації заипусує її в state
    handleNameChange = event => {
        this.setState({ searchName: event.currentTarget.value.toLowerCase() });
    };

    // метод відправки форми
    handleSubmitForm = event => {
        // при відправці форми відміняємо перезавантаження сторінки
        event.preventDefault();

        // умова, при якій при спробі відправити пусту форму побачимо підказку
        if (this.state.searchName.trim() === '') {
            return toast.error('Please write your request');
        }

        // передаємо в App значення із state
        this.props.onSubmitProp(this.state.searchName);

        // після відправки форми очищаємо поле вводу
        this.setState({ searchName: '' });
    };

    render() {
        const { handleSubmitForm, handleNameChange } = this;
        const { searchName } = this.state;
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmitForm}>
                    <button type="submit" className={css.SearchForm__button}>
                        <span className={css.SearchForm__button__label}>
                            Search
                        </span>
                        <BiSearch size={20} />
                    </button>

                    <input
                        className={css.SearchForm__input}
                        name="searchImg"
                        value={searchName}
                        onChange={handleNameChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}
