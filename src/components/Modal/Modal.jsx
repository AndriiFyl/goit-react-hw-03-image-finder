import React from 'react';
import css from './Modal.module.css';

export default class Modal extends React.Component {
    // метод для закриття модалки при натисканні по ESC
    handlePress = event => {
        if (event.keyCode === 27) {
            // якщо натискаємо ESC, то передаємо в компонент ImageGallery (в його метод toogleModal )
            // наступні параметри (які запишуться у state в ImageGallery)
            this.props.toogleModal(false, '');
        }
    };

    handleBackdropClick = event => {
        // console.log(
        //     'Найвищий елемент, де спрацювала подія:',
        //     event.currentTarget
        // );
        // console.log('Реальний елемент, в який клікнули:', event.target);

        // умова: якщо найвищий елемент та реальний, на які клікнули співпадають,
        // то закриваємо модалку (значить ми натиснули саме в бекдроп, а не в модалку.
        // Якби не було умови, то при натисканні на картинку модалка також закривалась би)
        if (event.target === event.currentTarget) {
            this.props.toogleModal(false, '');
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handlePress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlePress);
    }

    render() {
        return (
            <div className={css.Overlay} onClick={this.handleBackdropClick}>
                <div className={css.Modal}>
                    {/* як this.props.children передаємо сюди розмітку з ImageGallery  */}
                    {this.props.children}
                </div>
            </div>
        );
    }
}
