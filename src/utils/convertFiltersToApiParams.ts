import { mapDomainToApiValue } from '../constants/domainMapping';

interface FilterValues {
  recruitmentStatus: string;
  industry: string[];
  sortOrder: string;
  positions?: string[];
}

interface ApiParams {
  domains?: string[];
  isActive?: boolean;
  order?: number;
  roles?: string[];
}

const convertRecruitmentStatusToIsActive = (
  recruitmentStatus: string
): boolean | undefined => {
  if (recruitmentStatus === '전체') {
    return undefined;
  }
  if (recruitmentStatus === '모집중') {
    return true;
  }
  return undefined;
};

const convertSortOrderToOrder = (sortOrder: string): number | undefined => {
  if (sortOrder === '최신순' || sortOrder === '공고등록순') {
    return 0;
  }
  if (sortOrder === '마감임박순') {
    return 1;
  }
  return undefined;
};

const convertDomainsToApiDomains = (
  industry: string[]
): string[] | undefined => {
  const apiDomains = industry
    .map(mapDomainToApiValue)
    .filter(
      (domain): domain is string => domain !== undefined && domain !== ''
    );

  if (apiDomains.length === 0) {
    return undefined;
  }

  return apiDomains;
};

export const convertFiltersToApiParams = (filters: FilterValues): ApiParams => {
  const apiParams: ApiParams = {};

  const isActive = convertRecruitmentStatusToIsActive(
    filters.recruitmentStatus
  );
  if (isActive !== undefined) {
    apiParams.isActive = isActive;
  }

  const order = convertSortOrderToOrder(filters.sortOrder);
  if (order !== undefined) {
    apiParams.order = order;
  }

  const domains = convertDomainsToApiDomains(filters.industry);
  if (domains !== undefined) {
    apiParams.domains = domains;
  }

  if (filters.positions && filters.positions.length > 0) {
    apiParams.roles = filters.positions;
  }

  return apiParams;
};
