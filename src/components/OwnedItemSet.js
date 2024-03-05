import React from 'react';
import '../styles/ItemSet.css';

const OwnedItemSet = ({ itemset, onClick }) => {
    const calculateCompletionPercentage = () => {
        const ownedItemCount = itemset.ownedItems.filter(item => item.quantity > 0).length;
        const totalItemCount = itemset.ownedItems.length;

        return totalItemCount === 0 ? 0 : (ownedItemCount / totalItemCount) * 100;
        };
        const ownedItemCount = itemset.ownedItems.filter(item => item.quantity > 0).length;
        const totalItemCount = itemset.ownedItems.length;
        const completionPercentage = calculateCompletionPercentage();
        const completionText = `${completionPercentage.toFixed(0)}% (Owned ${ownedItemCount} out of ${totalItemCount})`;
    
  return (
    <div className="item-set-wrapper">
      <div className="item-set-container" onClick={onClick}>
        <h3>{itemset.name}</h3>
        <p className="description">{itemset.description}</p>
        <div className="image-container">
          <img src={itemset.imageUrl} alt={itemset.name} />
        </div>
        <p className="item-count">{`${itemset.ownedItems.length} Items`}</p>
        <progress
          className="completion-progress"
          value={completionPercentage}
          max="100"
        ></progress>
        <p className="completion-text">{completionText}</p>
      </div>
    </div>
  );
};

export default OwnedItemSet;
