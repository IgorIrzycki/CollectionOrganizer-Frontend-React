import React, { useState} from 'react';
import '../styles/SearchUsersTable.css'

const SearchUsersTable = ({isComparisonSelected, usersWithSameItemSet, handleCompareUser, selectedItemSet }) => {
  const [searchText, setSearchText] = useState('');
  const handleSearchInputChange = event => {
    setSearchText(event.target.value);
  };

  return (
    <div className="compare-collections-right">
      <h3>Search Users</h3>
      <div className="compare-collections-search">
      <input
        type="text"
        placeholder="Search users by name"
        value={searchText}
        onChange={handleSearchInputChange}
      />
      </div>
      {isComparisonSelected && usersWithSameItemSet.length > 0 ? (
        <div>
          <h3>Users with the Same Item Set ({selectedItemSet})</h3>
          <table className="compare-collections-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Compare</th>
              </tr>
            </thead>
            <tbody>
              {usersWithSameItemSet
              .filter(user2 => user2.toLowerCase().includes(searchText.toLowerCase()))
              .map((user2, idx) => (
                <tr key={idx}>
                  <td>{user2}</td>
                  <td>
                    <button className="compare-collections-button" onClick={() => handleCompareUser(user2)}>
                      Compare
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {isComparisonSelected && usersWithSameItemSet.length === 0 && (
            <p>There are no users with this specific set in their collection.</p>
          )}
          <p>Select an item set to compare.</p>
        </div>
      )}
    </div>
  );
};

export default SearchUsersTable;
