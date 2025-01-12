'use client';

import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiGridFourLight } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';

const HomeDropdown = () => {
  const [openedByDropdown, setOpenedByDropdown] = useState(false);
  const [showTypesDropdown, setShowTypesDropdown] = useState(false);

  // Toggle dropdown visibility
  const handleDropdownToggle = (type: string) => {
    if (type === 'openedBy') {
      setOpenedByDropdown(!openedByDropdown);
    } else if (type === 'showTypes') {
      setShowTypesDropdown(!showTypesDropdown);
    }
  };

  return (
    <div className="flex flex-row flex-nowrap justify-between pt-6">
      {/* Left side filter options */}
      <div className={`mr-1 flex items-center gap-4 text-gray-700`}>
        <div
          className={`flex items-center justify-between`}
          onClick={() => handleDropdownToggle('openedBy')}
        >
          <p className={`mr-1`}>Opened by you</p>
          <IoIosArrowDown />
        </div>
        {openedByDropdown && (
          <div className="absolute mt-2 border border-gray-300 bg-white shadow-lg">
            <ul>
              <li className="cursor-pointer p-2 hover:bg-gray-100">Option 1</li>
              <li className="cursor-pointer p-2 hover:bg-gray-100">Option 2</li>
            </ul>
          </div>
        )}

        <div
          className={`flex items-center justify-between`}
          onClick={() => handleDropdownToggle('showTypes')}
        >
          <p className={`mr-1`}>Show all types</p>
          <IoIosArrowDown />
        </div>
        {showTypesDropdown && (
          <div className="absolute mt-2 border border-gray-300 bg-white shadow-lg">
            <ul>
              <li className="cursor-pointer p-2 hover:bg-gray-100">Type 1</li>
              <li className="cursor-pointer p-2 hover:bg-gray-100">Type 2</li>
            </ul>
          </div>
        )}
      </div>

      {/* Right side filter options */}
      <div className={`flex items-center`}>
        <div className={`flex cursor-pointer flex-row p-1`}>
          <GiHamburgerMenu className="fill-at-half-black" />
        </div>
        <div className={`flex cursor-pointer flex-row p-1`}>
          <PiGridFourLight className="fill-at-half-black" />
        </div>
      </div>
    </div>
  );
};

export default HomeDropdown;
