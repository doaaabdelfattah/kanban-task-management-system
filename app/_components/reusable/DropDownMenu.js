
"use client"
import { useState } from "react";
// import { ChevronDown } from "lucide-react"; // Optional: icon library

const options = ["Todo", "Doing", "Done"];

function DropDownMenu({ onChange, value, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [selected, setSelected] = useState(currentStatus);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange({ target: { value: option } });
    // setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full drop-down text-sm">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left border-1 dark:text-white border-medium-grey/25 rounded-sm flex justify-between items-center focus:border-main-purple "
      >

        {value || "Select an option"}


        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" /></svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 p-4 w-full mt-1 bg-white dark:bg-very-dark-grey  rounded-lg overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 body-lg text-medium-grey  cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDownMenu;
