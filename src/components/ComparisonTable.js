import React from 'react';
import {useNavigate } from 'react-router-dom';
import '../styles/ComparisonTable.css';

const ComparisonTable = ({ username, username2, selectedItemSet, comparisonData }) => {
  const navigate = useNavigate();

  const handleMakeTradeClick = () => {
    const userHasItems = comparisonData.some(row => row.quantityUser > 0);
    const otherUserHasItems = comparisonData.some(row => row.quantityOtherUser > 0);
    
    const selectedItemsUser = comparisonData.filter(row => row.quantityUser > 0);
    const selectedItemUser = selectedItemsUser.length === 1 ? selectedItemsUser[0].itemName : null;
  
    
    const selectedItemsOtherUser = comparisonData.filter(row => row.quantityOtherUser > 0);
    const selectedItemOtherUser = selectedItemsOtherUser.length === 1 ? selectedItemsOtherUser[0].itemName : null;
  
    
    if (selectedItemUser && selectedItemOtherUser && selectedItemUser === selectedItemOtherUser) {
      alert('Both users have only one item and they are the same. You cannot proceed with the trade offer.');
    } else if (userHasItems && otherUserHasItems) {
      const tradeUrl = `/make-trade?username=${username}&username2=${username2}&selectedItemSet=${selectedItemSet}`;
      navigate(tradeUrl);
    } else {
      if (!userHasItems) {
        alert(`You don't have any items to trade.`);
      } else if (!otherUserHasItems) {
        alert(`${username2} doesn't have any items to trade.`);
      } 
    }
  };
  

  return (
    <div className="compare-collections-right">
      {comparisonData.length > 0 ? (
        <div>
          <button className="trade-offer-button" onClick={handleMakeTradeClick}>Make a Trade Offer</button>
          <h3>Comparison Table</h3>
          <div className="legend">
            <p>Legend:</p>
            <div className="legend-item">
              <div className="legend-color highlight-green"></div>
              <span>You have the item, other user doesn't</span>
            </div>
            <div className="legend-item">
              <div className="legend-color highlight-red"></div>
              <span>You don't have the item, other user does</span>
            </div>
          </div>
          <table className="compare-collections-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>{`${username} Quantity`}</th>
                <th>{`${username2} Quantity`}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className={
                    row.quantityUser > 0 && row.quantityOtherUser === 0
                      ? 'highlight-green'
                      : row.quantityUser === 0 && row.quantityOtherUser > 0
                      ? 'highlight-red'
                      : ''
                  }
                >
                  <td>{row.itemName}</td>
                  <td>{row.quantityUser}</td>
                  <td>{row.quantityOtherUser}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      ) : (
        <p>This is the space for the comparison table</p>
      )}
    </div>
  );
};

export default ComparisonTable;
