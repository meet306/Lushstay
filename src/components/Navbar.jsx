import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setFilters, toggleDarkMode } from '../store/propertiesSlice';
import { FaAirbnb, FaSearch, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { HiMenu, HiFilter } from 'react-icons/hi';
import FilterModal from './FilterModal';

export default function Navbar() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const darkMode = useSelector((state) => state.properties.darkMode);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-sm z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <FaAirbnb className="h-8 w-8 text-airbnb-red" />
            <span className="ml-2 text-airbnb-red font-bold text-xl">airbnb</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="flex items-center border rounded-full hover:shadow-md transition-shadow">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full px-8 py-4 rounded-full bg-transparent focus:outline-none dark:text-white"
                  value={searchInput}
                  onChange={handleSearch}
                />
                <div className="flex items-center pr-2">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="p-3 bg-airbnb-red text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <FaSearch className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <FaSun className="h-5 w-5 text-yellow-500" />
              ) : (
                <FaMoon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <button className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full font-medium dark:text-white">
              Become a Host
            </button>
            <div className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md cursor-pointer dark:border-gray-600">
              <HiMenu className="h-5 w-5 dark:text-white" />
              <FaUserCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <FilterModal isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
    </nav>
  );
}