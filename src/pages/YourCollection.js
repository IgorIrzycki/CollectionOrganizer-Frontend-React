import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import OwnedItemSet from '../components/OwnedItemSet';
import OwnedItem from '../components/OwnedItem';
import ConfirmationModal from '../components/ConfirmationModal';
import '../styles/YourCollection.css';
import { useUrl } from '../UrlContext';
import "../styles/pagination.css";


const YourCollection = () => {
  const {url} = useUrl();
  const [user, setUser] = useState(null);
  const [selectedItemSet, setSelectedItemSet] = useState(null);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [itemSetToRemove, setItemSetToRemove] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/user/${localStorage.getItem('username')}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
      }
    };

    fetchUser();
  }, [url]);

  const handleItemSetClick = async (itemSetName) => {
    try {
      const response = await axios.get(`${url}/api/v1/owned-item-set/${user.username}/${itemSetName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSelectedItemSet(response.data);
    } catch (error) {
      console.error('Failed to fetch category:', error.message);
    }
  };

  const handleRemoveItemSet = (itemSetName) => {
    setItemSetToRemove(itemSetName);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmRemoveItemSet = async (enteredName) => {
    if (enteredName === itemSetToRemove) {
      try {
        await axios.delete(`${url}/api/v1/owned-item-set/${user.username}/${itemSetToRemove}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const updatedUser = { ...user };
        updatedUser.ownedItemSets = updatedUser.ownedItemSets.filter(itemSet => itemSet.name !== itemSetToRemove);
        setUser(updatedUser);

        setSelectedItemSet(null);

        setIsConfirmationModalOpen(false);
        alert('Item Set has been deleted!');
      } catch (error) {
        console.error('Failed to remove item set:', error.message);
      }
    } else {
      alert('Entered name does not match. Please try again.');
    }
  };

  const handleGoBack = () => {
    setSelectedItemSet(null);
    setIsRemoveMode(false); 
    setSearchText(''); 
    setCurrentPage(0);
  };

  const handleToggleRemoveMode = () => {
    setIsRemoveMode(!isRemoveMode);
  };

  const handleSearchInputChange = event => {
    setSearchText(event.target.value);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className={`${isRemoveMode ? 'remove-mode' : ''}`}>
        <div className="your-collection-container">
      {user && user.ownedItemSets.length === 0 && !selectedItemSet && (
        <div>
          <h2 className="welcome-message">Welcome to Your Collection, {user.username}!</h2>
          <p>Your collection is empty.</p>
        </div>
      )}
      {(user && user.ownedItemSets.length > 0 && !selectedItemSet) && (
        <div>
          <h2 className="welcome-message">Welcome to Your Collection, {user.username}!</h2>
          <button className="toggle-remove-mode-button" onClick={handleToggleRemoveMode}>
            {isRemoveMode ? 'Exit Remove Mode' : 'Enter Remove Mode'}
          </button>
          <div>
          <div className="item-set-tiles">
            {user.ownedItemSets
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((ownedItemSet, idx) => (
              
              <div key={ownedItemSet.name} className="your-collection-item-set-wrapper">
                <OwnedItemSet
                  itemset={ownedItemSet}
                  onClick={() => handleItemSetClick(ownedItemSet.name)}
                />
                {isRemoveMode && (
                  <button className="remove-button" onClick={() => handleRemoveItemSet(ownedItemSet.name)}>
                    Remove
                  </button>
                )}
              </div>
              
            
            ))}
          </div>
          <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={Math.ceil(user.ownedItemSets.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      )}
      {selectedItemSet && (
        <div>
          <div className='button-search'>
          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
          <input
            type="text"
            placeholder="Search items by name"
            value={searchText}
            onChange={handleSearchInputChange}
          />
          </div>
          <h2> {selectedItemSet.name}: Manage quantities of your items!</h2>
          <div className="item-list">
            {selectedItemSet.ownedItems
              .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
              .slice(currentPage * 5, (currentPage + 1) * 5)
              .map((item, idx) => (
                <OwnedItem item={item} username={user.username} key={item.name} />
              ))}
          </div>
          <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={Math.ceil(selectedItemSet.ownedItems.length / 5)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
        </div>
      )}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onRequestClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmRemoveItemSet}
        itemSetName={itemSetToRemove}
      />
    </div>
    </div>
    
  );
};

export default YourCollection;
