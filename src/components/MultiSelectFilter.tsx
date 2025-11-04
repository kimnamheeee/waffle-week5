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
      // 전체 선택/해제
      if (currentValues.includes('전체') || currentValues.length === 0) {
        // 전체 해제 또는 모든 항목 선택
        newValues = options.filter((opt) => opt !== '전체');
      } else {
        // 전체 선택
        newValues = ['전체', ...options.filter((opt) => opt !== '전체')];
      }
    } else {
      // 개별 항목 선택/해제
      if (currentValues.includes(option)) {
        // 선택 해제
        newValues = currentValues.filter((val) => val !== option);
        // 전체도 해제
        newValues = newValues.filter((val) => val !== '전체');
      } else {
        // 선택 추가
        newValues = [...currentValues, option];
        // 다른 모든 항목이 선택되었으면 전체도 선택
        const nonAllOptions = options.filter((opt) => opt !== '전체');
        const allSelected = nonAllOptions.every((opt) =>
          newValues.includes(opt)
        );
        if (allSelected && nonAllOptions.length > 0) {
          newValues = ['전체', ...nonAllOptions];
        }
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
