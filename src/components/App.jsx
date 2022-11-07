import React from "react";
import Searchbar from "./Searchbar";
import css from "./App.module.css";

export default class App extends React.Component {
  
  state = {
    searchName: '',
  }

// метод handleSubmitForm  при сабмите формы, в который мы будем прокидывать из Searchbar то, что мы введем
// в инпут. И как следстивие, получим инфо из инпута в App, которую потом можем прокинуть в 
// ImageGalleryItem для HTTP-запроса
  handleSubmitForm = searchName => {
    console.log(searchName);
    this.setState({ searchName });
  }

  render() {
    return (
      < div className={css.App} >
        
        <Searchbar onSubmitProp={this.handleSubmitForm} />
      </div >
)}

}

