import { useState } from 'react';
import '../styles/MultiSelectFilter.css';

interface MultiSelectFilterProps {
  options: string[];
  selectedValues?: string[];
  onValueChange?: (values: string[]) => void;
  onReset?: () => void;
  onApply?: (values: string[]) => void;
  resetLabel?: string;
  applyLabel?: string;
}

const MultiSelectFilter = ({
  options,
  selectedValues: controlledValues,
  onValueChange,
  onReset,
  onApply,
  resetLabel = '초기화',
  applyLabel = '적용',
}: MultiSelectFilterProps) => {
  const [internalValues, setInternalValues] = useState<string[]>([]);

  const isControlled = controlledValues !== undefined;
  const currentValues = isControlled ? controlledValues : internalValues;

  const handleCheckboxChange = (option: string) => {
    let newValues: string[];

    if (option === '전체') {
      // '전체'는 독립적으로만 선택
      newValues = ['전체'];
    } else {
      // 다른 항목 선택 시 '전체' 해제하고 해당 옵션만 토글
      const withoutAll = currentValues.filter((v) => v !== '전체');
      if (withoutAll.includes(option)) {
        newValues = withoutAll.filter((v) => v !== option);
      } else {
        newValues = [...withoutAll, option];
      }
    }

    if (!isControlled) {
      setInternalValues(newValues);
    }
    onValueChange?.(newValues);
  };

  const handleReset = () => {
    const resetValues: string[] = [];
    if (!isControlled) {
      setInternalValues(resetValues);
    }
    onReset?.();
    onValueChange?.(resetValues);
  };

  const handleApply = () => {
    onApply?.(currentValues);
  };

  const isChecked = (option: string) => {
    return currentValues.includes(option);
  };

  return (
    <div className="multi-select-filter">
      <div className="multi-select-options">
        {options.map((option) => (
          <label key={option} className="multi-select-label">
            <input
              type="checkbox"
              checked={isChecked(option)}
              onChange={() => handleCheckboxChange(option)}
              className="multi-select-checkbox"
            />
            <span className="multi-select-text">{option}</span>
          </label>
        ))}
      </div>
      <div className="multi-select-actions">
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

export default MultiSelectFilter;
