import { useState } from 'react';
import '../styles/FilterSelector.css';

interface FilterSelectorProps {
  options: string[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  onReset?: () => void;
  onApply?: (value: string) => void;
  resetLabel?: string;
  applyLabel?: string;
}

const FilterSelector = ({
  options,
  selectedValue: controlledValue,
  onValueChange,
  onReset,
  onApply,
  resetLabel = '초기화',
  applyLabel = '적용',
}: FilterSelectorProps) => {
  const [internalValue, setInternalValue] = useState<string>(options[0] || '');

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleRadioChange = (value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onValueChange?.(value);
  };

  const handleReset = () => {
    const firstOption = options[0] || '';
    if (!isControlled) {
      setInternalValue(firstOption);
    }
    onReset?.();
    onValueChange?.(firstOption);
  };

  const handleApply = () => {
    onApply?.(currentValue);
  };

  return (
    <div className="filter-selector">
      <div className="filter-options">
        {options.map((option) => (
          <label key={option} className="filter-radio-label">
            <input
              type="radio"
              name="filter-option"
              value={option}
              checked={currentValue === option}
              onChange={() => handleRadioChange(option)}
              className="filter-radio-input"
            />
            <span className="filter-radio-text">{option}</span>
          </label>
        ))}
      </div>
      <div className="filter-actions">
        <button type="button" onClick={handleReset}>
          {resetLabel}
        </button>
        <button type="button" onClick={handleApply}>
          {applyLabel}
        </button>
      </div>
    </div>
  );
};

export default FilterSelector;
