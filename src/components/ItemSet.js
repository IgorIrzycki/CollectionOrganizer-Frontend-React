import React from 'react';
import '../styles/ItemSet.css';

const ItemSet = ({ itemset, onClick }) => {
  return (
    <div className="item-set-wrapper">
      <div className="item-set-container" onClick={onClick}>
        <h3>{itemset.name}</h3>
        <p className="description">{itemset.description}</p>
        <div className="image-container">
          <img src={itemset.imageUrl} alt={itemset.name} />
        </div>
        <p className="item-count">{`${itemset.size} Items`}</p>
      </div>
    </div>
  );
};

export default ItemSet;
