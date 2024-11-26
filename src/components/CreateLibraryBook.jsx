import React from "react";

const CreateLibraryBook = ({ onSubmit, newBook, onInputChange, onFileChange }) => {
  return (
    <form onSubmit={onSubmit} className="booked_create-event_form">
      <h2 className="heading-tertiary">Create a New Library Book</h2>

      <div className="booked_craete-container">
        <div className="booked_input-container">
          <label  for="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={newBook.title}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="booked_input-container">
          <label for="author">Author:</label>
          <input
            id="author"
            type="text"
            name="author"
            value={newBook.author}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="booked_input-container">
          <label for="genre">Genre:</label>
          <input
            id="genre"
            type="text"
            name="genre"
            value={newBook.genre}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="booked_input-container">
          <label for="isbn">ISBN:</label>
          <input
            id="isbn"
            type="text"
            name="isbn"
            value={newBook.isbn}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="booked_input-container">
          <label for="available_copies">Copies Available:</label>
          <input
          id="available_copies"
          type="number"
          name="copies_available"
          value={newBook.copies_available}
          onChange={onInputChange}
          min="0"
          required
          />
        </div>

        <div className="booked_input-container">
          <label for="image">Image:</label>  
          <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}
          />
        </div>
        <button type="submit" className="btn">Create Book</button>
      </div>
    </form>
  );
};

export default CreateLibraryBook;
