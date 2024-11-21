import React from "react";

const CreateStoreBook = ({ onSubmit, newEvent, onInputChange, onFileChange }) => {
  return (
    <form onSubmit={onSubmit} className="create-event-form">
      <h2>Create a New Book</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          name="author"
          value={newEvent.author}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={newEvent.genre}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        ISBN:
        <input
          type="text"
          name="isbn"
          value={newEvent.isbn}
          onChange={onInputChange}
          required
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={newEvent.price}
          onChange={onInputChange}
          min="0"
          step="0.01"
          required
        />
      </label>

      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={newEvent.stock}
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

      <button type="submit">Create Book</button>
    </form>
  );
};

export default CreateStoreBook;
