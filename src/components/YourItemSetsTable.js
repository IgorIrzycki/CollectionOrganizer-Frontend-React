import React from 'react';
import '../styles/YourItemSetsTable.css'

const YourItemSetsTable = ({ user, handleCompareClick }) => {
  return (
    <div className="compare-collections-left">
      <h3>Your Item Sets</h3>
      {user.ownedItemSets.length > 0 ? (
        <table className="compare-collections-table">
          <thead>
            <tr>
              <th>Item Set Name</th>
              <th>Category</th>
              <th>Find Users</th>
            </tr>
          </thead>
          <tbody>
            {user.ownedItemSets.map((ownedItemSet, idx) => (
              <tr key={idx}>
                <td>{ownedItemSet.name}</td>
                <td>{ownedItemSet.categoryName}</td>
                <td>
                  <button className="compare-collections-button" onClick={() => handleCompareClick(ownedItemSet.name)}>
                    Find Users
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No item sets found. Add some to your collection and come back!</p>
      )}
    </div>
  );
};

export default YourItemSetsTable;
