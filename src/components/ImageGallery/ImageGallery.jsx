import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import Button from 'components/Button';

const api = 'https://pixabay.com/api/';
const key = '30104911-8e1ad95cd3a35152ba7eccb47';
const imageType = 'image_type=photo&orientation=horizontal';

export default class ImageGallery extends React.Component {
    state = {
        searchInfo: [],
        loading: false,
        error: null,
        showModal: false,
        imageModalUrl: '',
        tags: '',
        page: 1,
    };

    // Метод відкриття/закриття модалки (передаємо його далі як пропс до компонента ImageGalleryItem )
    toogleModal = (showModal, imageModalUrl, tags) => {
        this.setState(() => ({
            imageModalUrl,
            showModal,
            tags,
        }));
    };

    // метод оновлення інфи  в ImageGallery

    componentDidUpdate(prevProps, prevState) {
        // умова: якщо назва попереднього запиту не така як назва існуючого, чи попередня сторінка(номер) не така як існуюча
        // то:
        if (
            prevProps.searchName !== this.props.searchName ||
            prevState.page !== this.state.page
        ) {
            // ще одна підумова: якщо назва попереднього запиту не така як назва існуючого -
            // перезапишемо в стейт номер сторінки (на першу) та очистимо в стейті масив попередніх об'єктів
            if (prevProps.searchName !== this.props.searchName) {
                this.setState({ page: 1, searchInfo: [] });
            }
            // активізуємо спінер перед фетчем
            this.setState({ loading: true });
            // https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
            fetch(
                `${api}?q=${this.props.searchName}&key=${key}&${imageType}&per_page=12&page=${this.state.page}`
            )
                .then(response => {
                    // Умова, щоб спіймати помилку 404
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(
                        new Error(
                            `No results for request ${this.props.searchName}`
                        )
                    );
                })
                //     Коли запит успішний і сервер надає нам коректну інформацію, то ми записуємо (розпилюємо) її в стейт,
                //     звернувшись до вкладеного об'єкту hits
                .then(response => {
                    this.setState(({ searchInfo }) => ({
                        searchInfo: [...searchInfo, ...response.hits],
                    }));
                    if (response.hits.length === 0) {
                        toast('Not found');
                    }
                })
                .catch(error => this.setState({ error: error }))
                // в будь-якому випадку в стейт запишемо значення loading як false (як, тільки картинки зарендерилися -
                //    спінер зникав)
                .finally(() => this.setState({ loading: false }));
        }
    }

    // метод підвантаження картиннок при натисканні на кнопку
    loadMore = () => {
        // кожного разу при натисканні в стейті більшуємо номер сторінки на 1
        this.setState(({ page }) => ({ page: page + 1 }));
    };

    render() {
        const { searchInfo, loading, error, showModal, imageModalUrl, tags } =
            this.state;
        const { toogleModal } = this;

        return (
            <div>
                {/* в компонент модалки прокидуємо 2 пропси: imageModalUrl - посилання на велике зображення зі стейту
                та метод toogleModal */}
                {showModal && (
                    // перевикористовуємо модалку: в цьому ж компоненті (в якому
                    //  вона рендериться - записуємо її розмітку). А вже в самому компоненті Modal Записуємо
                    //  загальний вигляд модалки: сірий бекдроп та вікно, які можемо перевикористовувати.
                    <Modal toogleModal={toogleModal}>
                        <img src={imageModalUrl} alt={tags} />
                    </Modal>
                )}
                {error && <h1>{error.message}</h1>}
                {loading && <Loader />}

                <ul className={css.ImageGallery}>
                    {searchInfo.length > 0 &&
                        searchInfo.map(image => {
                            return (
                                <ImageGalleryItem
                                    // прокидуємо до компонента як пропс
                                    toogleModal={toogleModal}
                                    key={image.id}
                                    largeImageURL={image.largeImageURL}
                                    webformatURL={image.webformatURL}
                                    tags={image.tags}
                                />
                            );
                        })}
                </ul>
                {searchInfo.length > 0 && <Button loadMore={this.loadMore} />}
            </div>
        );
    }
}
