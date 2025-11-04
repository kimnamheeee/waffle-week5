import { useCallback, useMemo, useState } from 'react';

interface PostFilters {
  recruitmentStatus: string;
  industry: string[];
  sortOrder: string;
  positions: string[];
}

interface UsePostFiltersReturn {
  filters: PostFilters;
  setRecruitmentStatus: (value: string) => void;
  setIndustry: (values: string[]) => void;
  setSortOrder: (value: string) => void;
  resetFilters: () => void;
  setPositions: (values: string[]) => void;
}

const DEFAULT_FILTERS: PostFilters = {
  recruitmentStatus: '전체',
  industry: [],
  sortOrder: '공고등록순',
  positions: [],
};

export const usePostFilters = (): UsePostFiltersReturn => {
  const [recruitmentStatus, setRecruitmentStatus] = useState<string>(
    DEFAULT_FILTERS.recruitmentStatus
  );
  const [industry, setIndustry] = useState<string[]>(DEFAULT_FILTERS.industry);
  const [sortOrder, setSortOrder] = useState<string>(DEFAULT_FILTERS.sortOrder);
  const [positions, setPositions] = useState<string[]>(
    DEFAULT_FILTERS.positions
  );

  const filters = useMemo(
    () => ({
      recruitmentStatus,
      industry,
      sortOrder,
      positions,
    }),
    [recruitmentStatus, industry, sortOrder, positions]
  );

  const resetFilters = useCallback(() => {
    setRecruitmentStatus(DEFAULT_FILTERS.recruitmentStatus);
    setIndustry(DEFAULT_FILTERS.industry);
    setSortOrder(DEFAULT_FILTERS.sortOrder);
  }, []);

  return {
    filters,
    setRecruitmentStatus,
    setIndustry,
    setSortOrder,
    setPositions,
    resetFilters,
  };
};
