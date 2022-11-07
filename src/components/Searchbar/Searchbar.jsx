import React from "react";
import css from "./Searchbar.module.css";
import { BiSearch } from "react-icons/bi";


export default class Searchbar extends React.Component {
    state = {
        searchName: '',
    }

    // метод, который при вводе в инпут записывает текст в state
    handleNameChange = event => {
        this.setState({ searchName: event.currentTarget.value.toLowerCase() });
    }


    handleSubmitForm = event => {
        event.preventDefault();

        if (this.state.searchName.trim() === '') {
            alert('Please write your request')
            return
        }
        
        // передаем в App значение из state
        this.props.onSubmitProp(this.state.searchName);

        // после отправки формы очищаем поле ввода
        this.setState({ searchName: '' });
    }

    render() {
        return (
            <header className={css.Searchbar}>
  <form className={css.SearchForm} onSubmit = {this.handleSubmitForm}>
        <button
            ype="submit"
             className={css.SearchForm__button}>
            <span className={css.SearchForm__button__label}>
            Search</span>
            <BiSearch size={20}/>
               
    </button>

    <input
        className={css.SearchForm__input}
        name="searchImg"
        value={this.state.searchName}
        onChange={this.handleNameChange}
                        
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
    }

}

