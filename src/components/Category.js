import React from 'react';
import '../styles/Category.css';

const Category = ({ category, onClick }) => {
  return (
    <div className="category-item" onClick={onClick}>
      <h3>{category.name}</h3>
      <p className="description">{category.description}</p>
      <div className="image-container">
        <img src={category.imageUrl} alt={category.name} />
      </div>
      <p className="item-set-count">{`${category.size} Item Sets`}</p>
    </div>
  );
};

export default Category;
