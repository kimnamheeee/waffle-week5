import { useEffect, useMemo, useState } from 'react';
import '../styles/MultiSelectFilter.css';

interface PositionSection {
  title: string;
  options: string[];
}

interface PositionFilterProps {
  sections: PositionSection[];
  selectedValues?: string[];
  onValueChange?: (values: string[]) => void;
  onApply?: (values: string[]) => void;
  onReset?: () => void;
  resetLabel?: string;
  applyLabel?: string;
}

const PositionFilter = ({
  sections,
  onValueChange,
  onApply,
  onReset,
  resetLabel = '초기화',
  applyLabel = '적용',
}: PositionFilterProps) => {
  const [sectionValues, setSectionValues] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    setSectionValues((prev) => {
      const next: Record<string, string[]> = {};
      sections.forEach((s) => {
        next[s.title] = prev[s.title] ?? [];
      });
      return next;
    });
  }, [sections]);

  const allSelectedValues = useMemo(() => {
    return Array.from(
      new Set(Object.values(sectionValues).flatMap((vals) => vals))
    );
  }, [sectionValues]);

  const handleCheckboxChange = (sectionTitle: string, option: string) => {
    setSectionValues((prev) => {
      const current = prev[sectionTitle] ?? [];
      let next: string[];

      if (option === '전체') {
        next = current.includes('전체') ? [] : ['전체'];
      } else {
        const withoutAll = current.filter((v) => v !== '전체');
        next = withoutAll.includes(option)
          ? withoutAll.filter((v) => v !== option)
          : [...withoutAll, option];
      }

      const updated = { ...prev, [sectionTitle]: next };
      onValueChange?.(Array.from(new Set(Object.values(updated).flat())));
      return updated;
    });
  };

  const handleReset = () => {
    setSectionValues(() => {
      const cleared: Record<string, string[]> = {};
      sections.forEach((s) => (cleared[s.title] = []));
      onReset?.();
      onValueChange?.([]);
      return cleared;
    });
  };

  const handleApply = () => {
    onApply?.(allSelectedValues);
  };

  const isChecked = (sectionTitle: string, option: string) => {
    return (sectionValues[sectionTitle] ?? []).includes(option);
  };

  return (
    <div className="multi-select-filter">
      <div className="multi-select-options">
        {sections.map((section) => (
          <div
            key={section.title}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#000',
                margin: 0,
              }}
            >
              {section.title}
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {section.options.map((option) => (
                <label key={option} className="multi-select-label">
                  <input
                    type="checkbox"
                    checked={isChecked(section.title, option)}
                    onChange={() => handleCheckboxChange(section.title, option)}
                    className="multi-select-checkbox"
                  />
                  <span className="multi-select-text">{option}</span>
                </label>
              ))}
            </div>
          </div>
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

export default PositionFilter;
