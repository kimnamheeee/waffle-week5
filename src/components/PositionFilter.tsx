import { useEffect, useState } from 'react';
import '../styles/MultiSelectFilter.css';

interface PositionSection {
  title: string;
  options: string[];
}

interface PositionFilterProps {
  sections: PositionSection[];
  selectedValues?: string[];
  onValueChange?: (values: string[]) => void;
  onApply?: (codes: string[]) => void;
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
    // 섹션별 선택을 API 코드로 변환
    const codes: string[] = [];
    Object.entries(sectionValues).forEach(([title, values]) => {
      if (title === '개발') {
        const devMap: Record<string, string> = {
          '프론트엔드 개발': 'FRONT',
          '앱 개발': 'APP',
          '서버 · 백엔드 개발': 'BACKEND',
          데이터: 'DATA',
          '기타 분야': 'OTHERS',
        };
        if (values.includes('전체')) {
          codes.push('FRONT', 'APP', 'BACKEND', 'DATA', 'OTHERS');
        } else {
          values.forEach((v) => {
            const code = devMap[v];
            if (code) codes.push(code);
          });
        }
      } else if (title === '디자인') {
        if (values.length > 0) codes.push('DESIGN');
      } else if (title === '기획') {
        if (values.length > 0) codes.push('PLANNER');
      } else if (title === '마케팅') {
        if (values.length > 0) codes.push('MARKETING');
      }
    });

    onApply?.(Array.from(new Set(codes)));
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
