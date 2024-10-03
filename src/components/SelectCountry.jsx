import React, { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const SelectCountry = ({ label, value, setValue }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Fetch supported currencies from freecurrencyapi.com
  useEffect(() => {
    const fetchSupportedCurrencies = async () => {
      try {
        const response = await axios.get('https://api.freecurrencyapi.com/v1/currencies', {
          params: {
            apikey: 'fca_live_No7y60zeWcxOeNT9w4AFSZ2XxaGxOb337jHwQolR'
          }
        });
        setSupportedCurrencies(Object.keys(response.data.data));
      } catch (error) {
        console.error("Error fetching supported currencies:", error);
      }
    };

    fetchSupportedCurrencies();
  }, []);

  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");

  if (loaded) {
    return (
      <div className="relative">
        <input
          type="text"
          className='outline-none max-w-36 dark:bg-neutral-700 bg-white p-3 pr-7 rounded-lg dark:text-neutral-200 text-neutral-900 border dark:border-neutral-700 border-neutral-300 w-full'
          readOnly
          disabled
          value="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  const dataFilter = data.filter(item => "currencies" in item);
  const dataCountries = dataFilter.map(item => {
    const currencyCode = Object.keys(item.currencies)[0];
    if (supportedCurrencies.includes(currencyCode)) {
      return `${item.flag} ${currencyCode} - ${item.name.common}`;
    }
    return null;
  }).filter(item => item !== null);

  const filteredOptions = dataCountries.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className='outline-none max-w-52 dark:bg-neutral-900 bg-white p-3 pr-7 rounded-lg dark:text-neutral-200 text-neutral-900 border dark:border-neutral-700 border-neutral-300 w-full'
        placeholder={label}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {isOpen && (
        <ul className="absolute z-10 w-full dark:bg-neutral-800 bg-white dark:border-neutral-700 border-neutral-300 border rounded-lg mt-1 max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="p-2 hover:dark:bg-neutral-700 hover:bg-neutral-200 cursor-pointer"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="p-2 dark:text-neutral-400 text-neutral-500">No options</li>
          )}
        </ul>
      )}
      <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-neutral-400 text-neutral-500 pointer-events-none" />
    </div>
  );
};

export default SelectCountry;
