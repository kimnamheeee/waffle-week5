import { useDropdown } from '../hooks/useDropdown';
import Icon from '../icons/Icon';
import DropdownFilter from './DropdownFilter';
import PositionFilter from './PositionFilter';

interface FilterSectionProps {
  recruitmentStatus: string;
  industry: string[];
  sortOrder: string;
  onRecruitmentStatusChange: (value: string) => void;
  onIndustryChange: (values: string[]) => void;
  onSortOrderChange: (value: string) => void;
  onPositionsChange: (values: string[]) => void;
  onReset: () => void;
}

const FilterSection = ({
  recruitmentStatus,
  industry,
  sortOrder,
  onRecruitmentStatusChange,
  onIndustryChange,
  onSortOrderChange,
  onPositionsChange,
  onReset,
}: FilterSectionProps) => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className="filter-section">
      <button
        className="filter-dropdown"
        onClick={() => toggleDropdown('position')}
      >
        <span>직군 필터</span>
        <Icon name="chevron-down-large" size={20} />
      </button>

      {isOpen('position') && (
        <div style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
          <PositionFilter
            sections={[
              {
                title: '개발',
                options: [
                  '전체',
                  '프론트엔드 개발',
                  '서버 · 백엔드 개발',
                  '앱 개발',
                  '데이터',
                  '기타 분야',
                ],
              },
              {
                title: '기획',
                options: ['전체'],
              },
              {
                title: '디자인',
                options: ['전체'],
              },
              {
                title: '마케팅',
                options: ['전체'],
              },
            ]}
            onApply={(codes) => {
              onPositionsChange(codes);
              closeDropdown();
            }}
          />
        </div>
      )}

      <div className="filter-options">
        <DropdownFilter
          buttonLabel="모집상태"
          options={['전체', '모집중']}
          selectedValue={recruitmentStatus}
          onApply={(value) => {
            if (typeof value === 'string') {
              onRecruitmentStatusChange(value);
            }
          }}
          isOpen={isOpen('recruitment-status')}
          onToggle={() => toggleDropdown('recruitment-status')}
          onClose={closeDropdown}
        />
        <DropdownFilter
          buttonLabel="업종"
          multiSelect
          options={[
            '전체',
            '핀테크',
            '헬스테크',
            '교육',
            '이커머스',
            '푸드테크',
            '모빌리티',
            '컨텐츠',
            'B2B',
            '기타',
          ]}
          selectedValues={industry}
          onApply={(values) => {
            onIndustryChange(values as string[]);
          }}
          isOpen={isOpen('industry')}
          onToggle={() => toggleDropdown('industry')}
          onClose={closeDropdown}
        />
        <DropdownFilter
          buttonLabel={sortOrder}
          options={['공고등록순', '마감임박순']}
          selectedValue={sortOrder}
          onApply={(value) => {
            if (typeof value === 'string') {
              onSortOrderChange(value);
            }
          }}
          isOpen={isOpen('sort-order')}
          onToggle={() => toggleDropdown('sort-order')}
          onClose={closeDropdown}
        />
        <button className="reset-button" onClick={onReset}>
          <Icon name="refresh" size={16} />
          <span>초기화</span>
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
