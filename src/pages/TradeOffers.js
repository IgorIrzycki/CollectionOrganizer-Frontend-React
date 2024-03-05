import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TradeOffers.css';

const TradeOffer = () => {
  const [userTradeOffers, setUserTradeOffers] = useState([]);
  const [otherUserTradeOffers, setOtherUserTradeOffers] = useState([]);
  const [missingItems, setMissingItems] = useState([]);

  useEffect(() => {
    const fetchUserTradeOffers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/trade-offers/userTradeOffers/${localStorage.getItem('username')}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUserTradeOffers(response.data);
      } catch (error) {
        console.error('Failed to fetch user trade offers:', error.message);
      }
    };

    const fetchOtherUserTradeOffers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/trade-offers/otherUserTradeOffers/${localStorage.getItem('username')}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setOtherUserTradeOffers(response.data);
      } catch (error) {
        console.error('Failed to fetch other user trade offers:', error.message);
      }
    };

    fetchUserTradeOffers();
    fetchOtherUserTradeOffers();
  }, []);

  const handleDeleteTradeOffer = async (offerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/trade-offers/${offerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert("Offer has been deleted!")
      const updatedUserTradeOffers = userTradeOffers.filter((offer) => offer.id !== offerId);
      setUserTradeOffers(updatedUserTradeOffers);
    } catch (error) {
      console.error('Failed to delete trade offer:', error.message);
    }
  };

  const handleConfirmTradeOffer = async (offerId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/trade-offers/confirm/${offerId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response);
  
      if (response.status === 200) {
        setMissingItems([]);
        const updatedUserTradeOffers = otherUserTradeOffers.map((offer) => {
          if (offer.id === offerId) {
            return { ...offer, accepted: true };
          }
          return offer;
        });
        setOtherUserTradeOffers(updatedUserTradeOffers);
      } 
    } catch (error) {
      setMissingItems(error.response.data.missingItems);
      alert(error.response.data.error);
      console.error('Failed to confirm trade offer:', error.message);
    }
  };
  
  

  const handleRejectTradeOffer = async (offerId) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/trade-offers/reject/${offerId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

     
      const updatedUserTradeOffers = otherUserTradeOffers.map((offer) => {
        if (offer.id === offerId) {
          return { ...offer, denied: true };
        }
        return offer;
      });

      setOtherUserTradeOffers(updatedUserTradeOffers);
    } catch (error) {
      console.error('Failed to reject trade offer:', error.message);
    }
  };

  return (
    <div className="trade-offer-container">
      <div className="trade-offer-section">
        <h3>Your Trade Offers</h3>
        {userTradeOffers.length === 0 && (
          <p style={{ marginLeft: '230px' }}> There is no trade offers made by you.</p>
        )}
        <div className="trade-offer-list">
          {userTradeOffers.map((offer) => (
            <div key={offer.id} className="trade-offer-tile" style={{ backgroundColor: '#d8d7f4' }}>
              <h4 style={{ marginLeft: '200px' }}>{`Item Set name: ${offer.itemSetName}`}</h4>
              <p>{`Hi ${offer.username2}!`}</p>
              <p>{`I'm ${offer.username1} and I would love to trade with you!`}</p>
              <p>These are the items I want to offer:</p>
              <ul>
                {offer.selectedItemsToTrade.map((item) => (
                  <li key={item.itemName}>{`${item.quantityUser}x ${item.itemName}`}</li>
                ))}
              </ul>
              <p>And these are the items that I would like from you:</p>
              <ul>
                {offer.selectedWantedItems.map((item) => (
                  <li key={item.itemName}>{`${item.quantityOtherUser}x ${item.itemName}`}</li>
                ))}
              </ul>
              {offer.accepted && <p>Offer Accepted!</p>}
              {offer.denied && <p>Offer Rejected!</p>}
              <button className="delete-button" onClick={() => handleDeleteTradeOffer(offer.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="trade-offer-section">
        <h3>Trade Offers for You</h3>
        {otherUserTradeOffers.length === 0 && (
          <p style={{ marginLeft: '230px' }}>There is no trade offers made for you.</p>
        )}
        <div className="trade-offer-list">
          {otherUserTradeOffers.map((offer) => (
            <div key={offer.id} className="trade-offer-tile" style={{ backgroundColor: '#d7f4d8' }}>
               <h4 style={{ marginLeft: '200px' }}>{`Item Set name: ${offer.itemSetName}`}</h4>
              <p>{`Hi ${offer.username2}!`}</p>
              <p>{`${offer.username1} would love to trade with you!`}</p>
              <p>These are the items they want to offer:</p>
              <ul>
                {offer.selectedItemsToTrade.map((item) => (
                  <li key={item.itemName}>{`${item.quantityUser}x ${item.itemName}`}</li>
                ))}
              </ul>
              <p>And these are the items they would like from you:</p>
              <ul>
                {offer.selectedWantedItems.map((item) => (
                  <li key={item.itemName}>{`${item.quantityOtherUser}x ${item.itemName}`}</li>
                ))}
              </ul>
              {(!offer.accepted && !offer.denied) && (
                <div className='confirm-reject'>
                  <button className="confirm-button" onClick={() => handleConfirmTradeOffer(offer.id)}>
                    Accept
                  </button>
                  <button className="reject-button" onClick={() => handleRejectTradeOffer(offer.id)}>
                    Reject
                  </button>
                </div>
              )}
              {missingItems.length > 0 && (
        <div>
          <p>Missing items:</p>
          <ul>
          {missingItems.map((itemName) => (
            <li key={itemName} style={{ color: 'red' }}>{itemName}</li>
          ))}
          </ul>
        </div>
      )}
              {offer.accepted && <p>Offer Accepted!</p>}
              {offer.denied && <p>Offer Rejected!</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeOffer;
