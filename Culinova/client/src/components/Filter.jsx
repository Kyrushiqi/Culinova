import React, { useState } from 'react';
import './Filter.css';

export default function FilterForm() {
  const [filters, setFilters] = useState({
    checkVegan: false,
    checkVegetarian: false,
    checkGlutenFree: false,
    checkDairyFree: false,
    checkNutFree: false,
    checkHalal: false,
    checkKosher: false,
    checkDrinks: false,
    timeInput: '',
    ratingInput: '',
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log('Applied Filters:', filters);
    // Can pass the filters to a parent component or use them to filter content
  };

  const handleClearFilters = () => {
    setFilters({
      checkVegan: false,
      checkVegetarian: false,
      checkGlutenFree: false,
      checkDairyFree: false,
      checkNutFree: false,
      checkHalal: false,
      checkKosher: false,
      checkDrinks: false,
      timeInput: '',
      ratingInput: '',
    });
  };

  return (
    <div className="format">
      <div className="filter-container">
        <div className="filter-bg">
          <h2 id="filter-txt">Filter</h2>       
          {[
            'Vegan',
            'Vegetarian',
            'Gluten-Free',
            'Dairy-Free',
            'Nut-Free',
            'Halal',
            'Kosher',
            'Drinks',
          ].map((label) => {
            const id = `check${label}`;
            return (
              <div className="form-check" key={id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={id}
                  checked={filters[id]}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={id}>
                  {label}
                </label>
              </div>
            );
          })}

          <div id="filter-by">
            <label htmlFor="timeInput">Filter by Time:</label>
            <div className="dropdown-form">
              <select
                className="form-select form-select-sm mt-1"
                id="timeInput"
                value={filters.timeInput}
                onChange={handleSelectChange}
              >
                <option value="">Any time</option>
                <option value="Total Time">Total Time</option>
                <option value="Cook Time">Cook Time</option>
                <option value="Prep Time">Prep Time</option>
              </select>
            </div>

            <label htmlFor="ratingInput">Filter by Rating:</label>
            <div className="dropdown-form">
              <select
                className="form-select form-select-sm mt-1"
                id="ratingInput"
                value={filters.ratingInput}
                onChange={handleSelectChange}
              >
                <option value="">Any rating</option>
                <option value="⭐☆☆☆☆">⭐☆☆☆☆</option>
                <option value="⭐⭐☆☆☆">⭐⭐☆☆☆</option>
                <option value="⭐⭐⭐☆☆">⭐⭐⭐☆☆</option>
                <option value="⭐⭐⭐⭐☆">⭐⭐⭐⭐☆</option>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
              </select>
            </div>
          </div>

          <div id="filter-btns">
            <button className="btn btn-success" type="button" onClick={handleApplyFilters}>
              Apply Filters
            </button>
            <button className="btn btn-danger" type="button" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
