import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MakeTrade.css';

const MakeTrade = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');
  const username2 = params.get('username2');
  const selectedItemSet = params.get('selectedItemSet');
  const [comparisonData, setComparisonData] = useState([]);
  const [selectedItemsToTrade, setSelectedItemsToTrade] = useState([]);
  const [selectedWantedItems, setSelectedWantedItems] = useState([]);
  const [secondStep, setSecondStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [selectedItemsQuantity, setSelectedItemsQuantity] = useState({});
  const [selectedWantedItemsQuantity, setSelectedWantedItemsQuantity] = useState({});
  const isAnyItemChecked = comparisonData.some((item) => item.isChecked);


  const handleCompareUser = async () => {
    try {
      const responseUser = await axios.get(`http://localhost:8080/api/v1/owned-item-set/${username}/${selectedItemSet}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const responseOtherUser = await axios.get(`http://localhost:8080/api/v1/owned-item-set/${username2}/${selectedItemSet}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const itemsUser = responseUser.data.ownedItems || [];
      const itemsOtherUser = responseOtherUser.data.ownedItems || [];

      const tableData = itemsUser.map((item, index) => {
        const quantityUser = item.quantity || 0;
        const quantityOtherUser = itemsOtherUser[index] ? itemsOtherUser[index].quantity || 0 : 0;

        return {
          itemName: item.name,
          quantityUser,
          quantityOtherUser,
          isChecked: false,
        };
      });

      setComparisonData(tableData);
    } catch (error) {
      console.error('Failed to compare users:', error.message);
    }
  };

  useEffect(() => {
    handleCompareUser();
  }, []); 

  const handleCheckboxChange = (index) => {
    setComparisonData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        isChecked: !updatedData[index].isChecked,
      };
      return updatedData;
    });
  };

  const handleNextButtonClick = () => {
    if (isAnyItemChecked) {
      const selectedItems = comparisonData.filter((item) => item.isChecked);
      setSelectedItemsToTrade(selectedItems);
      const updatedData = comparisonData.map((item) => ({
        ...item,
        isChecked: selectedWantedItems.some((selectedItem) => selectedItem.itemName === item.itemName),
      }));
      setComparisonData(updatedData);

      setSecondStep(true);
    } else {
      alert('Please select at least one item before proceeding.');
    }
  };

  const handleBackButtonClick = () => {
    const selectedItems = comparisonData.filter(item => item.isChecked);
    setSelectedWantedItems(selectedItems);
    const updatedData = comparisonData.map((item) => ({
      ...item,
      isChecked: selectedItemsToTrade.some((selectedItem) => selectedItem.itemName === item.itemName),
    }));
    setComparisonData(updatedData);
    setSecondStep(false);
    setThirdStep(false);
  };
  
  const handleNextButtonClick2 = () => {
    if (isAnyItemChecked) {
      const selectedItems = comparisonData.filter((item) => item.isChecked);
      setSelectedWantedItems(selectedItems);
      setComparisonData((prevData) => {
        const updatedData = prevData.map((item) => ({ ...item, isChecked: false }));
        return updatedData;
      });
      setSecondStep(false);
      setThirdStep(true);
    } else {
      alert('Please select at least one item before proceeding.');
    }
  };

  const handleBackButtonClick2 = () => {
    const updatedData = comparisonData.map((item) => ({
      ...item,
      isChecked: selectedWantedItems.some((selectedItem) => selectedItem.itemName === item.itemName),
    }));
    setComparisonData(updatedData);
    setSecondStep(true);
    setThirdStep(false);
  };

  const handleSelectedItemsQuantityChange = (itemName, quantity) => {
    setSelectedItemsQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemName]: Math.max(1, Math.min(quantity, selectedItemsToTrade.find(item => item.itemName === itemName)?.quantityUser || 1)),
    }));
  };
  
  
  const handleSelectedWantedItemsQuantityChange = (itemName, quantity) => {
    setSelectedWantedItemsQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemName]: Math.max(1, Math.min(quantity, selectedWantedItems.find(item => item.itemName === itemName)?.quantityOtherUser || 1)),
    }));
  };

  const handleFinishTradeOffer = async () => {
    try {
      const updatedSelectedItemsToTrade = selectedItemsToTrade.map(({ quantityOtherUser, ...item }) => {
        const quantity = selectedItemsQuantity[item.itemName];
        return {
          ...item,
          quantityUser: quantity ? Math.max(1, quantity) : 1,
        };
      });
  
      const updatedSelectedWantedItems = selectedWantedItems.map(({ quantityUser, ...item }) => {
        const quantity = selectedWantedItemsQuantity[item.itemName];
        return {
          ...item,
          quantityOtherUser: quantity ? Math.max(1, quantity) : 1,
        };
      });
  
      const tradeOfferData = {
        itemSetName: selectedItemSet,
        username1: username,
        username2: username2,
        selectedItemsToTrade: updatedSelectedItemsToTrade,
        selectedWantedItems: updatedSelectedWantedItems,
        isDenied: false,
        isAccepted: false,
      };
  
      const token = localStorage.getItem('token');
  
      const response = await axios.post('http://localhost:8080/api/v1/trade-offers', tradeOfferData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        console.log('Trade offer successfully submitted.');
        navigate('/home');
        alert('Trade offer successfully submitted.');
      } else {
        console.error('Failed to submit trade offer:', response.status, response.statusText);
        alert('Failed to submit trade offer. Please try again.');
      }
    } catch (error) {
      console.error('Failed to finish trade offer:', error.message);
      alert('An error occurred while submitting the trade offer. Please try again.');
    }
  };
  

  return (
    <div className='make-trade-container'>
        {!thirdStep && (
           <div className="make-trade-legend">
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
        )}
      
      {(!secondStep && !thirdStep) && (
        <>
          {comparisonData.length > 0 && (
            <div>
              <div className='make-trade-header'>
              <h3>Choose items from your collection that you want to offer</h3>
              </div>
                
            <div className='make-trade-table-container'>
                <table className="make-trade-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>{`(${username}) Your Quantity`}</th>
                  <th>{`${username2} Quantity`}</th>
                  <th>Checkbox</th>
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
                    <td>
                      {row.quantityUser > 0 && (
                        <input
                          type="checkbox"
                          checked={row.isChecked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            </div>
          )}
          <div className='make-trade-button-container'>
            <button className="make-trade-button" onClick={handleNextButtonClick}>Next</button>
          </div>
          
        </>
      )}
      {(secondStep  && !thirdStep)&& (
        <>
          {comparisonData.length > 0 && (
            <div>
              <div className='make-trade-header'>
              <h3>Choose items that you would like from other user collection</h3>
            </div>
              
                <div className='make-trade-table-container'>
                <table className="make-trade-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>{`(${username}) Your Quantity`}</th>
                  <th>{`${username2} Quantity`}</th>
                  <th>Checkbox</th>
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
                    <td>
                      {row.quantityOtherUser > 0 && (
                        <input
                          type="checkbox"
                          checked={row.isChecked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            </div>
            
            
          )}
          <div className='make-trade-button-container'>
            <button className="make-trade-button" onClick={handleBackButtonClick}>Back</button>
            <button className="make-trade-button" onClick={handleNextButtonClick2}>Next</button>
          </div>
          
        </>
      )}
      {(!secondStep && thirdStep) && (
        <div className='make-trade-container'>
          <div className='table2-inrow'>
          <div className='make-trade-table-container2'>
            <div className="make-trade-table">
              <h2>Selected Items to Trade:</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>{`(${username}) Your Quantity`}</th>
                    <th>{`${username2} Quantity`}</th>
                    <th>Select Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItemsToTrade.map((row, index) => (
                    <tr key={index}>
                      <td>{row.itemName}</td>
                      <td>{row.quantityUser}</td>
                      <td>{row.quantityOtherUser}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max={row.quantityUser}
                          value={selectedItemsQuantity[row.itemName] || 1}
                          onChange={(e) => handleSelectedItemsQuantityChange(row.itemName, parseInt(e.target.value, 10))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className='make-trade-table-container2'>
            <div className="make-trade-table">
              <h2>Selected Wanted Items:</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>{`(${username}) Your Quantity`}</th>
                    <th>{`${username2} Quantity`}</th>
                    <th>Select Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedWantedItems.map((row, index) => (
                    <tr key={index}>
                      <td>{row.itemName}</td>
                      <td>{row.quantityUser}</td>
                      <td>{row.quantityOtherUser}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max={row.quantityOtherUser}
                          value={selectedWantedItemsQuantity[row.itemName] || 1}
                          onChange={(e) => handleSelectedWantedItemsQuantityChange(row.itemName, parseInt(e.target.value, 10))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
          
          

          <div className='make-trade-button-container'>
            <button className="make-trade-button" onClick={handleBackButtonClick2}>Back</button>
            <button className="make-trade-button" onClick={handleFinishTradeOffer}>Finish Trade Offer</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default MakeTrade;
