import { useState } from 'react';
import './dropDownMenu.scss';
// export enum sortVariants {
//   SORT_BY_ALHABET = 'SORT_BY_ALHABET',
//   SORT_BY_COUNT = 'SORT_BY_COUNT'
// }
const sortVariants = ['SORT_BY_ALHABET', 'SORT_BY_COUNT'];
const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
      <button className="dropdown-menu__toggle" onClick={toggleMenu}>
        {selectedOption || 'Select an option'}
      </button>
      {isOpen && (
        <ul className="dropdown-menu__options">
          {sortVariants.map((option, index) => (
            <li
              key={index}
              className="dropdown-menu__option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default DropDownMenu;
