import { useEffect, useState } from 'react';
import Icon from '../icons/Icon';
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

  useEffect(() => {
    if (isOpen) {
      if (multiSelect) {
        setInternalValues((controlledValues ?? []) as string[]);
      } else {
        setInternalValue((controlledValue ?? options[0] ?? '') as string);
      }
    }
  }, [isOpen, controlledValue, controlledValues, options, multiSelect]);

  const handleToggle = () => {
    onToggle();
  };

  const handleApply = () => {
    if (multiSelect) {
      onApply?.(internalValues);
    } else {
      onApply?.(internalValue);
    }
    onClose();
  };

  const handleReset = () => {
    if (multiSelect) {
      const resetValues: string[] = [];
      setInternalValues(resetValues);
      onReset?.();
    } else {
      const firstOption = options[0] || '';
      setInternalValue(firstOption);
      onReset?.();
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
        <Icon
          name="chevron-down"
          size={16}
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="dropdown-filter-selector">
          {multiSelect ? (
            <MultiSelectFilter
              options={options}
              selectedValues={internalValues}
              onValueChange={(values) => {
                setInternalValues(values);
              }}
              onApply={() => handleApply()}
              onReset={handleReset}
              resetLabel={resetLabel}
              applyLabel={applyLabel}
            />
          ) : (
            <FilterSelector
              options={options}
              selectedValue={internalValue}
              onValueChange={(value) => {
                setInternalValue(value);
              }}
              onApply={() => handleApply()}
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
