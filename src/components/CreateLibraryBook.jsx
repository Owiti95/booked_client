import React from "react";

const CreateLibraryBook = ({ onSubmit, newBook, onInputChange, onFileChange }) => {
  return (
    <form onSubmit={onSubmit} className="create-book-form">
      <h2>Create a New Library Book</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={newBook.isbn}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        Copies Available:
        <input
          type="number"
          name="copies_available"
          value={newBook.copies_available}
          onChange={onInputChange}
          min="0"
          required
        />
      </label>

      <label>
        Image:
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}
        />
      </label>

      <button type="submit">Create Library Book</button>
    </form>
  );
};

export default CreateLibraryBook;
