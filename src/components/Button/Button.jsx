import React from 'react';
import css from './Button.module.css';

export default class Button extends React.Component {
    render() {
        return (
            <button
                onClick={this.props.loadMore}
                className={css.Button}
                type="button"
            >
                Load more
            </button>
        );
    }
}
