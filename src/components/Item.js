import React from 'react';
import '../styles/Item.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item = ({ item, selectedItemSet, categoryName}) => {
  const navigate = useNavigate();
  const handleAddToCollectionClick = () => {
    const payload = {
      name: selectedItemSet.name,
      description: selectedItemSet.description, 
      imageUrl: selectedItemSet.imageUrl, 
      clickedItemName: item.name, 
      username: localStorage.getItem('username'),
      categoryName: categoryName
    };

    axios.post('http://localhost:8080/api/v1/owned-item-set', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      console.log('Item added to collection:', response.data);
      alert('Item added to collection, as well as the whole item set!')
    })
    .catch((error) => {
      console.error('Failed to add item to collection:', error.message);
      navigate('/home');
      setTimeout(() => {
        alert('You already have the opened item set, check your collection!');
      }, 0);
    });
  };

  return (
    <div className="item-wrapper">
      <div className="item-container">
        <h3>{item.name}</h3>
        <div className="image-container">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <button onClick={handleAddToCollectionClick}>Add to Collection</button>
      </div>
    </div>
  );
};

export default Item;
