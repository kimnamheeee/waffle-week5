import { useState } from 'react';
import FilterSelector from './FilterSelector';
import MultiSelectFilter from './MultiSelectFilter';
import '../styles/DropdownFilter.css';

interface DropdownFilterProps {
  buttonLabel: string;
  options: string[];
  multiSelect?: boolean;
  selectedValue?: string;
  selectedValues?: string[];
  onValueChange?: (value: string) => void;
  onValuesChange?: (values: string[]) => void;
  onApply?: (value: string | string[]) => void;
  onReset?: () => void;
  resetLabel?: string;
  applyLabel?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const DropdownFilter = ({
  buttonLabel,
  options,
  multiSelect = false,
  selectedValue: controlledValue,
  selectedValues: controlledValues,
  onValueChange,
  onValuesChange,
  onApply,
  onReset,
  resetLabel = '초기화',
  applyLabel = '적용',
  isOpen,
  onToggle,
  onClose,
}: DropdownFilterProps) => {
  const [internalValue, setInternalValue] = useState<string>(options[0] || '');
  const [internalValues, setInternalValues] = useState<string[]>([]);

  const isControlled = multiSelect
    ? controlledValues !== undefined
    : controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const currentValues = isControlled ? controlledValues : internalValues;

  const handleToggle = () => {
    onToggle();
  };

  const handleApply = (value: string | string[]) => {
    if (multiSelect) {
      if (!isControlled) {
        setInternalValues(value as string[]);
      }
      onApply?.(value);
    } else {
      if (!isControlled) {
        setInternalValue(value as string);
      }
      onApply?.(value);
    }
    onClose();
  };

  const handleReset = () => {
    if (multiSelect) {
      const resetValues: string[] = [];
      if (!isControlled) {
        setInternalValues(resetValues);
      }
      onReset?.();
      onValuesChange?.(resetValues);
    } else {
      const firstOption = options[0] || '';
      if (!isControlled) {
        setInternalValue(firstOption);
      }
      onReset?.();
      onValueChange?.(firstOption);
    }
  };

  return (
    <div className="dropdown-filter-trigger-wrapper">
      <button
        className="dropdown-filter-trigger"
        onClick={handleToggle}
        type="button"
      >
        <span>{buttonLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-filter-selector">
          {multiSelect ? (
            <MultiSelectFilter
              options={options}
              selectedValues={currentValues}
              onValueChange={(values) => {
                if (!isControlled) {
                  setInternalValues(values);
                }
                onValuesChange?.(values);
              }}
              onApply={handleApply}
              onReset={handleReset}
              resetLabel={resetLabel}
              applyLabel={applyLabel}
            />
          ) : (
            <FilterSelector
              options={options}
              selectedValue={currentValue}
              onValueChange={(value) => {
                if (!isControlled) {
                  setInternalValue(value);
                }
                onValueChange?.(value);
              }}
              onApply={handleApply}
              onReset={handleReset}
              resetLabel={resetLabel}
              applyLabel={applyLabel}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
