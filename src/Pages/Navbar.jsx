import React, { useState, useRef } from "react";


const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 300); // 1 second delay
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchText}`);
    // Add product filter or navigation here
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Sleek with Deals</div>

          <ul className="navbar-menu">
            <li
              className="dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Watches ▾
              <ul
                className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <li>Automatic</li>
                <li>Analog</li>
                <li>Digital</li>
              </ul>
            </li>
            <li>Projectors</li>
            <li>Sun Glasses</li>
            <li>Speakers</li>
            <li>Apple Accessories</li>
            <li>Others</li>
          </ul>
        </div>
      </nav>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </>
  );
};

export default Navbar;
