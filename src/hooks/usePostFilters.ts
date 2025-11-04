import { useCallback, useState } from 'react';

interface PostFilters {
  recruitmentStatus: string;
  industry: string[];
  sortOrder: string;
}

interface UsePostFiltersReturn {
  filters: PostFilters;
  setRecruitmentStatus: (value: string) => void;
  setIndustry: (values: string[]) => void;
  setSortOrder: (value: string) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: PostFilters = {
  recruitmentStatus: '전체',
  industry: [],
  sortOrder: '최신순',
};

export const usePostFilters = (): UsePostFiltersReturn => {
  const [recruitmentStatus, setRecruitmentStatus] = useState<string>(
    DEFAULT_FILTERS.recruitmentStatus
  );
  const [industry, setIndustry] = useState<string[]>(DEFAULT_FILTERS.industry);
  const [sortOrder, setSortOrder] = useState<string>(DEFAULT_FILTERS.sortOrder);

  const resetFilters = useCallback(() => {
    setRecruitmentStatus(DEFAULT_FILTERS.recruitmentStatus);
    setIndustry(DEFAULT_FILTERS.industry);
    setSortOrder(DEFAULT_FILTERS.sortOrder);
  }, []);

  return {
    filters: {
      recruitmentStatus,
      industry,
      sortOrder,
    },
    setRecruitmentStatus,
    setIndustry,
    setSortOrder,
    resetFilters,
  };
};
