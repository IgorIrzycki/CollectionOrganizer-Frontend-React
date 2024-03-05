import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Category from '../components/Category';
import ItemSet from '../components/ItemSet';
import Item from '../components/Item';
import "../styles/BrowseItems.css";
import "../styles/pagination.css";

const BrowseItems = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategorySize, setSelectedCategorySize] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedItemSet, setSelectedItemSet] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/category', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      }
    };

    fetchCategories();

    const handleCategoryChange = async () => {
      if (selectedCategoryName && selectedCategorySize !== null) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/item-set/by-category/${selectedCategoryName}?page=${currentPage}&size=${itemsPerPage}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setSelectedCategory(response.data);
        } catch (error) {
          console.error('Failed to fetch category:', error.message);
        }
      }
    };

    handleCategoryChange(); 
  }, [selectedCategoryName, selectedCategorySize, currentPage]);

  const handleCategoryClick = async (categoryName, categorySize) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/item-set/by-category/${categoryName}?page=${currentPage}&size=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSelectedCategory(response.data);
      setSelectedCategorySize(categorySize);
      setSelectedCategoryName(categoryName);
    } catch (error) {
      console.error('Failed to fetch category:', error.message);
    }
  };

  const handleItemSetClick = async (itemSetName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/item-set/${itemSetName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSelectedItemSet(response.data);
    } catch (error) {
      console.error('Failed to fetch category:', error.message);
    }
  };

  const handleGoBack = () => {
    if(selectedItemSet){
      setSelectedItemSet(null);
      setCurrentPage(0);
    }
    else{
      setSelectedCategory(null);
      setSelectedCategoryName(null);
      setSelectedCategorySize(null);
      setCurrentPage(0);
    }
    setSearchText('');
  };

  const handleSearchInputChange = event => {
    setSearchText(event.target.value);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="browse-items-container">
      {selectedCategory && !selectedItemSet ? (
        <button className="goBackButton" onClick={handleGoBack}>
          Go Back To Categories
        </button>
      ) : (selectedItemSet && (
        <button className="goBackButton" onClick={handleGoBack}>
          Go Back To Item Sets
        </button>
      ))} 
      <h2>
        {selectedCategory
          ? selectedItemSet
            ? `${selectedCategoryName} → ${selectedItemSet.name} → Items`
            : `${selectedCategoryName} → Item Sets`
          : 'Categories'}
      </h2>
      {(!selectedCategory && !selectedItemSet) && (
        <div>
        <div className="category-list">
          {categories
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((category, idx) => (
            
              <Category
                key={category.name}
                category={category}
                onClick={() => handleCategoryClick(category.name, category.size)}
              />
           
          ))}
        </div>
        <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={Math.ceil(categories.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      </div>
      )}
      {(selectedCategory && !selectedItemSet) && (
        <div>
        <div className="item-set-list">
          {selectedCategory
          .map((itemset, idx) => (
            <ItemSet
              key={itemset.name}
              itemset={itemset}
              onClick={() => handleItemSetClick(itemset.name)}
            />
          ))}
        </div>
        <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={Math.ceil(selectedCategorySize / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      </div>
      )}
      {selectedItemSet && (
        <div>
          <input
        type="text"
        placeholder="Search items by name"
        value={searchText}
        onChange={handleSearchInputChange}
      />
        <div className="item-list">
          {selectedItemSet.items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((item, idx) => (
            <Item key={item.name} item={item} selectedItemSet={selectedItemSet} categoryName={selectedItemSet.categoryName}/>
          ))}
          {selectedItemSet.items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())).length === 0 && (
      <p>No items found for the given search criteria.</p>
    )}
        </div>
        
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={Math.ceil(selectedItemSet.items.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
        
      )}
    </div>
  );
};

export default BrowseItems;
