import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
    largeImageURL,
    webformatURL,
    tags,
    toogleModal,
}) => (
    <li
        //   при кліку на кожну лішку(зображення) викликаємо метод toogleModal (що знаходиться в ImageGallery),
        // передаючи йому як параметри true - що запишеться в showModal, посилання на велике зображення та назву зображення
        onClick={() => toogleModal(true, largeImageURL, tags)}
        className={css.ImageGalleryItem}
    >
        <img
            className={css.ImageGalleryItem_image}
            src={webformatURL}
            alt={tags}
        />
    </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    toogleModal: PropTypes.func.isRequired,
};
