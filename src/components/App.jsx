import React from 'react';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export default class App extends React.Component {
    state = {
        searchName: '',
    };

    // метод handleSubmitForm при сабміті форми, в який ми прокидуємо із Searchbar те, що введемо в інпу.
    // А потім цю інфу зможемо прокинути в ImageGallery щоб зробити запит з API
    handleSubmitForm = searchName => {
        this.setState({ searchName });
    };

    render() {
        return (
            <div className={css.App}>
                <Searchbar onSubmitProp={this.handleSubmitForm} />
                {/* передаємо значення зі стейту в ImageGallery як пропс (щоб вже там зробити запит на сервер) */}
                <ImageGallery searchName={this.state.searchName} />
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}
