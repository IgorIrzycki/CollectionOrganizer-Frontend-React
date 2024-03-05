import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YourItemSetsTable from '../components/YourItemSetsTable';
import SearchUsersTable from '../components/SearchUsersTable';
import ComparisonTable from '../components/ComparisonTable';
import '../styles/CompareCollections.css';

const CompareCollections = () => {
  const [user, setUser] = useState(null);
  const [user2, setUser2] = useState(null);
  const [selectedItemSet, setSelectedItemSet] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isComparisonSelected, setIsComparisonSelected] = useState(false);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/${localStorage.getItem('username')}`, {
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
  }, []);

  const handleCompareClick = async (itemSetName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/owned-item-set`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const allOwnedItemSets = response.data;

      const matchingItemSets = allOwnedItemSets.filter(ownedItemSet => ownedItemSet.name === itemSetName);

      if (matchingItemSets.length > 0) {
        const users = matchingItemSets
          .flatMap(ownedItemSet => ownedItemSet.ownedBy)
          .filter(username => username !== user.username);

        setSearchResults(users);
        setSelectedItemSet(itemSetName);
        setIsComparisonSelected(true);
      } else {
        console.log(`No matching item sets found for ${itemSetName}`);
      }
    } catch (error) {
      console.error('Failed to compare item set:', error.message);
    }
  };

  const handleCompareUser = async (otherUser) => {
    try {
      const responseUser = await axios.get(`http://localhost:8080/api/v1/owned-item-set/${user.username}/${selectedItemSet}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const responseOtherUser = await axios.get(`http://localhost:8080/api/v1/owned-item-set/${otherUser}/${selectedItemSet}`, {
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
        };
      });

      setUser2(otherUser);
      setComparisonData(tableData);
    } catch (error) {
      console.error('Failed to compare users:', error.message);
    }
  };

  return (
    <div className="compare-collections-container">
      {user && (
        <div>
          <h2 className="compare-collections-header">Welcome, {user.username}, lets compare your collection with others!</h2>
          <div className="compare-collections-content">
            <div className="compare-collections-table-container">
              <YourItemSetsTable user={user} handleCompareClick={handleCompareClick} />
            </div>
            <div className="compare-collections-table-container">
              {searchResults && (
                <SearchUsersTable
                  isComparisonSelected={isComparisonSelected}
                  usersWithSameItemSet={searchResults}
                  handleCompareUser={handleCompareUser}
                  selectedItemSet={selectedItemSet}
                />
              )}
            </div>

            <div className="compare-collections-table-container">
              {(isComparisonSelected && comparisonData) ? (
                <ComparisonTable
                  username={user.username}
                  username2={user2}
                  selectedItemSet={selectedItemSet}
                  comparisonData={comparisonData}
                />
              ) : (
                <p>This is the space for the comparison table</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCollections;
