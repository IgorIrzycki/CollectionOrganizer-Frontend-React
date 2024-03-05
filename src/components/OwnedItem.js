import React, { useState } from 'react';
import axios from 'axios';
import '../styles/OwnedItem.css';

const OwnedItem = ({ item, username }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = async (newQuantity) => {
    setQuantity(newQuantity);

    try {
      await axios.put(
        `http://localhost:8080/api/v1/owned-item/${username}/${item.name}/update-quantity/${newQuantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('Failed to update quantity:', error.message);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      handleQuantityChange(quantity - 1);
    }
  };

  const tileStyle = {
    color: quantity === 0 ? '#b01717' : 'black',
    backgroundColor: quantity === 0 ? '#ff9999' : 'white',
  };

  return (
    <div className="owned-item-tile" style={tileStyle}>
      <h3 title={item.name}>
        {item.name}
      </h3>
      <div className="image-container">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="quantity-container">
        <button className="quantity-button decrement" onClick={handleDecrement}>
          -
        </button>
        <span>{quantity}</span>
        <button className="quantity-button increment" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default OwnedItem;
