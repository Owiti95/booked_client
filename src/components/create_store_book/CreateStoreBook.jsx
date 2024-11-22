import React from "react";
import "./create_store_book.css"

const CreateStoreBook = ({ onSubmit, newEvent, onInputChange, onFileChange }) => {
  return (
    <form onSubmit={onSubmit} className="booked_create-event_form">
      <h2 className="heading-tertiary">Create a New Book</h2>
      
      <div className="booked_craete-container">
        <div className="booked_input-container">
          <label for="title">Title</label>
          <input
          id="title"
          type="text"
          name="title"
          value={newEvent.title}
          onChange={onInputChange}
          required/>
        </div>

        <div className="booked_input-container">
          <label for="author">Author</label>
          <input
          id="author"
          type="text"
          name="author"
          value={newEvent.author}
          onChange={onInputChange}
          required/>
        </div>

        <div className="booked_input-container">
          <label for="genre">Genre</label>
          <input
          id="genre"
          type="text"
          name="genre"
          value={newEvent.genre}
          onChange={onInputChange}
          required/>
        </div>

        <div className="booked_input-container">
          <label for="isbn">ISBN</label>
          <input
          type="text"
          name="isbn"
          value={newEvent.isbn}
          onChange={onInputChange}
          required/>
        </div>

        <div className="booked_input-container">
          <label for="price">Price</label>
          <input
          id="price"
          type="number"
          name="price"
          value={newEvent.price}
          onChange={onInputChange}
          min="0"
          step="0.01"
          required/>
        </div>

        <div className="booked_input-container">
          <label for="stock">Stock</label>
          <input
          id="stock"
          type="number"
          name="stock"
          value={newEvent.stock}
          onChange={onInputChange}
          min="0"
          required/>
        </div>

        <div className="booked_input-container">
          <label for="image">Image</label>
          <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}/>
        </div>
        <button type="submit" className="btn">Create Book</button>
      </div>
    </form>
  );
};

export default CreateStoreBook;
